import type { SectionLayout } from "@/composer/types";
import type { LinkItem, SectionContentMap, SectionType } from "@/content/schemas";
import type { Theme } from "@/design-system/theme";
import type { SiteType, TemplateId } from "@/templates/types";

export type BlueprintGoal = "lead-generation" | "sales" | "scheduling" | "institutional";

/** A section of the plan: layout, a unique id and what the section must achieve. */
export type SectionPlan = {
  [T in SectionType]: SectionLayout<T> & {
    /** Unique within the blueprint. Also the anchor id and the key of its content. */
    id: string;
    /** Brief for whoever writes the content (a person or, later, an agent). */
    purpose?: string;
  };
}[SectionType];

/**
 * A blueprint is the specification of a site before it is built: strategy,
 * visual identity and the ordered list of sections. It holds no copy.
 */
export type Blueprint = {
  id: string;
  /** Name of the business or product. */
  name: string;
  type: SiteType;
  template: TemplateId;
  goal: BlueprintGoal;
  audience: string;
  offer: string;
  /** Main call to action, repeated across the page. */
  cta: LinkItem;
  tone: readonly string[];
  /** Brand overrides on top of the template theme. */
  brand?: Theme;
  seo: { title: string; description: string };
  sections: readonly SectionPlan[];
};

/** Keeps literal ids and types, so BlueprintContent can check the content of every section. */
export function defineBlueprint<const B extends Blueprint>(blueprint: B): B {
  return blueprint;
}

/** Content required by a blueprint: one entry per section id, typed by section type. */
export type BlueprintContent<B extends Blueprint> = {
  [Plan in B["sections"][number] as Plan["id"]]: SectionContentMap[Plan["type"]];
};
