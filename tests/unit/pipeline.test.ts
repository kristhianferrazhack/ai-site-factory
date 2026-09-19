import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { sectionPlanSchema, type Blueprint } from "@/blueprints/blueprint";
import { blueprintFromSiteSpec } from "@/blueprints/from-site-spec";
import {
  assertSectionType,
  assertSectionVariant,
  sectionCatalog,
} from "@/components/sections/catalog";
import { resolvePage } from "@/composer/resolve-page";
import { homePage } from "@/content/home";
import { sectionContentSchemas, sectionTypes } from "@/content/schemas";
import { mergeThemes, themeSchema } from "@/design-system/theme";
import { FactoryError, type FactoryErrorCode } from "@/lib/factory-error";
import { array, ValidationContext, type Schema } from "@/lib/schema";
import { buildSite, formatValidationErrors, validateBlueprint, validateSiteSpec } from "@/site-spec";
import { getTemplate, templates } from "@/templates";
import { exampleIds, loadSpec, sectionIndex, withChange } from "../support";

function validSpec(id: (typeof exampleIds)[number]) {
  const result = validateSiteSpec(loadSpec(id));
  if (!result.valid) throw new Error(formatValidationErrors(result));
  return result.value;
}

function isFactoryError(code: FactoryErrorCode) {
  return (error: unknown) => error instanceof FactoryError && error.code === code;
}

function issuesOf(schema: Schema<unknown>, value: unknown) {
  const ctx = new ValidationContext();
  schema.check(value, ctx);
  return ctx.issues;
}

describe("SiteSpec → validation → blueprint → template resolution → page definition", () => {
  for (const id of exampleIds) {
    test(`${id}: every stage works end to end`, () => {
      const spec = validSpec(id);

      // Blueprint: structure only, content kept apart and keyed by section id.
      const { blueprint, content } = blueprintFromSiteSpec(spec);
      assert.ok(validateBlueprint(structuredClone(blueprint)).valid, "the blueprint is valid");
      assert.ok(blueprint.sections.every((section) => !("content" in section)));
      assert.deepEqual(Object.keys(content), spec.sections.map((section) => section.id));

      // Template resolution: same sections, in order, with explicit registered variants.
      const page = resolvePage(blueprint, content);
      assert.deepEqual(
        page.sections.map((block) => block.id),
        spec.sections.map((section) => section.id),
      );
      for (const block of page.sections) {
        assert.ok(block.variant, `section "${block.id}" has a resolved variant`);
        assert.doesNotThrow(() => assertSectionVariant(block.type, block.variant));
        assert.deepEqual(block.content, content[block.id as string]);
      }
      const template = getTemplate(spec.template);
      assert.deepEqual(page.theme, mergeThemes(template.theme, spec.brand));

      // The factory entry point runs the same stages.
      assert.deepEqual(buildSite(loadSpec(id)), { blueprint, page });
    });
  }

  test("template choices apply when the spec omits them; explicit choices win", () => {
    const landing = buildSite(loadSpec("landing-page")).page;
    const byId = (id: string) => landing.sections.find((block) => block.id === id);
    assert.equal(byId("inicio")?.variant, "centered", "template's preferred hero");
    assert.equal(byId("demonstracao")?.variant, "form", "template's preferred CTA");
    assert.equal(byId("recursos")?.variant, "grid", "catalog default");
    assert.deepEqual(landing.theme?.colors?.accent, { light: "#0f766e", dark: "#2dd4bf" }, "brand wins");

    const lawFirm = buildSite(loadSpec("law-firm")).page;
    assert.equal(lawFirm.theme?.scheme, "light");
    assert.equal(lawFirm.theme?.headingFont, "serif");
    assert.equal(lawFirm.sections[1].variant, "split", "explicit variant in the spec");
  });
});

describe("the factory fails explicitly instead of producing a wrong site", () => {
  const lawFirm = () => blueprintFromSiteSpec(validSpec("law-firm"));

  test("buildSite rejects an invalid SiteSpec with every issue", () => {
    const hero = sectionIndex(loadSpec("law-firm"), "inicio");
    const input = withChange(
      withChange(loadSpec("law-firm"), ["template"], "restaurant"),
      ["sections", hero, "variant"],
      "dark",
    );
    assert.throws(
      () => buildSite(input),
      (error: unknown) =>
        isFactoryError("INVALID_SITE_SPEC")(error) &&
        (error as FactoryError).issues.length === 2 &&
        (error as FactoryError).message.includes(`- sections[${hero}].variant:`),
    );
  });

  test("unknown template", () => {
    const { blueprint, content } = lawFirm();
    const invalid = { ...blueprint, template: "restaurant" } as unknown as Blueprint;
    assert.throws(() => resolvePage(invalid, content), isFactoryError("UNKNOWN_TEMPLATE"));
  });

  test("unknown section type", () => {
    const { blueprint, content } = lawFirm();
    const sections = [...blueprint.sections, { id: "galeria", type: "gallery" }];
    const invalid = { ...blueprint, sections } as unknown as Blueprint;
    assert.throws(() => resolvePage(invalid, { ...content, galeria: {} } as never), isFactoryError("UNKNOWN_SECTION"));
  });

  test("unknown variant", () => {
    const { blueprint, content } = lawFirm();
    const sections = blueprint.sections.map((section) =>
      section.type === "hero" ? { ...section, variant: "dark" } : section,
    );
    const invalid = { ...blueprint, sections } as unknown as Blueprint;
    assert.throws(() => resolvePage(invalid, content), isFactoryError("UNKNOWN_VARIANT"));
  });

  test("missing content", () => {
    const { blueprint, content } = lawFirm();
    const withoutHero = Object.fromEntries(Object.entries(content).filter(([id]) => id !== "inicio"));
    assert.throws(() => resolvePage(blueprint, withoutHero), isFactoryError("MISSING_CONTENT"));
  });

  test("renderer guards used by the Page Composer", () => {
    assert.throws(() => assertSectionType("gallery"), isFactoryError("UNKNOWN_SECTION"));
    assert.throws(() => assertSectionType("toString"), isFactoryError("UNKNOWN_SECTION"));
    assert.throws(() => assertSectionVariant("hero", "dark"), isFactoryError("UNKNOWN_VARIANT"));
    assert.throws(() => assertSectionVariant("hero", undefined), isFactoryError("UNKNOWN_VARIANT"));
    assert.throws(() => getTemplate("__proto__"), isFactoryError("UNKNOWN_TEMPLATE"));
  });
});

describe("trusted factory data follows the same rules", () => {
  test("section catalog and content schemas cover the same section types", () => {
    assert.deepEqual(Object.keys(sectionCatalog).sort(), [...sectionTypes].sort());
  });

  test("every template theme and recommended structure is valid", () => {
    for (const template of templates) {
      assert.deepEqual(issuesOf(themeSchema, template.theme), [], `${template.id} theme`);
      assert.deepEqual(issuesOf(array(sectionPlanSchema), template.sections), [], `${template.id} sections`);
    }
  });

  test("the home page content matches the section schemas", () => {
    for (const block of homePage.sections) {
      assertSectionType(block.type);
      assertSectionVariant(block.type, block.variant ?? sectionCatalog[block.type].defaultVariant);
      const issues = issuesOf(sectionContentSchemas[block.type], block.content);
      assert.deepEqual(issues, [], `home "${block.id ?? block.type}" content`);
    }
  });
});
