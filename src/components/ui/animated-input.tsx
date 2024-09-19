"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { FieldError } from "react-hook-form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputPrefix?: React.ReactNode;
  inputSuffix?: React.ReactNode;
  inputPrefixClassName?: string;
  inputSuffixClassName?: string;
  inputContainerClassName?: string;
  error?: FieldError;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, labelClassName, error, inputPrefix, inputSuffix, inputPrefixClassName, inputSuffixClassName, inputContainerClassName, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <React.Fragment>
        {label !== undefined && <label className={cn("dark:text-[#848585] text-black font-inter text-xs font-medium leading-[16px]", { "text-red-400": error }, labelClassName)}>{label}</label>}{" "}
        <motion.div
          style={{
            background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="p-[2px] rounded-lg transition duration-300 group"
        >
          <div
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-200 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--secondary)]
           group-hover:shadow-none transition duration-400 overflow-hidden
           `,
              inputContainerClassName
            )}
            ref={ref}
            {...props}
          >
            {inputPrefix !== undefined && <span className={cn("flex items-center justify-center pl-4 pr-2", inputPrefixClassName)}>{inputPrefix}</span>}
            <input className="flex-grow bg-transparent px-3 py-2 border-none outline-none" type={type} {...props} />
            {inputSuffix !== undefined && <span className={cn("flex items-center justify-center px-4", inputSuffixClassName)}>{inputSuffix}</span>}
          </div>
        </motion.div>
        {error !== undefined && <p className="font-inter text-start text-xs text-red-400">{error.message}</p>}
      </React.Fragment>
    );
  }
);
AnimatedInput.displayName = "AnimatedInput";

export { AnimatedInput };
