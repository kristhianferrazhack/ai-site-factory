import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TimelineContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Up to this many stages fit in one row on large screens; more are split into two rows. */
const MAX_STAGES_PER_ROW = 6;

/**
 * Connected pipeline: vertical on small screens, horizontal rows on large
 * ones. The last stage is highlighted as the outcome. Keep descriptions short.
 */
export function TimelineFlow({ id, surface, content }: SectionProps<TimelineContent>) {
  const { eyebrow, title, description, items } = content;
  const perRow =
    items.length <= MAX_STAGES_PER_ROW ? items.length : Math.ceil(items.length / 2);
  const gridStyle = {
    "--flow-columns": `repeat(${perRow}, minmax(0, 1fr))`,
  } as CSSProperties;

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol
        style={gridStyle}
        className="mt-14 grid gap-8 lg:grid-cols-(--flow-columns) lg:gap-x-4 lg:gap-y-12"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const endsRow = (index + 1) % perRow === 0;
          return (
            <li key={item.title} className="relative flex gap-4 lg:flex-col">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-10 -bottom-6 left-4 w-px bg-border lg:top-4 lg:-right-2 lg:bottom-auto lg:left-10 lg:h-px lg:w-auto",
                    endsRow && "lg:hidden",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  isLast
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-border bg-surface text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  {item.title}
                  {isLast && (
                    <span className="relative flex size-2" aria-hidden="true">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
