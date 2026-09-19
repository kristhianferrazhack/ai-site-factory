import type { IconName } from "@/components/ui/icon-names";
import type { SectionType } from "@/content/schemas";
import { FactoryError } from "@/lib/factory-error";

type SectionDefinition<Variants extends readonly [string, ...string[]]> = {
  /** Human-readable name and description, shown in the section catalog. */
  name: string;
  description: string;
  icon: IconName;
  /** Every variant renders the same content schema with a different layout. */
  variants: Variants;
  defaultVariant: NoInfer<Variants[number]>;
};

function defineSection<const Variants extends readonly [string, ...string[]]>(
  definition: SectionDefinition<Variants>,
) {
  return definition;
}

/**
 * Section catalog: which section types and variants exist. Plain data, used by
 * validation and by the Page Composer. The React component of each variant is
 * mapped in registry.ts, whose types require one component per variant here.
 */
export const sectionCatalog = {
  navbar: defineSection({
    name: "Navbar",
    description: "Marca, links, CTA e menu móvel acessível.",
    icon: "menu",
    variants: ["minimal", "transparent"],
    defaultVariant: "minimal",
  }),
  hero: defineSection({
    name: "Hero",
    description: "Abertura com título, subtítulo, CTAs e mídia: imagem, terminal ou card.",
    icon: "sparkles",
    variants: ["centered", "split"],
    defaultVariant: "centered",
  }),
  features: defineSection({
    name: "Recursos",
    description: "Grade de cards com ícone, título e descrição. Os cards podem virar links.",
    icon: "layers",
    variants: ["grid"],
    defaultVariant: "grid",
  }),
  benefits: defineSection({
    name: "Benefícios",
    description: "Lista de vantagens ao lado de um título e de um CTA.",
    icon: "check",
    variants: ["split"],
    defaultVariant: "split",
  }),
  stats: defineSection({
    name: "Números",
    description: "Indicadores em destaque, como anos de atuação ou clientes atendidos.",
    icon: "chart",
    variants: ["band"],
    defaultVariant: "band",
  }),
  logos: defineSection({
    name: "Logos",
    description: "Faixa de marcas e clientes como prova social.",
    icon: "award",
    variants: ["cloud"],
    defaultVariant: "cloud",
  }),
  testimonials: defineSection({
    name: "Depoimentos",
    description: "Citações de clientes com autor e cargo.",
    icon: "message",
    variants: ["grid"],
    defaultVariant: "grid",
  }),
  pricing: defineSection({
    name: "Planos",
    description: "Tabela de planos com destaque para o plano recomendado.",
    icon: "tag",
    variants: ["tiers"],
    defaultVariant: "tiers",
  }),
  faq: defineSection({
    name: "FAQ",
    description: "Perguntas frequentes em acordeão nativo, sem JavaScript no cliente.",
    icon: "help",
    variants: ["accordion"],
    defaultVariant: "accordion",
  }),
  timeline: defineSection({
    name: "Linha do tempo",
    description: "Etapas de um processo, em cards numerados ou em fluxo conectado.",
    icon: "clock",
    variants: ["steps", "flow"],
    defaultVariant: "steps",
  }),
  contact: defineSection({
    name: "Contato",
    description: "Canais de contato e formulário acessível.",
    icon: "mail",
    variants: ["split"],
    defaultVariant: "split",
  }),
  cta: defineSection({
    name: "CTA",
    description: "Chamada para ação simples, em destaque ou com formulário de captura.",
    icon: "target",
    variants: ["simple", "highlight", "form"],
    defaultVariant: "simple",
  }),
  footer: defineSection({
    name: "Rodapé",
    description: "Marca, colunas de links e texto legal.",
    icon: "layout",
    variants: ["columns"],
    defaultVariant: "columns",
  }),
  code: defineSection({
    name: "Código",
    description: "Explicação ao lado de um bloco de código, para produtos técnicos.",
    icon: "code",
    variants: ["split"],
    defaultVariant: "split",
  }),
} satisfies Record<SectionType, SectionDefinition<readonly [string, ...string[]]>>;

/** Variant names of a section type, e.g. SectionVariant<"hero"> = "centered" | "split". */
export type SectionVariant<T extends SectionType> = (typeof sectionCatalog)[T]["variants"][number];

export function isSectionType(value: unknown): value is SectionType {
  return typeof value === "string" && Object.hasOwn(sectionCatalog, value);
}

/** Fails explicitly on a section type the factory does not know. */
export function assertSectionType(type: unknown): asserts type is SectionType {
  if (!isSectionType(type)) {
    throw new FactoryError(
      "UNKNOWN_SECTION",
      `section type ${JSON.stringify(type)} does not exist. Available: ${Object.keys(sectionCatalog).join(", ")}.`,
    );
  }
}

/** Fails explicitly on a variant the section type does not have. */
export function assertSectionVariant<T extends SectionType>(
  type: T,
  variant: unknown,
): asserts variant is SectionVariant<T> {
  const variants: readonly string[] = sectionCatalog[type].variants;
  if (typeof variant !== "string" || !variants.includes(variant)) {
    throw new FactoryError(
      "UNKNOWN_VARIANT",
      `section "${type}" has no variant ${JSON.stringify(variant)}. Available: ${variants.join(", ")}.`,
    );
  }
}
