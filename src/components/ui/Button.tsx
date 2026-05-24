import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-transform hover:scale-105 active:scale-95",
          {
            "bg-accent text-white": variant === "primary",
            "bg-bg-dark text-white": variant === "secondary",
            "border border-accent text-accent": variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
