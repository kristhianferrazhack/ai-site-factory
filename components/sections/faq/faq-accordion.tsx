import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FaqContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Accordion built on native <details>: accessible and without client JavaScript. */
export function FaqAccordion({ id, surface, content }: SectionProps<FaqContent>) {
  const { eyebrow, title, description, items } = content;

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-left font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-lg [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon
                name="plus"
                className="text-muted-foreground transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="pr-10 pb-6 leading-7 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
