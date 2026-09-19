import type { TerminalLine } from "@/components/ui/terminal";
import { siteConfig } from "@/lib/site-config";

/**
 * Landing page copy. Sections receive this content as props, so the same
 * components can be reused across sites by swapping only this file.
 */
export const homeContent = {
  hero: {
    badge: "Fase 1 · Infraestrutura base",
    title: "AI Site Factory",
    description: siteConfig.description,
    primaryAction: { label: "Como funciona", href: "#como-funciona" },
    secondaryAction: { label: "Ver repositório", href: siteConfig.repoUrl },
  },

  terminal: [
    { kind: "command", text: 'claude "crie a landing page da AI Site Factory"' },
    { kind: "success", text: "Componentes e seções gerados" },
    { kind: "command", text: "npm run build" },
    { kind: "success", text: "Build de produção concluído" },
    { kind: "command", text: "git push origin main" },
    { kind: "success", text: "Código versionado no GitHub" },
    { kind: "info", text: "Vercel publica o deploy automaticamente" },
  ] satisfies TerminalLine[],

  howItWorks: {
    id: "como-funciona",
    eyebrow: "Como funciona",
    title: "Do briefing ao site publicado",
    description:
      "Um processo simples e repetível, pensado para entregar sites de qualidade em escala.",
    steps: [
      {
        title: "Descreva",
        description:
          "Defina objetivo, público e conteúdo do site. A IA transforma o briefing em estrutura e seções.",
      },
      {
        title: "Gere",
        description:
          "O site é montado com componentes e templates reutilizáveis, em código limpo e tipado.",
      },
      {
        title: "Publique",
        description:
          "Cada alteração vira um commit no GitHub e um deploy na Vercel, com preview antes da produção.",
      },
    ],
  },

  techStack: {
    id: "tecnologia",
    eyebrow: "Tecnologia",
    title: "Uma stack moderna e sem dependências desnecessárias",
    description:
      "Ferramentas consolidadas, escolhidas para velocidade, qualidade e facilidade de evolução.",
    items: [
      {
        name: "Next.js",
        monogram: "N",
        description: "Framework React com App Router, renderização no servidor e build otimizado.",
      },
      {
        name: "TypeScript",
        monogram: "TS",
        description: "Tipagem estática para um código previsível e seguro de evoluir.",
      },
      {
        name: "Tailwind CSS",
        monogram: "TW",
        description: "Estilização utilitária com design tokens consistentes em todos os sites.",
      },
      {
        name: "Claude Code",
        monogram: "AI",
        description: "Agente de IA que escreve, revisa e mantém o código dos projetos.",
      },
      {
        name: "GitHub",
        monogram: "GH",
        description: "Fonte de verdade do código, com histórico completo de cada alteração.",
      },
      {
        name: "Vercel",
        monogram: "V",
        description: "Deploy contínuo, previews por branch e entrega global via CDN.",
      },
    ],
  },

  productionFlow: {
    id: "fluxo",
    eyebrow: "Fluxo de produção",
    title: "Do código ao site no ar, sem etapas manuais",
    description:
      "Cada site segue o mesmo caminho: versionado, validado e publicado automaticamente.",
    stages: [
      { name: "Claude Code", description: "Gera e altera o código a partir de instruções." },
      { name: "Next.js", description: "Organiza o site em componentes e gera o build." },
      { name: "Git", description: "Registra cada alteração em commits rastreáveis." },
      { name: "GitHub", description: "Centraliza o código e as revisões." },
      { name: "Vercel", description: "Cria previews e publica em produção." },
      { name: "Site no ar", description: "Rápido, responsivo e pronto para o cliente." },
    ],
  },

  cta: {
    title: "A base da fábrica está pronta",
    description:
      "A Fase 1 cobre o fluxo completo do código ao site publicado. As próximas fases trazem templates, agentes especializados e um painel de controle.",
    primaryAction: { label: "Ver código no GitHub", href: siteConfig.repoUrl },
    secondaryAction: { label: "Rever o fluxo", href: "#fluxo" },
  },
};
