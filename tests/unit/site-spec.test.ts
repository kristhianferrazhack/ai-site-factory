import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { blueprintFromSiteSpec } from "@/blueprints/from-site-spec";
import type { ValidationIssue } from "@/lib/schema";
import { formatValidationErrors, validateBlueprint, validateSiteSpec } from "@/site-spec";
import { exampleIds, loadSpec, sectionIndex, withChange, type JsonObject } from "../support";

type ExpectedIssue = Pick<ValidationIssue, "path" | "code">;

function expectValid(input: unknown) {
  const result = validateSiteSpec(input);
  assert.ok(result.valid, result.valid ? "" : formatValidationErrors(result));
  return result.value;
}

/** Asserts the spec is rejected and that each expected issue (path + code) is reported. */
function expectInvalid(input: unknown, expected: ExpectedIssue[]) {
  const result = validateSiteSpec(input);
  assert.equal(result.valid, false, "expected the SiteSpec to be rejected");
  if (result.valid) throw new Error("unreachable");

  assert.equal(result.code, "INVALID_SITE_SPEC");
  for (const issue of expected) {
    const found = result.errors.some((error) => error.path === issue.path && error.code === issue.code);
    assert.ok(found, `expected ${issue.code} at "${issue.path}". Got:\n${formatValidationErrors(result)}`);
  }
  return result;
}

const lawFirm = () => loadSpec("law-firm");
const landingPage = () => loadSpec("landing-page");
const service = () => loadSpec("service");

describe("valid SiteSpecs are accepted", () => {
  for (const id of exampleIds) {
    test(`${id} example`, () => {
      const input = loadSpec(id);
      assert.deepEqual(expectValid(input), input, "a valid spec is returned unchanged");
    });
  }

  test("minimal spec (only required fields and a hero)", () => {
    expectValid(loadSpec("minimal"));
  });
});

describe("invalid SiteSpecs are rejected", () => {
  test("1. unknown template", () => {
    expectInvalid(withChange(lawFirm(), ["template"], "restaurant"), [
      { path: "template", code: "unknown_template" },
    ]);
  });

  test("2. unknown section type", () => {
    const index = sectionIndex(lawFirm(), "escritorio");
    expectInvalid(withChange(lawFirm(), ["sections", index, "type"], "gallery"), [
      { path: `sections[${index}].type`, code: "unknown_section" },
    ]);
  });

  test("3. unknown variant, including a variant of another section type", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    expectInvalid(withChange(lawFirm(), ["sections", hero, "variant"], "dark"), [
      { path: `sections[${hero}].variant`, code: "unknown_variant" },
    ]);
    expectInvalid(withChange(lawFirm(), ["sections", hero, "variant"], "form"), [
      { path: `sections[${hero}].variant`, code: "unknown_variant" },
    ]);
  });

  test("4. required field missing", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    expectInvalid(withChange(lawFirm(), ["sections", hero, "content", "title"], undefined), [
      { path: `sections[${hero}].content.title`, code: "required" },
    ]);
    expectInvalid(withChange(lawFirm(), ["sections", hero, "content"], undefined), [
      { path: `sections[${hero}].content`, code: "required" },
    ]);
    expectInvalid(withChange(lawFirm(), ["sections", hero, "content", "title"], "   "), [
      { path: `sections[${hero}].content.title`, code: "required" },
    ]);
  });

  test("5. field with the wrong type", () => {
    const faq = sectionIndex(service(), "duvidas");
    const stats = sectionIndex(service(), "numeros");
    const pricing = sectionIndex(landingPage(), "planos");
    expectInvalid(withChange(service(), ["sections", faq, "content", "items"], "not a list"), [
      { path: `sections[${faq}].content.items`, code: "invalid_type" },
    ]);
    expectInvalid(withChange(service(), ["sections", stats, "content", "items", 0, "value"], 12), [
      { path: `sections[${stats}].content.items[0].value`, code: "invalid_type" },
    ]);
    expectInvalid(
      withChange(landingPage(), ["sections", pricing, "content", "plans", 1, "highlighted"], "yes"),
      [{ path: `sections[${pricing}].content.plans[1].highlighted`, code: "invalid_type" }],
    );
    expectInvalid(withChange(lawFirm(), ["tone"], "sóbrio"), [{ path: "tone", code: "invalid_type" }]);
  });

  test("6. invalid SEO", () => {
    expectInvalid(withChange(lawFirm(), ["seo", "title"], "T".repeat(71)), [
      { path: "seo.title", code: "too_long" },
    ]);
    expectInvalid(withChange(lawFirm(), ["seo", "description"], "Curta demais."), [
      { path: "seo.description", code: "too_short" },
    ]);
    expectInvalid(withChange(lawFirm(), ["seo", "description"], undefined), [
      { path: "seo.description", code: "required" },
    ]);
    expectInvalid(withChange(lawFirm(), ["seo"], "Vieira Montenegro Advocacia"), [
      { path: "seo", code: "invalid_type" },
    ]);
  });

  test("7. invalid theme", () => {
    expectInvalid(withChange(lawFirm(), ["brand"], { scheme: "neon" }), [
      { path: "brand.scheme", code: "invalid_value" },
    ]);
    // A free-form value would be injected into CSS: only hex colors are accepted.
    expectInvalid(
      withChange(lawFirm(), ["brand"], { colors: { accent: "red; background: url(https://evil.example)" } }),
      [{ path: "brand.colors.accent", code: "invalid_format" }],
    );
    expectInvalid(withChange(lawFirm(), ["brand"], { colors: { brandPink: "#ff00aa" } }), [
      { path: "brand.colors.brandPink", code: "unknown_field" },
    ]);
    expectInvalid(withChange(lawFirm(), ["brand"], { colors: { accent: { light: "#000000" } } }), [
      { path: "brand.colors.accent.dark", code: "required" },
    ]);
    expectInvalid(withChange(lawFirm(), ["brand"], { radius: { card: "calc(1px + 1rem)" } }), [
      { path: "brand.radius.card", code: "invalid_format" },
    ]);
  });

  test("8. incomplete SiteSpec", () => {
    const result = expectInvalid(
      { version: 1, name: "Site incompleto" },
      ["id", "type", "template", "goal", "audience", "offer", "cta", "tone", "seo", "sections"].map(
        (path) => ({ path, code: "required" as const }),
      ),
    );
    assert.equal(result.errors.length, 10);
  });

  test("input that is not an object", () => {
    for (const input of [null, "um site de advocacia", [], 42]) {
      expectInvalid(input, [{ path: "", code: "invalid_type" }]);
    }
  });

  test("unsupported contract version", () => {
    expectInvalid(withChange(lawFirm(), ["version"], 2), [{ path: "version", code: "invalid_value" }]);
  });

  test("empty section list", () => {
    expectInvalid(withChange(lawFirm(), ["sections"], []), [{ path: "sections", code: "too_few" }]);
  });

  test("null in an optional field", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    expectInvalid(withChange(lawFirm(), ["sections", hero, "content", "badge"], null), [
      { path: `sections[${hero}].content.badge`, code: "invalid_type" },
    ]);
  });
});

