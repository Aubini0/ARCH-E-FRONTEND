import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./TextGenerateEffect";

interface IPlaceholdersAndVanishInput {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (value: string) => void;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  focused?: boolean;
  value?: string;
  onBlur?: () => void;
  icon: React.ReactNode;
  onButtonClick?: () => void;
  disabled: boolean;
}

const PlaceholdersAndVanishInput: FC<IPlaceholdersAndVanishInput> = ({
  placeholder,
  onChange,
  onSubmit,
  className,
  focused = false,
  value,
  onBlur,
  icon,
  onButtonClick,
  disabled,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (focused) {
      inputRef?.current?.focus();
    }
  }, [focused]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    const currentInputRef = inputRef.current;
    currentInputRef?.addEventListener("keydown", handleKeyDown);

    return () => {
      currentInputRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue, onSubmit]);

  return (
    <form
      ref={formRef}
      className={cn(
        "w-full relative mx-auto bg-[#F5F6F8] dark:bg-[#27272A] overflow-hidden border border-[#CCCCCC] dark:border-[#595959] transition duration-200 rounded-[12px]",
        className,
        disabled && "pointer-events-none bg-gray-200"
      )}
      onSubmit={handleSubmit}
    >
      <textarea
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e);
        }}
        disabled={disabled}
        ref={inputRef}
        value={inputValue}
        spellCheck={false}
        autoCorrect="off"
        rows={4}
        onBlur={onBlur}
        draggable={false}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-[24px] pr-[40px] pt-[12px] hide-scrollbar resize-none"
        )}
      />
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          onSubmit(inputValue);
          setInputValue("");
        }}
        type="button"
        className="absolute right-3 md:top-[78%] top-[75%] z-50 rounded-lg -translate-y-1/2 h-8 w-8 cursor-pointer transition duration-200 flex items-center justify-center text-lg bg-[#FFFFFF] dark:bg-[#121212]"
      >
        {icon}
      </button>
      {!inputValue && placeholder && (
        <div className="absolute inset-0 md:top-4 top-[11px] text-sm text-zinc-600 pl-4 md:pl-[24px] pointer-events-none">
          <TextGenerateEffect
            className="text-sm text-[#7F7F7F]"
            words={placeholder}
          />
        </div>
      )}
    </form>
  );
};

export default PlaceholdersAndVanishInput;
