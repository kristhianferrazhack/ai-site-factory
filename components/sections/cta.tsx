import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { LinkItem } from "@/lib/types";

type CtaProps = {
  title: string;
  description: string;
  primaryAction: LinkItem;
  secondaryAction?: LinkItem;
};

export function Cta({ title, description, primaryAction, secondaryAction }: CtaProps) {
  return (
    <Section className="border-t border-border">
      <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[40rem] max-w-full -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          {secondaryAction && (
            <ButtonLink href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
