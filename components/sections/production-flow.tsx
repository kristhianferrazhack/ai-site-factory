import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Stage = {
  name: string;
  description: string;
};

type ProductionFlowProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  stages: Stage[];
};

/** Pipeline of stages: vertical on small screens, horizontal on large ones. */
export function ProductionFlow({ id, eyebrow, title, description, stages }: ProductionFlowProps) {
  return (
    <Section id={id} className="border-t border-border">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-14 grid gap-8 lg:grid-cols-6 lg:gap-4">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          return (
            <li key={stage.name} className="relative flex gap-4 lg:flex-col">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-10 -bottom-6 left-4 w-px bg-border lg:top-4 lg:-right-2 lg:bottom-auto lg:left-10 lg:h-px lg:w-auto"
                />
              )}
              <span
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                  isLast
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  {stage.name}
                  {isLast && (
                    <span className="relative flex size-2" aria-hidden="true">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
