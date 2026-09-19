import {
  blueprintShape,
  schemaPerSectionType,
  sectionPlanShape,
  sectionSchema,
  type SectionPlan,
} from "@/blueprints/blueprint";
import { sectionContentSchemas, type SectionContentMap, type SectionType } from "@/content/schemas";
import { array, literal, object, type Infer } from "@/lib/schema";

/*
 * SiteSpec: the contract between an AI (or a person) and the factory.
 *
 * One JSON document with the complete intent of a site: strategy, template,
 * brand, SEO, main CTA and the ordered sections with their content. It says
 * WHAT the site must be; the factory decides HOW to build it. A SiteSpec can
 * only reference things the factory already has (templates, section types,
 * variants, icons) and can only contain data: no code, markup or CSS.
 *
 * It is made of existing pieces: the blueprint fields (blueprints/blueprint.ts)
 * plus, in each section, the content schema of its type (content/schemas).
 */

/** Version of the contract. Changes that break existing specs get a new version. */
export const SITE_SPEC_VERSION = 1;

/** A section of a SiteSpec: its place in the plan plus its content. */
export type SectionSpec = {
  [T in SectionType]: Extract<SectionPlan, { type: T }> & { content: SectionContentMap[T] };
}[SectionType];

export type SectionContent = SectionContentMap[SectionType];

const sectionSpecSchema = sectionSchema<SectionSpec>(
  schemaPerSectionType((type) => ({
    ...sectionPlanShape(type),
    content: sectionContentSchemas[type],
  })),
);

export const siteSpecSchema = object({
  version: literal(SITE_SPEC_VERSION),
  ...blueprintShape,
  sections: array(sectionSpecSchema, { min: 1, max: 20 }),
});

export type SiteSpec = Infer<typeof siteSpecSchema>;
