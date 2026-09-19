import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "outline" | "accent";

const variantStyles: Record<BadgeVariant, string> = {
  outline: "border border-border bg-surface text-muted-foreground",
  accent: "bg-accent/10 text-accent ring-1 ring-accent/25 ring-inset",
};

type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  /** Shows a small status dot before the label. */
  dot?: boolean;
};

export function Badge({ variant = "outline", dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-control px-3 py-1 text-xs font-medium whitespace-nowrap",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />}
      {children}
    </span>
  );
}
