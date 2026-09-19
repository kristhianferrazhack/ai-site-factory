import { defineTemplate } from "../types";

export const landingPageTemplate = defineTemplate({
  id: "landing-page",
  name: "Landing page",
  description:
    "Página única focada em conversão: proposta de valor, prova social, planos e captura de leads.",
  status: "ready",
  icon: "target",
  theme: {},
  variants: { navbar: "minimal", hero: "centered", cta: "form" },
  sections: [
    { id: "navbar", type: "navbar", purpose: "Navegação curta com o CTA principal sempre visível." },
    { id: "inicio", type: "hero", purpose: "Proposta de valor em uma frase e CTA principal." },
    { id: "logos", type: "logos", purpose: "Prova social rápida com marcas ou clientes." },
    { id: "beneficios", type: "benefits", purpose: "Traduzir o produto em resultados para o público." },
    { id: "recursos", type: "features", purpose: "Detalhar os principais recursos." },
    { id: "depoimentos", type: "testimonials", purpose: "Reduzir objeções com a experiência de clientes." },
    { id: "planos", type: "pricing", purpose: "Apresentar planos e preços com clareza." },
    { id: "perguntas", type: "faq", purpose: "Responder às objeções mais comuns." },
    { id: "cta", type: "cta", purpose: "Captar o lead com um formulário curto." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Um único objetivo de conversão por página.",
    "Repetir o CTA principal no topo, no meio e no fim da página.",
    "Títulos com benefício concreto para o público, não com o nome do recurso.",
  ],
});
