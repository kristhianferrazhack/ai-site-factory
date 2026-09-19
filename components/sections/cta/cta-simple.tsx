import { Actions } from "@/components/ui/actions";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import type { CtaContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Centered panel with title, description and buttons. */
export function CtaSimple({ id, surface, content }: SectionProps<CtaContent>) {
  const { title, description, primaryAction, secondaryAction } = content;

  return (
    <Section id={id} surface={surface}>
      <div className="relative isolate overflow-hidden rounded-panel border border-border bg-surface px-6 py-16 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[40rem] max-w-full -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <Heading className="mx-auto max-w-2xl">{title}</Heading>
        {description && <Text className="mx-auto mt-4 max-w-xl">{description}</Text>}
        <Actions
          primary={primaryAction}
          secondary={secondaryAction}
          className="mt-10 justify-center"
        />
      </div>
    </Section>
  );
}