describe("the spec cannot introduce anything outside the factory", () => {
  test("unknown fields are rejected, not ignored", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    expectInvalid(withChange(lawFirm(), ["script"], "alert(1)"), [{ path: "script", code: "unknown_field" }]);
    expectInvalid(withChange(lawFirm(), ["sections", hero, "component"], "./MyWidget.tsx"), [
      { path: `sections[${hero}].component`, code: "unknown_field" },
    ]);
    expectInvalid(withChange(lawFirm(), ["sections", hero, "content", "html"], "<b>oi</b>"), [
      { path: `sections[${hero}].content.html`, code: "unknown_field" },
    ]);
    expectInvalid(withChange(lawFirm(), ["dependencies"], { "left-pad": "1.0.0" }), [
      { path: "dependencies", code: "unknown_field" },
    ]);
  });

  test("unsafe links are rejected", () => {
    for (const href of ["javascript:alert(1)", "data:text/html,<script>", "http://example.com", "//evil.example"]) {
      expectInvalid(withChange(lawFirm(), ["sections", 0, "content", "links", 0, "href"], href), [
        { path: "sections[0].content.links[0].href", code: "invalid_format" },
      ]);
    }
  });

  test("HTML in text, insecure form actions and remote images are rejected", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    const contact = sectionIndex(lawFirm(), "contato");
    expectInvalid(
      withChange(lawFirm(), ["sections", hero, "content", "title"], 'Advocacia <script>alert("x")</script>'),
      [{ path: `sections[${hero}].content.title`, code: "invalid_format" }],
    );
    expectInvalid(
      withChange(lawFirm(), ["sections", contact, "content", "form", "action"], "http://example.com/form"),
      [{ path: `sections[${contact}].content.form.action`, code: "invalid_format" }],
    );
    expectInvalid(
      withChange(lawFirm(), ["sections", hero, "content", "media"], {
        kind: "image",
        src: "https://example.com/foto.jpg",
        alt: "Foto",
        width: 800,
        height: 600,
      }),
      [{ path: `sections[${hero}].content.media.src`, code: "invalid_format" }],
    );
  });

  test("icons must come from the icon set", () => {
    const areas = sectionIndex(lawFirm(), "areas");
    expectInvalid(withChange(lawFirm(), ["sections", areas, "content", "items", 0, "icon"], "rocket"), [
      { path: `sections[${areas}].content.items[0].icon`, code: "invalid_value" },
    ]);
  });
});

