import { AnimatePresence, motion } from "framer-motion";
import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./TextGenerateEffect";

interface IPlaceholdersAndVanishInput {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (value: string) => void;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  focused?: boolean;
  value?: string;
  onBlur?: () => void;
  icon: React.ReactNode;
  onButtonClick?: () => void;
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
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (focused) {
      inputRef?.current?.focus();
    }
  }, [focused]);

  return (
    <form
      className={cn(
        "w-full relative mx-auto bg-white dark:bg-secondary h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        className
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setInputValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        ref={inputRef}
        value={inputValue}
        spellCheck={false}
        autoCorrect="off"
        type="text"
        onBlur={onBlur}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent dark:text-transparent"
        )}
      />

      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          onSubmit(inputValue);
          setInputValue("");
        }}
        type="button"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full cursor-pointer transition duration-200 flex items-center justify-center text-lg bg-transparent md:hover:bg-slate-200 dark:md:hover:bg-background"
      >
        {icon}
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!inputValue && placeholder && (
            <TextGenerateEffect
              className="text-sm text-zinc-600 pl-4 md:pl-10"
              words={placeholder}
            />
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default PlaceholdersAndVanishInput;
