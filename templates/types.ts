import type { SectionPlan } from "@/blueprints/blueprint";
import type { SectionVariant } from "@/components/sections/catalog";
import type { IconName } from "@/components/ui/icon-names";
import type { SectionType } from "@/content/schemas";
import type { Theme } from "@/design-system/theme";

/** Kinds of site the factory builds. Each one has a template for now. */
export const siteTypes = [
  "landing-page",
  "law-firm",
  "services",
  "corporate",
  "saas",
  "agency",
  "consulting",
] as const;

export type SiteType = (typeof siteTypes)[number];

export type TemplateId = SiteType;

/**
 * A template is the reusable starting point for a kind of site: visual
 * identity, preferred section variants, recommended structure and content
 * rules. It holds no client content; SiteSpecs do.
 */
export type Template = {
  id: TemplateId;
  name: string;
  description: string;
  /** "ready": used by an example site. "draft": structure prepared, no example yet. */
  status: "ready" | "draft";
  icon: IconName;
  /** Overrides of the Design System tokens. */
  theme: Theme;
  /** Preferred variant per section type, used when a SiteSpec does not pick one. */
  variants: { [T in SectionType]?: SectionVariant<T> };
  /** Recommended sections, in order: the starting point for new SiteSpecs. */
  sections: readonly SectionPlan[];
  /** Content and tone rules for this kind of site. */
  guidelines: readonly string[];
};

export function defineTemplate(template: Template): Template {
  return template;
}