describe("factory rules on structurally valid specs", () => {
  test("section ids must be unique", () => {
    const areas = sectionIndex(lawFirm(), "areas");
    expectInvalid(withChange(lawFirm(), ["sections", areas, "id"], "escritorio"), [
      { path: `sections[${areas}].id`, code: "duplicate_id" },
    ]);
  });

  test("exactly one hero", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    const sections = lawFirm().sections as JsonObject[];
    expectInvalid(withChange(lawFirm(), ["sections"], sections.filter((_, index) => index !== hero)), [
      { path: "sections", code: "invalid_structure" },
    ]);
    const secondHero = { ...sections[hero], id: "outro-hero" };
    expectInvalid(withChange(lawFirm(), ["sections"], [...sections.slice(0, 2), secondHero, ...sections.slice(2)]), [
      { path: "sections[2].type", code: "invalid_structure" },
    ]);
  });

  test("navbar first and footer last", () => {
    const sections = lawFirm().sections as JsonObject[];
    const [navbar, ...rest] = sections;
    expectInvalid(withChange(lawFirm(), ["sections"], [...rest.slice(0, -1), navbar, rest[rest.length - 1]]), [
      { path: `sections[${sections.length - 2}].type`, code: "invalid_structure" },
    ]);
    const footer = sections[sections.length - 1];
    expectInvalid(withChange(lawFirm(), ["sections"], [navbar, footer, ...rest.slice(0, -1)]), [
      { path: "sections[1].type", code: "invalid_structure" },
    ]);
  });

  test("internal links must point to an existing section", () => {
    expectInvalid(withChange(lawFirm(), ["sections", 0, "content", "links", 0, "href"], "#nao-existe"), [
      { path: "sections[0].content.links[0].href", code: "broken_link" },
    ]);
    expectInvalid(withChange(lawFirm(), ["cta", "href"], "#agendar"), [{ path: "cta.href", code: "broken_link" }]);
  });

  test("the form variant of a CTA requires a form (variant chosen by the template)", () => {
    const cta = sectionIndex(landingPage(), "demonstracao");
    expectInvalid(withChange(landingPage(), ["sections", cta, "content", "form"], undefined), [
      { path: `sections[${cta}].content.form`, code: "required" },
    ]);
  });
});

describe("errors are complete and readable", () => {
  test("every problem is reported in one pass", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    let spec = withChange(lawFirm(), ["template"], "restaurant");
    spec = withChange(spec, ["seo", "title"], undefined);
    spec = withChange(spec, ["sections", hero, "variant"], "dark");
    spec = withChange(spec, ["sections", 2, "type"], "gallery");
    const result = expectInvalid(spec, [
      { path: "template", code: "unknown_template" },
      { path: "seo.title", code: "required" },
      { path: `sections[${hero}].variant`, code: "unknown_variant" },
      { path: "sections[2].type", code: "unknown_section" },
    ]);
    assert.equal(result.errors.length, 4);
  });

  test("the report lists each error with its path and what is expected", () => {
    const hero = sectionIndex(lawFirm(), "inicio");
    const spec = withChange(withChange(lawFirm(), ["template"], "restaurant"), ["sections", hero, "variant"], "dark");
    const result = validateSiteSpec(spec);
    assert.equal(result.valid, false);
    if (result.valid) return;

    const report = formatValidationErrors(result);
    const lines = report.split("\n");
    assert.equal(lines[0], "INVALID_SITE_SPEC: 2 errors");
    assert.match(report, /^- template: "restaurant" is not a valid template\. Expected one of: landing-page, law-firm/m);
    assert.match(report, /^- sections\[1\]\.variant: "dark" is not a valid variant for section "hero"\. Expected one of: centered, split$/m);
  });
});

describe("validateBlueprint (a plan without content)", () => {
  const blueprint = () => blueprintFromSiteSpec(expectValid(lawFirm())).blueprint;

  test("a blueprint derived from a valid SiteSpec is valid", () => {
    assert.ok(validateBlueprint(structuredClone(blueprint())).valid);
  });

  test("invalid blueprints are rejected with INVALID_BLUEPRINT", () => {
    const invalid = { ...blueprint(), sections: [...blueprint().sections, { id: "inicio", type: "hero" }] };
    const result = validateBlueprint(invalid);
    assert.equal(result.valid, false);
    if (result.valid) return;
    assert.equal(result.code, "INVALID_BLUEPRINT");
    assert.ok(result.errors.some((error) => error.code === "duplicate_id"));
  });

  test("a blueprint section cannot carry content", () => {
    const withContent = { ...blueprint(), sections: [{ id: "inicio", type: "hero", content: {} }] };
    const result = validateBlueprint(withContent);
    assert.equal(result.valid, false);
    if (result.valid) return;
    assert.ok(result.errors.some((error) => error.path === "sections[0].content" && error.code === "unknown_field"));
  });
});
