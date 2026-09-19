import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import type { SectionSurface } from "@/design-system/theme";

/** `dark` switches the whole section to the dark palette, whatever the page scheme. */
export const surfaceStyles: Record<SectionSurface, string> = {
  default: "",
  muted: "bg-muted/60",
  dark: "scheme-dark bg-background text-foreground",
};

type SectionSpacing = "default" | "compact";

const spacingStyles: Record<SectionSpacing, string> = {
  default: "py-section sm:py-section-lg",
  compact: "py-12 sm:py-16",
};

type SectionProps = ComponentProps<"section"> & {
  surface?: SectionSurface;
  spacing?: SectionSpacing;
};

/** Page section with the standard vertical rhythm and a centered container. */
export function Section({
  surface = "default",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingStyles[spacing], surfaceStyles[surface], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
