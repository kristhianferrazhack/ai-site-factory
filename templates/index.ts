import { sectionCatalog, type SectionVariant } from "@/components/sections/catalog";
import type { SectionType } from "@/content/schemas";
import { FactoryError } from "@/lib/factory-error";
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

export const templateIds = Object.keys(templateRegistry) as TemplateId[];

/** Fails explicitly on a template the factory does not have. */
export function getTemplate(id: string): Template {
  if (!Object.hasOwn(templateRegistry, id)) {
    throw new FactoryError(
      "UNKNOWN_TEMPLATE",
      `template "${id}" does not exist. Available: ${templateIds.join(", ")}.`,
    );
  }
  return templateRegistry[id as TemplateId];
}

/**
 * The variant a section renders with: the one chosen in the spec, else the
 * template's preferred variant, else the catalog default.
 */
export function resolveVariant<T extends SectionType>(
  template: Template,
  type: T,
  variant: SectionVariant<T> | undefined,
): SectionVariant<T> {
  const preferred = template.variants[type] as SectionVariant<T> | undefined;
  return variant ?? preferred ?? sectionCatalog[type].defaultVariant;
}
