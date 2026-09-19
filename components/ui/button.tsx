import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary: "border border-border bg-card text-foreground hover:bg-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:text-base",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** A link styled as a button. External URLs open in a new tab. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
