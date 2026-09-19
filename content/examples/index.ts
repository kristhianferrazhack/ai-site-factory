import { landingPageBlueprint } from "@/blueprints/landing-page";
import { lawFirmBlueprint } from "@/blueprints/law-firm";
import { serviceBlueprint } from "@/blueprints/service";
import { composeSite, type ComposedSite } from "@/composer/compose-site";
import { landingPageContent } from "./landing-page";
import { lawFirmContent } from "./law-firm";
import { serviceContent } from "./service";

/** Example sites: each blueprint composed with its content. Rendered at /sites/[id]. */
export const exampleSites: ComposedSite[] = [
  composeSite(landingPageBlueprint, landingPageContent),
  composeSite(lawFirmBlueprint, lawFirmContent),
  composeSite(serviceBlueprint, serviceContent),
];

export function getExampleSite(id: string) {
  return exampleSites.find((site) => site.blueprint.id === id);
}
