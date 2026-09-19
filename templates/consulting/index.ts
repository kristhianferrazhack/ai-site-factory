import { defineTemplate } from "../types";

export const consultingTemplate = defineTemplate({
  id: "consulting",
  name: "Consultoria",
  description: "Consultorias e mentorias: desafios do cliente, serviços, método e resultados.",
  status: "draft",
  icon: "chart",
  theme: {
    scheme: "light",
    headingFont: "serif",
    colors: {
      primary: { light: "#14532d", dark: "#86efac" },
      "primary-foreground": { light: "#f0fdf4", dark: "#052e16" },
      accent: { light: "#15803d", dark: "#4ade80" },
      ring: { light: "#15803d", dark: "#4ade80" },
    },
    radius: { control: "0.375rem", field: "0.375rem", card: "0.5rem", panel: "0.75rem" },
  },
  variants: { hero: "split", timeline: "steps", cta: "highlight" },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "O problema que a consultoria resolve." },
    { id: "desafios", type: "benefits", purpose: "Desafios do público e como são tratados." },
    { id: "servicos", type: "features", surface: "muted", purpose: "Serviços e formatos de trabalho." },
    { id: "metodo", type: "timeline", purpose: "Etapas do método." },
    { id: "numeros", type: "stats", purpose: "Resultados e experiência." },
    { id: "depoimentos", type: "testimonials", purpose: "Resultados de clientes." },
    { id: "contato", type: "contact", purpose: "Agendar uma conversa inicial." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Falar do problema do cliente antes de falar da consultoria.",
    "Resultados com contexto: prazo, ponto de partida e métrica.",
  ],
});
