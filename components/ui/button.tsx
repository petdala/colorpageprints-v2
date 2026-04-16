import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

type Props = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover active:bg-cta-pressed",
  secondary: "border border-text bg-transparent text-text hover:bg-text hover:text-white"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 text-sm",
  md: "px-6 text-sm",
  lg: "px-7 text-base"
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-sm py-2.5 font-medium transition-colors",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.endsWith(".pdf") || href.endsWith(".mp3");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
