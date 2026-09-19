import { defineBlueprint } from "./types";

/** Landing page of a (fictional) legal-tech product, aimed at lawyers. */
export const landingPageBlueprint = defineBlueprint({
  id: "landing-page",
  name: "Rito",
  type: "landing-page",
  template: "landing-page",
  goal: "lead-generation",
  audience: "Advogados e escritórios de pequeno e médio porte",
  offer: "Software de gestão de prazos e tarefas jurídicas com alertas automáticos",
  cta: { label: "Solicitar demonstração", href: "#demonstracao" },
  tone: ["direto", "confiável", "moderno"],
  brand: {
    colors: {
      accent: { light: "#0f766e", dark: "#2dd4bf" },
      ring: { light: "#0f766e", dark: "#2dd4bf" },
    },
  },
  seo: {
    title: "Rito | Gestão de prazos para escritórios de advocacia",
    description:
      "Centralize prazos, audiências e tarefas do escritório e receba alertas antes de cada vencimento.",
  },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Mostrar a dor (prazos perdidos) e a solução em uma frase." },
    { id: "logos", type: "logos", purpose: "Prova social com escritórios que usam o produto." },
    { id: "beneficios", type: "benefits", purpose: "Traduzir os recursos em ganho de tempo e segurança." },
    { id: "recursos", type: "features", surface: "muted", purpose: "Detalhar os principais recursos." },
    { id: "depoimentos", type: "testimonials", purpose: "Experiência de advogados que usam o Rito." },
    { id: "planos", type: "pricing", surface: "muted", purpose: "Planos por tamanho de equipe." },
    { id: "perguntas", type: "faq", purpose: "Objeções sobre segurança, migração e contrato." },
    { id: "demonstracao", type: "cta", purpose: "Captar o e-mail para agendar a demonstração." },
    { id: "rodape", type: "footer" },
  ],
});
