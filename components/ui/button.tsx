import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/85",
  secondary: "border border-border bg-surface text-foreground hover:bg-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:text-base",
};

export function buttonStyles({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyleOptions) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> &
  ButtonStyleOptions & {
    href: string;
  };

/** A link styled as a button. External URLs open in a new tab. */
export function ButtonLink({ href, variant, size, className, ...props }: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={buttonStyles({ variant, size, className })}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
