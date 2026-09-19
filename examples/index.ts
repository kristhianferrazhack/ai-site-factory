import { buildSite, type ComposedSite } from "@/site-spec";
import landingPageSpec from "./site-specs/landing-page.json" with { type: "json" };
import lawFirmSpec from "./site-specs/law-firm.json" with { type: "json" };
import serviceSpec from "./site-specs/service.json" with { type: "json" };

/** Example SiteSpecs, as raw JSON: exactly what an AI would hand to the factory. */
export const exampleSpecs: readonly unknown[] = [landingPageSpec, lawFirmSpec, serviceSpec];

/**
 * Example sites, built through the full pipeline (validation → blueprint →
 * template resolution). An invalid spec throws and fails the build, so an
 * invalid input can never become a page. Rendered at /sites/[id].
 */
export const exampleSites: ComposedSite[] = exampleSpecs.map((spec) => buildSite(spec));

export function getExampleSite(id: string) {
  return exampleSites.find((site) => site.blueprint.id === id);
}
