import { defineTemplate } from "../types";

export const servicesTemplate = defineTemplate({
  id: "services",
  name: "Prestador de serviços",
  description:
    "Negócios locais e prestadores de serviço: serviços, diferenciais, prova social e pedido de orçamento.",
  status: "ready",
  icon: "shield",
  theme: {
    scheme: "light",
    colors: {
      primary: { light: "#0c4a6e", dark: "#7dd3fc" },
      "primary-foreground": { light: "#ffffff", dark: "#082f49" },
      accent: { light: "#0369a1", dark: "#38bdf8" },
      ring: { light: "#0369a1", dark: "#38bdf8" },
    },
    radius: { control: "0.625rem", field: "0.5rem", card: "0.875rem", panel: "1.25rem" },
  },
  variants: { navbar: "minimal", hero: "split", cta: "highlight" },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Dizer o que é feito, para quem e onde, com o CTA de orçamento." },
    { id: "numeros", type: "stats", purpose: "Gerar confiança com experiência e volume de atendimentos." },
    { id: "servicos", type: "features", purpose: "Listar os serviços oferecidos." },
    { id: "vantagens", type: "benefits", surface: "muted", purpose: "Mostrar por que escolher este prestador." },
    { id: "depoimentos", type: "testimonials", purpose: "Prova social de clientes da região." },
    { id: "chamada", type: "cta", purpose: "Reforçar o pedido de orçamento." },
    { id: "duvidas", type: "faq", surface: "muted", purpose: "Responder dúvidas sobre prazos, garantia e atendimento." },
    { id: "orcamento", type: "contact", purpose: "Receber o pedido de orçamento." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Deixar claro a área atendida e o prazo de atendimento.",
    "Preferir linguagem próxima e direta, sem jargão técnico.",
    "Todo bloco deve levar ao pedido de orçamento.",
  ],
});
