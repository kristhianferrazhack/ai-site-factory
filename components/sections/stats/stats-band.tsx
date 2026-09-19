import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { StatsContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Row of highlighted numbers. The heading is optional. */
export function StatsBand({ id, surface, content }: SectionProps<StatsContent>) {
  const { eyebrow, title, description, items } = content;

  return (
    <Section id={id} surface={surface} spacing="compact">
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      <dl
        className={cn(
          "grid grid-cols-2 gap-x-6 gap-y-10",
          items.length >= 4 ? "lg:grid-cols-4" : "sm:grid-cols-3",
          title && "mt-12",
        )}
      >
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-2 border-l-2 border-accent/40 pl-5">
            <dt className="text-sm leading-6 text-muted-foreground">{item.label}</dt>
            <dd className="order-first font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
