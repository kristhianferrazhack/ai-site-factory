import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "default" | "elevated" | "accent";

const variantStyles: Record<CardVariant, string> = {
  default: "border-border shadow-card",
  elevated: "border-border shadow-elevated",
  accent: "border-accent shadow-elevated ring-1 ring-accent",
};

type CardProps = ComponentProps<"div"> & {
  variant?: CardVariant;
};

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "h-full rounded-card border bg-surface p-6 sm:p-8",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
