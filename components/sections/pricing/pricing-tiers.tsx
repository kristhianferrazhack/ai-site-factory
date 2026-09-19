import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PricingContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Plan cards side by side. The `highlighted` plan gets emphasis and the primary button. */
export function PricingTiers({ id, surface, content }: SectionProps<PricingContent>) {
  const { eyebrow, title, description, plans, note } = content;
  const columns =
    plans.length === 2 ? "lg:mx-auto lg:max-w-4xl lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className={cn("mt-14 grid gap-6", columns)}>
        {plans.map((plan) => (
          <li key={plan.name}>
            <Card variant={plan.highlighted ? "accent" : "default"} className="flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
                {plan.badge && <Badge variant="accent">{plan.badge}</Badge>}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-semibold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </p>
              <ul className="mt-6 grid flex-1 content-start gap-3 text-sm leading-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Icon name="check" className="text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={plan.action.href}
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.action.label}
              </ButtonLink>
            </Card>
          </li>
        ))}
      </ul>
      {note && <p className="mt-8 text-center text-sm text-muted-foreground">{note}</p>}
    </Section>
  );
}
