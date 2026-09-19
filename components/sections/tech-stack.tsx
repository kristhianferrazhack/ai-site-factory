import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Technology = {
  name: string;
  /** Short label shown in the tile, e.g. "TS". */
  monogram: string;
  description: string;
};

type TechStackProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: Technology[];
};

export function TechStack({ id, eyebrow, title, description, items }: TechStackProps) {
  return (
    <Section id={id} className="border-t border-border bg-muted/40">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.name}>
            <Card className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted font-mono text-xs font-semibold"
              >
                {item.monogram}
              </span>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
