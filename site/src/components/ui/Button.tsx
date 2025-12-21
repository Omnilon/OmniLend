"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-mono text-[11px] uppercase tracking-[0.32em] transition duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#0b0b11] shadow-glow hover:shadow-[0_0_50px_rgba(155,107,255,0.45)]",
  secondary: "bg-white/10 text-white border border-white/15 hover:border-accent",
  ghost: "bg-transparent text-white/80 border border-white/10 hover:border-white/30"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  lg: "px-6 py-3"
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    "active:translate-y-0.5",
    className
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(function Button(
  { variant = "primary", size = "md", className, type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={buttonClassName({ variant, size, className })}
      type={type ?? "button"}
      {...props}
    />
  );
});

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a href={href} className={buttonClassName({ variant, size, className })} {...props} />
    );
  }

  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
