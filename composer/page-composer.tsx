import type { ComponentType } from "react";
import { sectionRegistry } from "@/components/sections/registry";
import type { SectionProps } from "@/components/sections/types";
import { ThemeScope } from "@/design-system/theme-scope";
import type { PageDefinition, SectionBlock } from "./types";

/**
 * Renders a page from its definition: applies the theme, then renders each
 * section with the component registered for its type and variant. Navbars go
 * before <main> and footers after it, so the landmarks are always correct.
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
  const definition = sectionRegistry[block.type];
  const variant = block.variant ?? definition.defaultVariant;
  // TypeScript cannot correlate block.type with its variants, but SectionBlock
  // already guarantees that the content matches the section type.
  const variants = definition.variants as Record<string, ComponentType<SectionProps<unknown>>>;
  const Component = variants[variant];

  if (!Component) {
    throw new Error(
      `Section "${block.type}" has no variant "${variant}". Available: ${Object.keys(variants).join(", ")}.`,
    );
  }

  return (
    <Component
      key={block.id ?? `${block.type}-${index}`}
      id={block.id}
      surface={block.surface}
      content={block.content}
    />
  );
}
