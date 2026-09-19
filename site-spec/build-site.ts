import type { Blueprint } from "@/blueprints/blueprint";
import { blueprintFromSiteSpec } from "@/blueprints/from-site-spec";
import { resolvePage } from "@/composer/resolve-page";
import type { PageDefinition } from "@/composer/types";
import { FactoryError } from "@/lib/factory-error";
import { formatIssues, validateSiteSpec } from "./validate";

export type ComposedSite = {
  blueprint: Blueprint;
  page: PageDefinition;
};

/**
 * Factory entry point for a SiteSpec:
 * input → validation → blueprint → template resolution → page definition.
 * Rendering is done afterwards by <PageComposer page={site.page} />.
 * Throws FactoryError("INVALID_SITE_SPEC") with every issue if the input is invalid.
 */
export function buildSite(input: unknown): ComposedSite {
  const result = validateSiteSpec(input);
  if (!result.valid) {
    throw new FactoryError(result.code, formatIssues(result.errors), result.errors);
  }

  const { blueprint, content } = blueprintFromSiteSpec(result.value);
  return { blueprint, page: resolvePage(blueprint, content) };
}
