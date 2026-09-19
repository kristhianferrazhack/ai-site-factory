import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

/** Type scale for headings. The font family comes from the --font-heading token. */
const sizeStyles: Record<HeadingSize, string> = {
  display: "text-5xl leading-[1.05] tracking-tighter sm:text-7xl",
  xl: "text-4xl leading-tight tracking-tight sm:text-5xl",
  lg: "text-3xl leading-tight tracking-tight sm:text-4xl",
  md: "text-xl leading-snug tracking-tight sm:text-2xl",
  sm: "text-lg leading-snug",
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  size?: HeadingSize;
};

/** Visual size is independent of the level, so the outline stays semantic. */
export function Heading({ as: Tag = "h2", size = "lg", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn("font-heading font-semibold text-balance", sizeStyles[size], className)}
      {...props}
    />
  );
}
