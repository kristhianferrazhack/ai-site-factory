import { defineTemplate } from "../types";

export const saasTemplate = defineTemplate({
  id: "saas",
  name: "SaaS",
  description: "Produto digital: proposta de valor, como funciona, recursos, planos e teste gratuito.",
  status: "draft",
  icon: "layers",
  theme: {
    colors: {
      accent: { light: "#7c3aed", dark: "#a78bfa" },
      ring: { light: "#7c3aed", dark: "#a78bfa" },
    },
  },
  variants: { hero: "centered", timeline: "flow", cta: "form" },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Proposta de valor e CTA de teste ou demonstração." },
    { id: "logos", type: "logos", purpose: "Empresas que usam o produto." },
    { id: "recursos", type: "features", purpose: "Recursos principais." },
    { id: "como-funciona", type: "timeline", purpose: "Do cadastro ao primeiro resultado." },
    { id: "depoimentos", type: "testimonials", purpose: "Resultados de clientes." },
    { id: "planos", type: "pricing", surface: "muted", purpose: "Planos e preços." },
    { id: "perguntas", type: "faq", purpose: "Objeções sobre preço, segurança e migração." },
    { id: "cta", type: "cta", purpose: "Captar o lead." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Mostrar o produto funcionando sempre que possível.",
    "Um CTA principal: teste gratuito ou demonstração.",
  ],
});
