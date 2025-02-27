"use client";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Search, User } from "lucide-react";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

function Button({ children, onClick, disabled, ariaLabel }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; ariaLabel?: string }) {
  return (
    <button
      className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center transition-colors bg-[#272729] text-white rounded-full focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function SearchToolbar(data: MyInputProps) {
  const { placeholder, ...props } = data;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  //   useClickOutside(containerRef, () => {
  //     setIsOpen(false);
  //   });

  return (
    <MotionConfig transition={transition}>
      <div ref={containerRef}>
        <div className="h-full w-full rounded-xl">
          <motion.div
            animate={{
              width: isOpen ? "300px" : "98px",
            }}
            initial={false}
          >
            <div className="overflow-hidden p-2">
              {!isOpen ? (
                <div className="flex space-x-2">
                  <Button onClick={() => setIsOpen(true)} ariaLabel="Search files">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={() => setIsOpen(false)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="relative w-full">
                    <input
                      {...props}
                      className="h-9 w-full rounded-lg border border-[#848585] bg-transparent p-2 text-white placeholder-zinc-500 focus:outline-none"
                      autoFocus
                      placeholder={placeholder || "Search files"}
                    />
                    <div className="absolute right-1 top-0 flex h-full items-center justify-center"></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
