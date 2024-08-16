"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Fragment, forwardRef } from "react";
import type { FieldError } from "react-hook-form";

/* The `interface InputProps` is defining the props that can be passed to the `Input`
component. It extends the `InputHTMLAttributes<HTMLInputElement>` interface, which includes all the
standard HTML input attributes that can be used with the `input` element. */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
  inputPrefixClassName?: string;
  inputSuffixClassName?: string;
  inputContainerClassName?: string;
  error?: FieldError;
}

/**
 * Renders a text input component.
 *
 * @param {InputProps} className - The class name of the text input component.
 * @param {string} label - The label of the text input component.
 * @param {string} inputPrefix - The prefix of the text input component.
 * @param {string} inputSuffix - The suffix of the text input component.
 * @param {string} inputPrefixClassName - The class name of the input prefix element.
 * @param {string} inputSuffixClassName - The class name of the input suffix element.
 * @param {...props} props - Other props for the text input component.
 * @return {JSX.Element} The rendered text input component.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, inputPrefix, inputSuffix, inputPrefixClassName, inputSuffixClassName, inputContainerClassName, labelClassName, error, id, disabled, ...props }, ref) => {
    return (
      <Fragment>
        {label !== undefined && <label className={cn("dark:text-white text-black font-inter text-[15px] font-medium leading-[18px]", { "text-red-400": error }, labelClassName)}>{label}</label>}{" "}
        <div
          className={cn(
            "flex w-full rounded-lg dark:bg-secondary dark:border-[#3D3D3D] border border-gray-300 mt-2 overflow-hidden",
            { "border-red-400": error },
            { "cursor-not-allowed bg-zinc-100 opacity-70": disabled },
            // { "ring-2 ring-primary ring-offset-2": isFocused },
            inputContainerClassName
          )}
        >
          {inputPrefix !== undefined && <span className={cn("flex items-center justify-center pl-4 pr-2", inputPrefixClassName)}>{inputPrefix}</span>}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            className={cn(
              "font-inter w-full px-3 py-2 text-sm text-black dark:text-white placeholder:text-sm placeholder:font-normal placeholder:leading-normal placeholder:text-gray-400 dark:placeholder:text-[#848585] focus:outline-0 bg-transparent",
              className
            )}
            {...props}
          />
          {inputSuffix !== undefined && <span className={cn("flex items-center justify-center px-4", inputSuffixClassName)}>{inputSuffix}</span>}
        </div>
        {error !== undefined && <p className="font-inter text-start text-xs text-red-400">{error.message}</p>}
      </Fragment>
    );
  }
);

Input.displayName = "Input";

export { Input };
