import { Actions } from "@/components/ui/actions";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import type { CtaContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** High-contrast dark panel, copy on the left and buttons on the right. */
export function CtaHighlight({ id, surface, content }: SectionProps<CtaContent>) {
  const { title, description, primaryAction, secondaryAction } = content;

  return (
    <Section id={id} surface={surface}>
      <div className="scheme-dark relative isolate overflow-hidden rounded-panel border border-border bg-background px-6 py-14 text-foreground sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 -z-10 size-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl"
        />
        <div className="max-w-2xl">
          <Heading>{title}</Heading>
          {description && <Text className="mt-4">{description}</Text>}
        </div>
        <Actions
          primary={primaryAction}
          secondary={secondaryAction}
          className="mt-8 lg:mt-0 lg:shrink-0"
        />
      </div>
    </Section>
  );
}
