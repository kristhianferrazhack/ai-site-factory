import { FactoryError } from "@/lib/factory-error";
import { SITE_SPEC_VERSION, type SectionContent, type SiteSpec } from "@/site-spec/schema";
import type { Blueprint, SectionPlan } from "./blueprint";

/** Content of each section, keyed by section id. */
export type SiteContent = Record<string, SectionContent>;

/**
 * SiteSpec → Blueprint. Splits a validated SiteSpec into the structure the
 * factory executes (the blueprint) and the content of each section. It does
 * not validate: call validateSiteSpec() first (or use buildSite()).
 */
export function blueprintFromSiteSpec(spec: SiteSpec): { blueprint: Blueprint; content: SiteContent } {
  const { version, sections, ...fields } = spec;

  if (version !== SITE_SPEC_VERSION) {
    throw new FactoryError("INVALID_SITE_SPEC", `unsupported SiteSpec version ${version}.`);
  }

  const plan = sections.map(
    (section) =>
      ({
        id: section.id,
        type: section.type,
        variant: section.variant,
        surface: section.surface,
        purpose: section.purpose,
      }) as SectionPlan,
  );

  return {
    blueprint: { ...fields, sections: plan },
    content: Object.fromEntries(sections.map((section) => [section.id, section.content])),
  };
}
