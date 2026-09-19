import type { Blueprint } from "@/blueprints/blueprint";
import { sectionCatalog } from "@/components/sections/catalog";
import type { PageDefinition } from "@/composer/types";
import type { Brand, FeatureItem } from "@/content/schemas";
import { exampleSites, getExampleSite } from "@/examples";
import { siteConfig } from "@/lib/site-config";
import { SITE_SPEC_VERSION } from "@/site-spec/schema";
import { templates } from "@/templates";

/*
 * Home page of the factory itself, composed with the same sections and
 * Page Composer used for client sites. The catalog, the template gallery and
 * the SiteSpec preview are generated from the real registries and examples.
 */

const brand: Brand = {
  name: siteConfig.name,
  logo: { src: "/brand/logo.svg", alt: "", width: 28, height: 28 },
};

const sectionDefinitions = Object.values(sectionCatalog);
const variantCount = sectionDefinitions.reduce((total, section) => total + section.variants.length, 0);

const sectionCatalogItems: FeatureItem[] = sectionDefinitions.map((section) => ({
  icon: section.icon,
  title: section.name,
  description: section.description,
  badge: section.variants.length > 1 ? `${section.variants.length} variantes` : undefined,
}));

const templateGallery: FeatureItem[] = templates.map((template) => {
  const example = exampleSites.find((site) => site.blueprint.template === template.id);
  return {
    icon: template.icon,
    title: template.name,
    description: template.description,
    badge: template.status === "ready" ? "Pronto" : "Em preparação",
    href: example && `/sites/${example.blueprint.id}`,
    linkLabel: "Ver site de exemplo",
  };
});

const lawFirmSite = getExampleSite("law-firm");
if (!lawFirmSite) throw new Error('The home page needs the "law-firm" example SiteSpec.');
const lawFirm = lawFirmSite.blueprint;

/** Compact JSON view of a SiteSpec: strategy fields plus one line per section. */
function siteSpecPreview(blueprint: Blueprint) {
  const { id, name, type, template, goal, audience, offer, cta, tone, sections } = blueprint;
  const fields = { version: SITE_SPEC_VERSION, id, name, type, template, goal, audience, offer, tone };
  const inline = (object: Record<string, unknown>) =>
    Object.entries(object)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
      .join(", ");

  return [
    "{",
    ...Object.entries(fields).map(([key, value]) => `  "${key}": ${JSON.stringify(value)},`),
    `  "cta": { ${inline(cta)} },`,
    '  "sections": [',
    sections
      .map(
        ({ id, type, variant, surface }) =>
          `    { ${inline({ id, type, variant, surface })}, "content": { … } }`,
      )
      .join(",\n"),
    "  ]",
    "}",
  ].join("\n");
}

