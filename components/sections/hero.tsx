import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { LinkItem } from "@/lib/types";

type HeroProps = {
  badge?: string;
  title: string;
  description: string;
  primaryAction: LinkItem;
  secondaryAction?: LinkItem;
  /** Optional visual shown below the copy (terminal, screenshot, preview...). */
  visual?: ReactNode;
};

export function Hero({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  visual,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-[48rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="flex flex-col items-center pt-20 pb-20 text-center sm:pt-28 sm:pb-28">
        {badge && <Badge>{badge}</Badge>}
        <h1 className="mt-6 text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl">
          {description}
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          {secondaryAction && (
            <ButtonLink href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </ButtonLink>
          )}
        </div>
        {visual && <div className="mt-16 w-full max-w-3xl text-left sm:mt-20">{visual}</div>}
      </Container>
    </section>
  );
}
