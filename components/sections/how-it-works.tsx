import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = {
  title: string;
  description: string;
};

type HowItWorksProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  steps: Step[];
};

export function HowItWorks({ id, eyebrow, title, description, steps }: HowItWorksProps) {
  return (
    <Section id={id} className="border-t border-border">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Card>
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
