import type { SectionPlan } from "@/blueprints/types";
import type { SectionVariant } from "@/components/sections/registry";
import type { IconName } from "@/components/ui/icon";
import type { SectionType } from "@/content/schemas";
import type { Theme } from "@/design-system/theme";

/** Kinds of site the factory builds. Each one has a template for now. */
export type SiteType =
  | "landing-page"
  | "law-firm"
  | "services"
  | "corporate"
  | "saas"
  | "agency"
  | "consulting";

export type TemplateId = SiteType;

/**
 * A template is the reusable starting point for a kind of site: visual
 * identity, preferred section variants, recommended structure and content
 * rules. It holds no client content; blueprints and content files do.
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
  /** Preferred variant per section type, used when a blueprint does not pick one. */
  variants: { [T in SectionType]?: SectionVariant<T> };
  /** Recommended sections, in order: the starting point for new blueprints. */
  sections: readonly SectionPlan[];
  /** Content and tone rules for this kind of site. */
  guidelines: readonly string[];
};

export function defineTemplate(template: Template): Template {
  return template;
}
