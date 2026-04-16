import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover active:bg-cta-pressed",
  secondary: "bg-surface-alt text-text border border-border hover:bg-card"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-colors disabled:bg-disabled disabled:text-text-light",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});
