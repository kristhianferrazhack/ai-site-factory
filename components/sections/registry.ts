import type { ComponentType } from "react";
import type { IconName } from "@/components/ui/icon";
import type { SectionContentMap, SectionType } from "@/content/schemas";
import { BenefitsSplit } from "./benefits/benefits-split";
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

type SectionComponent<T extends SectionType> = ComponentType<SectionProps<SectionContentMap[T]>>;

type SectionDefinition<T extends SectionType, Variant extends string> = {
  type: T;
  /** Human-readable name and description, shown in the section catalog. */
  name: string;
  description: string;
  icon: IconName;
  /** Every variant renders the same content schema with a different layout. */
  variants: Record<Variant, SectionComponent<T>>;
  defaultVariant: NoInfer<Variant>;
};

function defineSection<T extends SectionType, Variant extends string>(
  definition: SectionDefinition<T, Variant>,
) {
  return definition;
}

/**
 * Section registry: the single list of section types and variants the Page
 * Composer can render. Register every new section or variant here.
 */
export const sectionRegistry = {
  navbar: defineSection({
    type: "navbar",
    name: "Navbar",
    description: "Marca, links, CTA e menu móvel acessível.",
    icon: "menu",
    variants: { minimal: NavbarMinimal, transparent: NavbarTransparent },
    defaultVariant: "minimal",
  }),
  hero: defineSection({
    type: "hero",
    name: "Hero",
    description: "Abertura com título, subtítulo, CTAs e mídia: imagem, terminal ou card.",
    icon: "sparkles",
    variants: { centered: HeroCentered, split: HeroSplit },
    defaultVariant: "centered",
  }),
  features: defineSection({
    type: "features",
    name: "Recursos",
    description: "Grade de cards com ícone, título e descrição. Os cards podem virar links.",
    icon: "layers",
    variants: { grid: FeaturesGrid },
    defaultVariant: "grid",
  }),
  benefits: defineSection({
    type: "benefits",
    name: "Benefícios",
    description: "Lista de vantagens ao lado de um título e de um CTA.",
    icon: "check",
    variants: { split: BenefitsSplit },
    defaultVariant: "split",
  }),
  stats: defineSection({
    type: "stats",
    name: "Números",
    description: "Indicadores em destaque, como anos de atuação ou clientes atendidos.",
    icon: "chart",
    variants: { band: StatsBand },
    defaultVariant: "band",
  }),
  logos: defineSection({
    type: "logos",
    name: "Logos",
    description: "Faixa de marcas e clientes como prova social.",
    icon: "award",
    variants: { cloud: LogoCloud },
    defaultVariant: "cloud",
  }),
  testimonials: defineSection({
    type: "testimonials",
    name: "Depoimentos",
    description: "Citações de clientes com autor e cargo.",
    icon: "message",
    variants: { grid: TestimonialsGrid },
    defaultVariant: "grid",
  }),
  pricing: defineSection({
    type: "pricing",
    name: "Planos",
    description: "Tabela de planos com destaque para o plano recomendado.",
    icon: "tag",
    variants: { tiers: PricingTiers },
    defaultVariant: "tiers",
  }),
  faq: defineSection({
    type: "faq",
    name: "FAQ",
    description: "Perguntas frequentes em acordeão nativo, sem JavaScript no cliente.",
    icon: "help",
    variants: { accordion: FaqAccordion },
    defaultVariant: "accordion",
  }),
  timeline: defineSection({
    type: "timeline",
    name: "Linha do tempo",
    description: "Etapas de um processo, em cards numerados ou em fluxo conectado.",
    icon: "clock",
    variants: { steps: TimelineSteps, flow: TimelineFlow },
    defaultVariant: "steps",
  }),
  contact: defineSection({
    type: "contact",
    name: "Contato",
    description: "Canais de contato e formulário acessível.",
    icon: "mail",
    variants: { split: ContactSplit },
    defaultVariant: "split",
  }),
  cta: defineSection({
    type: "cta",
    name: "CTA",
    description: "Chamada para ação simples, em destaque ou com formulário de captura.",
    icon: "target",
    variants: { simple: CtaSimple, highlight: CtaHighlight, form: CtaForm },
    defaultVariant: "simple",
  }),
  footer: defineSection({
    type: "footer",
    name: "Rodapé",
    description: "Marca, colunas de links e texto legal.",
    icon: "layout",
    variants: { columns: FooterColumns },
    defaultVariant: "columns",
  }),
  code: defineSection({
    type: "code",
    name: "Código",
    description: "Explicação ao lado de um bloco de código, para produtos técnicos.",
    icon: "code",
    variants: { split: CodeSplit },
    defaultVariant: "split",
  }),
} satisfies { [T in SectionType]: SectionDefinition<T, string> };

/** Variant names available for a section type, e.g. SectionVariant<"hero"> = "centered" | "split". */
export type SectionVariant<T extends SectionType> = keyof (typeof sectionRegistry)[T]["variants"] &
  string;
