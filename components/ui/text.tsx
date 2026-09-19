import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextSize = "lg" | "md" | "sm";
type TextTone = "default" | "muted";

/** Type scale for body text. */
const sizeStyles: Record<TextSize, string> = {
  lg: "text-lg leading-8 sm:text-xl",
  md: "text-base leading-7 sm:text-lg",
  sm: "text-sm leading-6",
};

const toneStyles: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div";
  size?: TextSize;
  tone?: TextTone;
};

export function Text({ as: Tag = "p", size = "md", tone = "muted", className, ...props }: TextProps) {
  return (
    <Tag className={cn("text-pretty", sizeStyles[size], toneStyles[tone], className)} {...props} />
  );
}
