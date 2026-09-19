import type { Blueprint } from "@/blueprints/blueprint";
import type { SiteContent } from "@/blueprints/from-site-spec";
import { assertSectionType, assertSectionVariant } from "@/components/sections/catalog";
import { mergeThemes } from "@/design-system/theme";
import { FactoryError } from "@/lib/factory-error";
import { getTemplate, resolveVariant } from "@/templates";
import type { PageDefinition, SectionBlock } from "./types";

/**
 * Template resolution: blueprint + content → page definition. Merges the
 * template theme with the brand and resolves the variant of every section.
 * Expects validated input, but still fails explicitly (FactoryError) on an
 * unknown template, section or variant, or on missing content.
 */
export function resolvePage(blueprint: Blueprint, content: SiteContent): PageDefinition {
  const template = getTemplate(blueprint.template);

  const sections = blueprint.sections.map((plan) => {
    assertSectionType(plan.type);
    const sectionContent = content[plan.id];
    if (sectionContent === undefined) {
      throw new FactoryError("MISSING_CONTENT", `section "${plan.id}" has no content.`);
    }

    const variant = resolveVariant(template, plan.type, plan.variant);
    assertSectionVariant(plan.type, variant);

    return {
      type: plan.type,
      variant,
      id: plan.id,
      surface: plan.surface,
      content: sectionContent,
    } as SectionBlock;
  });

  return { theme: mergeThemes(template.theme, blueprint.brand), sections };
}
