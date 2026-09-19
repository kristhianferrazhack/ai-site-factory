import { sectionCatalog } from "@/components/sections/catalog";
import type { SectionLayout } from "@/composer/types";
import { linkItemSchema, sectionTypes, type SectionType } from "@/content/schemas";
import { sectionSurfaces, themeSchema } from "@/design-system/theme";
import {
  array,
  custom,
  describe,
  isPlainObject,
  literal,
  object,
  oneOf,
  optional,
  slug,
  text,
  type Infer,
  type Schema,
  type Shape,
} from "@/lib/schema";
import { templateIds } from "@/templates";
import { siteTypes } from "@/templates/types";

/*
 * A blueprint is the structure the factory knows how to execute: strategy,
 * template, brand, SEO and the ordered list of sections, without the copy.
 * It is produced from a validated SiteSpec (see from-site-spec.ts).
 */

export const blueprintGoals = ["lead-generation", "sales", "scheduling", "institutional"] as const;
export type BlueprintGoal = (typeof blueprintGoals)[number];

export const seoSchema = object({
  title: text({ min: 10, max: 70 }),
  description: text({ min: 50, max: 160 }),
});

/** A section of the plan: layout, a unique id and what the section must achieve. */
export type SectionPlan = {
  [T in SectionType]: SectionLayout<T> & {
    /** Unique within the site. Also the anchor id and the key of its content. */
    id: string;
    /** Brief for whoever writes the content (a person or an AI). */
    purpose?: string;
  };
}[SectionType];

/** Fields of a section of type T. Shared by blueprints and SiteSpecs. */
export function sectionPlanShape<T extends SectionType>(type: T) {
  return {
    id: slug("section id"),
    type: literal(type),
    variant: optional(
      oneOf(sectionCatalog[type].variants, {
        code: "unknown_variant",
        subject: `variant for section "${type}"`,
      }),
    ),
    surface: optional(oneOf(sectionSurfaces, { subject: "surface" })),
    purpose: optional(text({ max: 200 })),
  };
}

/**
 * Checks a section with the schema of its "type". An unknown type is reported
 * as such instead of producing a cascade of unrelated errors.
 */
export function sectionSchema<S>(schemaByType: Record<SectionType, Schema<unknown>>): Schema<S> {
  const available = sectionTypes.join(", ");

  return custom<S>("a section object with id, type and the fields of its type", (value, ctx) => {
    if (!isPlainObject(value)) {
      return ctx.fail("invalid_type", `expected a section object, received ${describe(value)}`);
    }
    const { type } = value;
    if (type === undefined) {
      return ctx.at("type", () => ctx.fail("required", `required: one of ${available}`));
    }
    if (typeof type !== "string" || !Object.hasOwn(schemaByType, type)) {
      return ctx.at("type", () =>
        ctx.fail("unknown_section", `${JSON.stringify(type)} is not a valid section type. Expected one of: ${available}`),
      );
    }
    return schemaByType[type as SectionType].check(value, ctx);
  });
}

/** One object schema per section type, built from the fields of that type. */
export function schemaPerSectionType(build: (type: SectionType) => Shape) {
  const schemas = {} as Record<SectionType, Schema<unknown>>;
  for (const type of sectionTypes) schemas[type] = object(build(type));
  return schemas;
}

export const sectionPlanSchema = sectionSchema<SectionPlan>(schemaPerSectionType(sectionPlanShape));

/** Blueprint fields other than the sections. The SiteSpec reuses them as they are. */
export const blueprintShape = {
  id: slug("site id"),
  name: text({ max: 80 }),
  type: oneOf(siteTypes, { subject: "site type" }),
  template: oneOf(templateIds, { code: "unknown_template", subject: "template" }),
  goal: oneOf(blueprintGoals, { subject: "goal" }),
  audience: text({ max: 200 }),
  offer: text({ max: 200 }),
  /** Main call to action, repeated across the page. */
  cta: linkItemSchema,
  tone: array(text({ max: 30 }), { min: 1, max: 6 }),
  /** Brand overrides on top of the template theme. */
  brand: optional(themeSchema),
  seo: seoSchema,
};

export const blueprintSchema = object({
  ...blueprintShape,
  sections: array(sectionPlanSchema, { min: 1, max: 20 }),
});

export type Blueprint = Infer<typeof blueprintSchema>;
