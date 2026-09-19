import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { describe, test } from "node:test";
import { formatValidationErrors, validateSiteSpec } from "@/site-spec";
import { exampleIds, loadSpec } from "../support";

/*
 * End-to-end check on the production build: each example SiteSpec went through
 * validation → blueprint → template resolution → Page Composer and became a
 * static HTML page. Run after `npm run build` (npm run check does both).
 */

const appDir = new URL("../../.next/server/app/", import.meta.url);

function readPage(route: string) {
  const file = new URL(`${route}.html`, appDir);
  assert.ok(existsSync(file), `${route}.html not found: run "npm run build" first`);
  return readFileSync(file, "utf8");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
}

function count(html: string, fragment: string) {
  return html.split(fragment).length - 1;
}

describe("each SiteSpec is rendered as a static page", () => {
  for (const id of exampleIds) {
    test(`/sites/${id}`, () => {
      const result = validateSiteSpec(loadSpec(id));
      assert.ok(result.valid, result.valid ? "" : formatValidationErrors(result));
      const spec = result.value;
      const html = readPage(`sites/${id}`);

      assert.ok(html.includes(`<title>${escapeHtml(spec.seo.title)}</title>`), "SEO title");
      assert.ok(html.includes(`content="${escapeHtml(spec.seo.description)}"`), "SEO description");
      assert.ok(html.includes('<meta name="robots" content="noindex, nofollow"/>'), "demo sites are not indexed");
      assert.equal(count(html, "<h1"), 1, "exactly one h1");

      for (const section of spec.sections) {
        assert.ok(html.includes(`id="${section.id}"`), `section "${section.id}" is rendered`);
        const title = "title" in section.content ? section.content.title : undefined;
        if (typeof title === "string") {
          assert.ok(html.includes(escapeHtml(title)), `title of "${section.id}" is rendered`);
        }
      }

      const hero = spec.sections.find((section) => section.type === "hero");
      assert.ok(hero?.type === "hero");
      assert.match(html, new RegExp(`<h1[^>]*>${escapeHtml(hero.content.title)}</h1>`), "hero title is the h1");
      assert.ok(html.includes(escapeHtml(spec.cta.label)), "main CTA is rendered");
    });
  }

  test("/ (factory home page)", () => {
    const html = readPage("index");
    assert.equal(count(html, "<h1"), 1);
    assert.match(html, /<h1[^>]*>AI Site Factory<\/h1>/);
    for (const id of ["como-funciona", "componentes", "templates", "site-spec", "fluxo"]) {
      assert.ok(html.includes(`id="${id}"`), `section "${id}" is rendered`);
    }
  });
});
