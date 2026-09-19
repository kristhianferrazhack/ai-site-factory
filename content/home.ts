import { lawFirmBlueprint } from "@/blueprints/law-firm";
import type { Blueprint } from "@/blueprints/types";
import { sectionRegistry } from "@/components/sections/registry";
import type { PageDefinition } from "@/composer/types";
import { exampleSites } from "@/content/examples";
import type { Brand, FeatureItem } from "@/content/schemas";
import { siteConfig } from "@/lib/site-config";
import { templates } from "@/templates";

/*
 * Home page of the factory itself, composed with the same sections and
 * Page Composer used for client sites. The catalog, the template gallery and
 * the blueprint preview are generated from the real registries.
 */

const brand: Brand = {
  name: siteConfig.name,
  logo: { src: "/brand/logo.svg", alt: "", width: 28, height: 28 },
};

const sectionDefinitions = Object.values(sectionRegistry);
const variantCount = sectionDefinitions.reduce(
  (total, section) => total + Object.keys(section.variants).length,
  0,
);

const sectionCatalog: FeatureItem[] = sectionDefinitions.map((section) => {
  const variants = Object.keys(section.variants).length;
  return {
    icon: section.icon,
    title: section.name,
    description: section.description,
    badge: variants > 1 ? `${variants} variantes` : undefined,
  };
});

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

/** Compact JSON view of a blueprint: strategy fields plus one line per section. */
function blueprintPreview(blueprint: Blueprint) {
  const { id, name, type, template, goal, audience, offer, cta, tone, sections } = blueprint;
  const fields = { id, name, type, template, goal, audience, offer, cta: cta.label, tone };
  const inline = (object: Record<string, unknown>) =>
    Object.entries(object)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
      .join(", ");

  return [
    "{",
    ...Object.entries(fields).map(([key, value]) => `  "${key}": ${JSON.stringify(value)},`),
    '  "sections": [',
    sections
      .map(({ id, type, variant, surface }) => `    { ${inline({ id, type, variant, surface })} }`)
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
          { label: "Blueprint", href: "#blueprint" },
        ],
        action: { label: "GitHub", href: siteConfig.repoUrl },
      },
    },
    {
      type: "hero",
      variant: "centered",
      content: {
        badge: "Fase 2 · Fábrica reutilizável",
        title: siteConfig.name,
        description: siteConfig.description,
        primaryAction: { label: "Explorar templates", href: "#templates" },
        secondaryAction: { label: "Ver repositório", href: siteConfig.repoUrl },
        media: {
          kind: "terminal",
          title: "ai-site-factory",
          lines: [
            { kind: "command", text: 'claude "crie o site do escritório a partir do blueprint law-firm"' },
            {
              kind: "success",
              text: `Blueprint validado: ${lawFirmBlueprint.sections.length} seções, template ${lawFirmBlueprint.template}`,
            },
            { kind: "command", text: "npm run check" },
            { kind: "success", text: "Lint, typecheck e build aprovados" },
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
        title: "Quatro camadas, cada uma com um papel",
        description:
          "A fábrica separa o que o site precisa comunicar de como ele é construído.",
        items: [
          {
            title: "Blueprint",
            description:
              "Registra a estratégia: tipo de site, objetivo, público, oferta, tom e plano de seções.",
          },
          {
            title: "Template",
            description:
              "Define a identidade visual e as variantes preferidas para cada tipo de negócio.",
          },
          {
            title: "Conteúdo",
            description: "Textos de cada seção, separados dos componentes e validados por schema.",
          },
          {
            title: "Page Composer",
            description: "Junta tudo e monta a página com os componentes da biblioteca.",
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
        items: sectionCatalog,
      },
    },
    {
      id: "templates",
      type: "features",
      content: {
        eyebrow: "Templates",
        title: "Pontos de partida por tipo de negócio",
        description:
          "Cada template define identidade visual, variantes preferidas, estrutura recomendada e regras de conteúdo. Os prontos têm um site de exemplo gerado a partir de um blueprint.",
        items: templateGallery,
      },
    },
    {
      id: "blueprint",
      type: "code",
      surface: "dark",
      content: {
        eyebrow: "Blueprint",
        title: "A especificação do site, antes da construção",
        description:
          "O blueprint descreve tipo, objetivo, público, oferta, tom, identidade visual e a ordem das seções. É o formato que os agentes vão gerar a partir de um briefing.",
        points: [
          "Tipado em TypeScript: um erro no blueprint aparece no typecheck.",
          "O conteúdo de cada seção é validado pelo schema do seu tipo.",
          "Trocar de variante ou de template não exige reescrever o conteúdo.",
        ],
        action: { label: "Ver o site gerado", href: `/sites/${lawFirmBlueprint.id}` },
        code: {
          filename: `blueprints/${lawFirmBlueprint.id}.ts (resumo)`,
          content: blueprintPreview(lawFirmBlueprint),
        },
      },
    },
    {
      id: "fluxo",
      type: "timeline",
      variant: "flow",
      content: {
        eyebrow: "Fluxo de produção",
        title: "Do briefing ao site no ar, sempre pelo mesmo caminho",
        description: "Cada etapa tem um lugar definido no código e uma verificação automática.",
        items: [
          { title: "Briefing", description: "Objetivo, público e oferta" },
          { title: "Blueprint", description: "Especificação tipada" },
          { title: "Template", description: "Identidade e estrutura" },
          { title: "Componentes", description: "Seções reutilizáveis" },
          { title: "Design System", description: "Tokens consistentes" },
          { title: "Conteúdo", description: "Textos por seção" },
          { title: "Página", description: "Montada pelo composer" },
          { title: "QA", description: "Lint, tipos e build" },
          { title: "GitHub", description: "Fonte da verdade" },
          { title: "Vercel", description: "Deploy e previews" },
        ],
      },
    },
    {
      type: "cta",
      variant: "simple",
      content: {
        title: "A fábrica está estruturada",
        description:
          "Design System, biblioteca de seções, templates, blueprints e Page Composer estão prontos. A próxima fase conecta agentes a essa base.",
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
              { label: "Blueprint", href: "#blueprint" },
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
        legal: "AI Site Factory · Fase 2: arquitetura reutilizável da fábrica.",
      },
    },
  ],
};
