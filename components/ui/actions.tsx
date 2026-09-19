import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import type { LinkItem } from "@/content/schemas";

type ActionsProps = {
  primary?: LinkItem;
  secondary?: LinkItem;
  className?: string;
};

/** Primary and secondary call-to-action buttons. Stacked on mobile. */
export function Actions({ primary, secondary, className }: ActionsProps) {
  if (!primary && !secondary) return null;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
      {secondary && (
        <ButtonLink href={secondary.href} variant="secondary">
          {secondary.label}
        </ButtonLink>
      )}
    </div>
  );
}
