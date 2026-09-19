import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TimelineContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Numbered cards for a short process (3 or 4 steps work best). */
export function TimelineSteps({ id, surface, content }: SectionProps<TimelineContent>) {
  const { eyebrow, title, description, items } = content;

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol
        className={cn(
          "mt-14 grid gap-6",
          items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {items.map((item, index) => (
          <li key={item.title}>
            <Card>
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
