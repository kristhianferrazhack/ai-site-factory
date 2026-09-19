import type { ComponentType } from "react";
import type { SectionContentMap, SectionType } from "@/content/schemas";
import { BenefitsSplit } from "./benefits/benefits-split";
import type { SectionVariant } from "./catalog";
import { CodeSplit } from "./code/code-split";
import { ContactSplit } from "./contact/contact-split";
import { CtaForm } from "./cta/cta-form";
import { CtaHighlight } from "./cta/cta-highlight";
import { CtaSimple } from "./cta/cta-simple";
import { FaqAccordion } from "./faq/faq-accordion";
import { FeaturesGrid } from "./features/features-grid";
import { FooterColumns } from "./footer/footer-columns";
import { HeroCentered } from "./hero/hero-centered";
import { HeroSplit } from "./hero/hero-split";
import { LogoCloud } from "./logos/logo-cloud";
import { NavbarMinimal, NavbarTransparent } from "./navbar/navbar";
import { PricingTiers } from "./pricing/pricing-tiers";
import { StatsBand } from "./stats/stats-band";
import { TestimonialsGrid } from "./testimonials/testimonials-grid";
import { TimelineFlow } from "./timeline/timeline-flow";
import { TimelineSteps } from "./timeline/timeline-steps";
import type { SectionProps } from "./types";

type SectionComponents = {
  [T in SectionType]: Record<SectionVariant<T>, ComponentType<SectionProps<SectionContentMap[T]>>>;
};

/**
 * Section registry: the React component of every variant in the catalog
 * (catalog.ts). The type requires exactly one component per catalog variant,
 * so the catalog and the components can never drift apart.
 */
export const sectionComponents: SectionComponents = {
  navbar: { minimal: NavbarMinimal, transparent: NavbarTransparent },
  hero: { centered: HeroCentered, split: HeroSplit },
  features: { grid: FeaturesGrid },
  benefits: { split: BenefitsSplit },
  stats: { band: StatsBand },
  logos: { cloud: LogoCloud },
  testimonials: { grid: TestimonialsGrid },
  pricing: { tiers: PricingTiers },
  faq: { accordion: FaqAccordion },
  timeline: { steps: TimelineSteps, flow: TimelineFlow },
  contact: { split: ContactSplit },
  cta: { simple: CtaSimple, highlight: CtaHighlight, form: CtaForm },
  footer: { columns: FooterColumns },
  code: { split: CodeSplit },
};
