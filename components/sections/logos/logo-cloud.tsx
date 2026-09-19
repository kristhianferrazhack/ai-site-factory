import { Section } from "@/components/ui/section";
import type { LogosContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Strip of company wordmarks used as social proof. */
export function LogoCloud({ id, surface, content }: SectionProps<LogosContent>) {
  const { title, items } = content;

  return (
    <Section id={id} surface={surface} spacing="compact">
      {title && <p className="text-center text-sm font-medium text-muted-foreground">{title}</p>}
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {items.map((name) => (
          <li
            key={name}
            className="font-heading text-xl font-semibold tracking-tight text-muted-foreground"
          >
            {name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
