import type { ComponentType } from "react";
import {
  assertSectionType,
  assertSectionVariant,
  sectionCatalog,
} from "@/components/sections/catalog";
import { sectionComponents } from "@/components/sections/registry";
import type { SectionProps } from "@/components/sections/types";
import { ThemeScope } from "@/design-system/theme-scope";
import type { PageDefinition, SectionBlock } from "./types";

/**
 * Renderer: turns a page definition into React. Applies the theme and renders
 * each section with the component registered for its type and variant. Navbars
 * go before <main> and footers after it, so the landmarks are always correct.
 *
 * It does not validate content (that is the validation layer's job), but it
 * never falls back silently: an unknown section or variant throws FactoryError.
 */
export function PageComposer({ page }: { page: PageDefinition }) {
  const header = page.sections.filter((block) => block.type === "navbar");
  const footer = page.sections.filter((block) => block.type === "footer");
  const body = page.sections.filter((block) => block.type !== "navbar" && block.type !== "footer");

  return (
    <ThemeScope theme={page.theme}>
      {header.map(renderSection)}
      <main className="flex-1">{body.map(renderSection)}</main>
      {footer.map(renderSection)}
    </ThemeScope>
  );
}

function renderSection(block: SectionBlock, index: number) {
  assertSectionType(block.type);
  const variant = block.variant ?? sectionCatalog[block.type].defaultVariant;
  assertSectionVariant(block.type, variant);

  // TypeScript cannot correlate block.type with its variants, but the asserts
  // above and SectionBlock guarantee that component and content match.
  const variants = sectionComponents[block.type] as Record<string, ComponentType<SectionProps<unknown>>>;
  const Component = variants[variant];

  return (
    <Component
      key={block.id ?? `${block.type}-${index}`}
      id={block.id}
      surface={block.surface}
      content={block.content}
    />
  );
}
