import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { SearchIcon } from "lucide-react";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";

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
  isQueryExcuted?: boolean;
}

const PlaceholdersAndVanishInput: FC<IPlaceholdersAndVanishInput> = ({ placeholder, onChange, onSubmit, className, focused = false, value, onBlur, icon, onButtonClick, isQueryExcuted, disabled }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { isPhone } = useDeviceIndicator();

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue?.trimStart()) {
      e.preventDefault();
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (focused) {
      inputRef?.current?.focus();
    }
  }, [focused]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue?.trimStart()) {
        onSubmit(inputValue);
        setInputValue("");
      }
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
        "w-full relative mx-auto bg-off-white dark:bg-secondary overflow-hidden border-2 border-transparent input-shadow dark:border-secondary transition duration-200 rounded-[12px]",
        className,
        disabled && "pointer-events-none",
        isQueryExcuted && "h-[48px]"
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
        rows={!isQueryExcuted ? (isPhone ? 2 : 4) : 1}
        onBlur={onBlur}
        draggable={false}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 md:pl-[52px] pl-[44px] pr-[65px] hide-scrollbar resize-none",
          isQueryExcuted ? "py-[12px]" : "pt-[12px] pb-[24px] md:py-0 md:pt-[20px] md:pb-[24px]"
        )}
      />
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          onSubmit(inputValue);
          setInputValue("");
        }}
        disabled={!inputValue.trimStart()}
        type="button"
        className={cn(
          `absolute right-[2px] light:text-white text-dark cursor-pointer ${
            isQueryExcuted ? "top-1/2" : "md:top-[85%] top-[75%]"
          } z-50 rounded-lg -translate-y-1/2 h-9 w-9 transition duration-200 flex items-center justify-center text-[24px] bg-[#FFFFFF] dark:bg-transparent`,
          !inputValue.trimStart() && "opacity-35"
        )}
      >
        {icon}
      </button>
      <div className={`absolute inset-0 ${isQueryExcuted ? "flex items-center" : "md:top-2 top-[-8px]"} text-sm text-zinc-600 pl-4 md:pl-[24px] pointer-events-none`}>
        <div className={`flex lg:h-12 md:h-[50px] h-[57px] items-center gap-2`}>
          <SearchIcon className="dark:text-[#fff]" size={20} />
          {!inputValue && placeholder && <TextGenerateEffect className="text-sm text-[#7F7F7F]" words={placeholder} />}
        </div>
      </div>
    </form>
  );
};

export default PlaceholdersAndVanishInput;
