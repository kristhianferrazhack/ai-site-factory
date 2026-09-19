import { blueprintSchema, type Blueprint, type SectionPlan } from "@/blueprints/blueprint";
import {
  isPlainObject,
  ValidationContext,
  type PathSegment,
  type Schema,
  type ValidationIssue,
} from "@/lib/schema";
import { getTemplate, resolveVariant } from "@/templates";
import { siteSpecSchema, type SiteSpec } from "./schema";

/*
 * Validation layer: decides whether an input can enter the factory.
 * It never builds or renders anything.
 *
 * 1. Structure: every field against its schema (types, required fields,
 *    formats, lengths, unknown fields, templates, sections, variants).
 * 2. Factory rules, only on structurally valid input: unique section ids,
 *    one hero, navbar first and footer last, internal links that resolve,
 *    content required by the chosen variant.
 */

export type ValidationResult<T> =
  | { valid: true; value: T; errors: [] }
  | { valid: false; code: "INVALID_SITE_SPEC" | "INVALID_BLUEPRINT"; errors: ValidationIssue[] };

export type InvalidResult = Extract<ValidationResult<unknown>, { valid: false }>;

/** Validates untrusted input (e.g. JSON from an AI) as a SiteSpec. */
export function validateSiteSpec(input: unknown): ValidationResult<SiteSpec> {
  return runValidation(input, siteSpecSchema, "INVALID_SITE_SPEC", (spec, ctx) => {
    checkSectionStructure(spec.sections, ctx);
    checkInternalLinks(spec, ctx);
    checkVariantContent(spec, ctx);
  });
}

/** Validates a blueprint (a plan without content), e.g. one drafted before the copy. */
export function validateBlueprint(input: unknown): ValidationResult<Blueprint> {
  return runValidation(input, blueprintSchema, "INVALID_BLUEPRINT", (blueprint, ctx) => {
    checkSectionStructure(blueprint.sections, ctx);
    checkInternalLinks(blueprint, ctx);
  });
}

/** Human- and AI-readable report of a rejected input. */
export function formatValidationErrors(result: InvalidResult): string {
  return `${result.code}: ${formatIssues(result.errors)}`;
}

export function formatIssues(issues: readonly ValidationIssue[]): string {
  const lines = issues.map((issue) => `- ${issue.path || "(root)"}: ${issue.message}`);
  return [`${issues.length} error${issues.length === 1 ? "" : "s"}`, ...lines].join("\n");
}

function runValidation<T>(
  input: unknown,
  schema: Schema<T>,
  code: InvalidResult["code"],
  checkRules: (value: T, ctx: ValidationContext) => void,
): ValidationResult<T> {
  const ctx = new ValidationContext();
  if (schema.check(input, ctx)) checkRules(input, ctx);
  if (ctx.issues.length > 0) return { valid: false, code, errors: ctx.issues };
  return { valid: true, value: input as T, errors: [] };
}

function indexesOfType(sections: readonly SectionPlan[], type: SectionPlan["type"]) {
  return sections.flatMap((section, index) => (section.type === type ? [index] : []));
}

/** Unique ids, exactly one hero (the page h1), navbar first and footer last. */
function checkSectionStructure(sections: readonly SectionPlan[], ctx: ValidationContext) {
  const firstIndexById = new Map<string, number>();
  sections.forEach((section, index) => {
    const first = firstIndexById.get(section.id);
    if (first === undefined) {
      firstIndexById.set(section.id, index);
      return;
    }
    ctx.failAt(
      ["sections", index, "id"],
      "duplicate_id",
      `section id "${section.id}" is already used by sections[${first}]; ids must be unique`,
    );
  });

  const heroes = indexesOfType(sections, "hero");
  if (heroes.length === 0) {
    ctx.failAt(
      ["sections"],
      "invalid_structure",
      'must contain exactly one "hero" section (it holds the page title, the only h1); found none',
    );
  }
  heroes.slice(1).forEach((index) => {
    ctx.failAt(["sections", index, "type"], "invalid_structure", 'only one "hero" section is allowed per page');
  });

  indexesOfType(sections, "navbar").forEach((index, position) => {
    if (position > 0) {
      ctx.failAt(["sections", index, "type"], "invalid_structure", 'only one "navbar" section is allowed');
    } else if (index !== 0) {
      ctx.failAt(["sections", index, "type"], "invalid_structure", '"navbar" must be the first section');
    }
  });

  const lastIndex = sections.length - 1;
  indexesOfType(sections, "footer").forEach((index, position) => {
    if (position > 0) {
      ctx.failAt(["sections", index, "type"], "invalid_structure", 'only one "footer" section is allowed');
    } else if (index !== lastIndex) {
      ctx.failAt(["sections", index, "type"], "invalid_structure", '"footer" must be the last section');
    }
  });
}

/** Every "#anchor" link (main CTA and any href in the content) must point to a section id. */
function checkInternalLinks(
  site: { cta: { href: string }; sections: readonly (SectionPlan & { content?: unknown })[] },
  ctx: ValidationContext,
) {
  const ids = new Set(site.sections.map((section) => section.id));
  const available = [...ids].join(", ");

  const checkHref = (href: string, path: PathSegment[]) => {
    if (href.startsWith("#") && !ids.has(href.slice(1))) {
      ctx.failAt(path, "broken_link", `link "${href}" does not match any section id. Section ids: ${available}`);
    }
  };

  checkHref(site.cta.href, ["cta", "href"]);
  site.sections.forEach((section, index) => {
    visitHrefs(section.content, ["sections", index, "content"], checkHref);
  });
}

function visitHrefs(
  value: unknown,
  path: PathSegment[],
  visit: (href: string, path: PathSegment[]) => void,
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visitHrefs(item, [...path, index], visit));
  } else if (isPlainObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      if (key === "href" && typeof child === "string") visit(child, [...path, key]);
      else visitHrefs(child, [...path, key], visit);
    }
  }
}

/** Content that only some variants need, resolved with the template's preferred variants. */
function checkVariantContent(spec: SiteSpec, ctx: ValidationContext) {
  const template = getTemplate(spec.template);

  spec.sections.forEach((section, index) => {
    if (section.type !== "cta") return;
    const variant = resolveVariant(template, "cta", section.variant);
    if (variant === "form" && !section.content.form) {
      ctx.failAt(
        ["sections", index, "content", "form"],
        "required",
        'required when the "cta" section uses the "form" variant (set here or by the template)',
      );
    }
  });
}
