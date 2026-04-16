import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/30",
        className
      )}
      {...props}
    />
  );
});