export const homePage: PageDefinition = {
  sections: [
    {
      type: "navbar",
      content: {
        brand,
        links: [
          { label: "Como funciona", href: "#como-funciona" },
          { label: "Componentes", href: "#componentes" },
          { label: "Templates", href: "#templates" },
          { label: "SiteSpec", href: "#site-spec" },
        ],
        action: { label: "GitHub", href: siteConfig.repoUrl },
      },
    },
    {
      type: "hero",
      variant: "centered",
      content: {
        badge: "Fase 2.5 · Contrato validado",
        title: siteConfig.name,
        description: siteConfig.description,
        primaryAction: { label: "Explorar templates", href: "#templates" },
        secondaryAction: { label: "Ver repositório", href: siteConfig.repoUrl },
        media: {
          kind: "terminal",
          title: "ai-site-factory",
          lines: [
            { kind: "command", text: 'claude "gere o SiteSpec do escritório de advocacia"' },
            {
              kind: "success",
              text: `SiteSpec validado: ${lawFirm.sections.length} seções, template ${lawFirm.template}`,
            },
            { kind: "command", text: "npm run check" },
            { kind: "success", text: "Lint, typecheck, testes e build aprovados" },
            { kind: "command", text: "git push origin main" },
            { kind: "info", text: "Vercel publica o site automaticamente" },
          ],
        },
      },
    },
    {
      id: "como-funciona",
      type: "timeline",
      variant: "steps",
      content: {
        eyebrow: "Como funciona",
        title: "A IA descreve, a fábrica valida e constrói",
        description:
          "A especificação diz o que o site deve ser. Como construí-lo é decisão da fábrica.",
        items: [
          {
            title: "SiteSpec",
            description:
              "Um JSON com estratégia, marca, SEO, seções e conteúdo, escrito por uma IA ou por uma pessoa.",
          },
          {
            title: "Validação",
            description:
              "Aceita ou rejeita o SiteSpec, com erros por caminho que a própria IA consegue corrigir.",
          },
          {
            title: "Blueprint e template",
            description:
              "O SiteSpec válido vira blueprint, e o template define o tema e as variantes.",
          },
          {
            title: "Page Composer",
            description:
              "Monta a página com as seções do catálogo. Nada fora do catálogo é renderizado.",
          },
        ],
      },
    },
    {
      id: "componentes",
      type: "features",
      surface: "muted",
      content: {
        eyebrow: "Componentes",
        title: "Uma biblioteca de seções prontas para combinar",
        description: `${sectionDefinitions.length} tipos de seção e ${variantCount} variantes. Cada seção recebe apenas conteúdo: layout, acessibilidade e responsividade já vêm prontos, e o Design System garante a consistência visual.`,
        items: sectionCatalogItems,
      },
    },
    {
      id: "templates",
      type: "features",
      content: {
        eyebrow: "Templates",
        title: "Pontos de partida por tipo de negócio",
        description:
          "Cada template define identidade visual, variantes preferidas, estrutura recomendada e regras de conteúdo. Os prontos têm um site de exemplo gerado a partir de um SiteSpec.",
        items: templateGallery,
      },
    },
    {
      id: "site-spec",
      type: "code",
      surface: "dark",
      content: {
        eyebrow: "SiteSpec",
        title: "O contrato entre a IA e a fábrica",
        description:
          "A IA não escreve código: ela entrega um SiteSpec, uma especificação estruturada do site. A fábrica valida cada campo antes de construir qualquer página.",
        points: [
          "Template, seção ou variante inexistente é rejeitado.",
          "Campos, tamanhos, links, cores e SEO são validados, com erros por caminho.",
          "Só um SiteSpec válido vira blueprint e página.",
        ],
        action: { label: "Ver o site gerado", href: `/sites/${lawFirm.id}` },
        code: {
          filename: `examples/site-specs/${lawFirm.id}.json (resumo)`,
          content: siteSpecPreview(lawFirm),
        },
      },
    },
    {
      id: "fluxo",
      type: "timeline",
      variant: "flow",
      content: {
        eyebrow: "Fluxo de produção",
        title: "Da IA ao site no ar, sempre pelo mesmo caminho",
        description: "Cada etapa tem um lugar definido no código e uma verificação automática.",
        items: [
          { title: "IA", description: "Pensa o site" },
          { title: "SiteSpec", description: "Especificação estruturada" },
          { title: "Validação", description: "Aceita ou rejeita" },
          { title: "Blueprint", description: "Estrutura executável" },
          { title: "Template", description: "Tema e variantes" },
          { title: "Page Composer", description: "Monta a página" },
          { title: "Site", description: "Páginas estáticas" },
          { title: "QA", description: "Lint, tipos, testes e build" },
          { title: "GitHub", description: "Fonte da verdade" },
          { title: "Vercel", description: "Deploy e previews" },
        ],
      },
    },
    {
      type: "cta",
      variant: "simple",
      content: {
        title: "Pronta para receber especificações geradas por IA",
        description:
          "Design System, seções, templates, SiteSpec validado e Page Composer estão prontos. A próxima fase conecta agentes a esse contrato.",
        primaryAction: { label: "Ver código no GitHub", href: siteConfig.repoUrl },
        secondaryAction: { label: "Ver um site de exemplo", href: "/sites/landing-page" },
      },
    },
    {
      type: "footer",
      content: {
        brand,
        description: siteConfig.description,
        columns: [
          {
            title: "Fábrica",
            links: [
              { label: "Como funciona", href: "#como-funciona" },
              { label: "Componentes", href: "#componentes" },
              { label: "Templates", href: "#templates" },
              { label: "SiteSpec", href: "#site-spec" },
            ],
          },
          {
            title: "Exemplos",
            links: exampleSites.map((site) => ({
              label: site.blueprint.name,
              href: `/sites/${site.blueprint.id}`,
            })),
          },
          {
            title: "Projeto",
            links: [{ label: "Código no GitHub", href: siteConfig.repoUrl }],
          },
        ],
        legal: "AI Site Factory · Fase 2.5: contrato de SiteSpec validado.",
      },
    },
  ],
};
