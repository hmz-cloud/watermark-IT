import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "outlineLight" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-semibold " +
  "transition-colors duration-200 cursor-pointer select-none touch-manipulation " +
  "disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Blue on white: 5.2:1 contrast with white text.
  primary: "bg-brand text-white hover:bg-brand-700 active:bg-navy",
  // Cyan with navy text — reserved for navy surfaces (hero, contact panel).
  accent: "bg-cyan text-navy hover:bg-cyan-300 active:bg-white",
  outline: "border border-line text-ink hover:border-brand hover:text-brand bg-white",
  outlineLight: "border border-white/30 text-white hover:border-cyan hover:text-cyan",
  whatsapp: "bg-[#167a40] text-white hover:bg-[#11622f]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return clsx(base, variants[variant], sizes[size], extra);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function Button({ variant, size, icon, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
