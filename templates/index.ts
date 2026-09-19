import { agencyTemplate } from "./agency";
import { consultingTemplate } from "./consulting";
import { corporateTemplate } from "./corporate";
import { landingPageTemplate } from "./landing-page";
import { lawFirmTemplate } from "./law-firm";
import { saasTemplate } from "./saas";
import { servicesTemplate } from "./services";
import type { Template, TemplateId } from "./types";

/** Template registry. Typed as a full record, so every TemplateId must have a template. */
const templateRegistry: Record<TemplateId, Template> = {
  "landing-page": landingPageTemplate,
  "law-firm": lawFirmTemplate,
  services: servicesTemplate,
  corporate: corporateTemplate,
  saas: saasTemplate,
  agency: agencyTemplate,
  consulting: consultingTemplate,
};

export const templates = Object.values(templateRegistry);

export function getTemplate(id: TemplateId): Template {
  return templateRegistry[id];
}
