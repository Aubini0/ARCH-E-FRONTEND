import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-white border border-secondary text-gray-600 dark:border-none dark:bg-secondary dark:text-white",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
      outline: "border-2 border-secondary dark:border-white bg-transparent text-black dark:text-white",
      ghost: "hover:bg-gray-100 dark:hover:bg-white/20",
      link: "text-primary underline-offset-4 hover:underline",
      grey: "bg-white/30 text-white shadow-sm hover:bg-white/80",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
      xl: "h-16 rounded-md px-5 ",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, isLoading, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading || disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Comp>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
