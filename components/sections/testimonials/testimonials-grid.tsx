import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TestimonialsContent } from "@/content/schemas";
import type { SectionProps } from "../types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Grid of quotes with author and role. */
export function TestimonialsGrid({ id, surface, content }: SectionProps<TestimonialsContent>) {
  const { eyebrow, title, description, items } = content;

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.author}>
            <Card>
              <figure className="flex h-full flex-col">
                <blockquote className="flex-1 text-base leading-7">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent"
                  >
                    {initials(item.author)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{item.author}</span>
                    {item.role && <span className="block text-muted-foreground">{item.role}</span>}
                  </span>
                </figcaption>
              </figure>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
