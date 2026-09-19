import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BenefitsContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Heading and CTA on one side, checklist of benefits on the other. */
export function BenefitsSplit({ id, surface, content }: SectionProps<BenefitsContent>) {
  const { eyebrow, title, description, items, action } = content;

  return (
    <Section id={id} surface={surface}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
          {action && (
            <ButtonLink href={action.href} className="mt-8">
              {action.label}
            </ButtonLink>
          )}
        </div>
        <ul className="grid gap-8">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon name="check" size="sm" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
