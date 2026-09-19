import type { Blueprint, BlueprintContent } from "@/blueprints/types";
import { mergeThemes } from "@/design-system/theme";
import { getTemplate } from "@/templates";
import type { PageDefinition, SectionBlock } from "./types";

export type ComposedSite = {
  blueprint: Blueprint;
  page: PageDefinition;
};

/**
 * Blueprint + content → page definition. The template provides the base theme
 * and the preferred variants; the blueprint's brand and explicit choices win.
 */
export function composeSite<B extends Blueprint>(
  blueprint: B,
  content: BlueprintContent<B>,
): ComposedSite {
  const template = getTemplate(blueprint.template);
  const contentById = content as Record<string, unknown>;

  const sections = blueprint.sections.map((plan) => {
    const sectionContent = contentById[plan.id];
    if (sectionContent === undefined) {
      throw new Error(`Blueprint "${blueprint.id}" has no content for section "${plan.id}".`);
    }

    return {
      type: plan.type,
      variant: plan.variant ?? template.variants[plan.type],
      id: plan.id,
      surface: plan.surface,
      content: sectionContent,
    } as SectionBlock;
  });

  return {
    blueprint,
    page: { theme: mergeThemes(template.theme, blueprint.brand), sections },
  };
}
