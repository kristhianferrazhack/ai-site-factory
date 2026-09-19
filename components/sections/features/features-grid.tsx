import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FeatureItem, FeaturesContent } from "@/content/schemas";
import type { SectionProps } from "../types";

function FeatureCardBody({ item }: { item: FeatureItem }) {
  return (
    <>
      {(item.icon || item.badge) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          {item.icon && (
            <span className="flex size-11 items-center justify-center rounded-field bg-accent/10 text-accent">
              <Icon name={item.icon} />
            </span>
          )}
          {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
        </div>
      )}
      <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
      {item.href && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {item.linkLabel ?? "Saiba mais"}
          <Icon
            name="arrow-right"
            size="sm"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  );
}

/** Grid of cards with icon, title and description. Cards with `href` become links. */
export function FeaturesGrid({ id, surface, content }: SectionProps<FeaturesContent>) {
  const { eyebrow, title, description, items } = content;
  const columns = items.length === 2 || items.length === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <Section id={id} surface={surface}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className={cn("mt-14 grid gap-6 sm:grid-cols-2", columns)}>
        {items.map((item) => (
          <li key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                className="group block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Card className="transition-colors group-hover:border-accent/50">
                  <FeatureCardBody item={item} />
                </Card>
              </Link>
            ) : (
              <Card>
                <FeatureCardBody item={item} />
              </Card>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
