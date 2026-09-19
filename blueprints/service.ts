import { defineBlueprint } from "./types";

/** Site of a (fictional) local air-conditioning service company. */
export const serviceBlueprint = defineBlueprint({
  id: "service",
  name: "Clima Norte",
  type: "services",
  template: "services",
  goal: "lead-generation",
  audience: "Residências e pequenos comércios da Zona Norte de São Paulo",
  offer: "Instalação, manutenção e higienização de ar-condicionado com garantia",
  cta: { label: "Pedir orçamento", href: "#orcamento" },
  tone: ["próximo", "prático", "confiável"],
  seo: {
    title: "Clima Norte | Instalação e manutenção de ar-condicionado na Zona Norte de SP",
    description:
      "Instalação, manutenção e higienização de ar-condicionado para casas e comércios, com técnicos certificados e garantia.",
  },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Dizer o que é feito, para quem e onde." },
    { id: "numeros", type: "stats", purpose: "Experiência e volume de atendimentos." },
    { id: "servicos", type: "features", purpose: "Serviços oferecidos." },
    { id: "vantagens", type: "benefits", surface: "muted", purpose: "Por que escolher a Clima Norte." },
    { id: "depoimentos", type: "testimonials", purpose: "Clientes da região." },
    { id: "chamada", type: "cta", purpose: "Reforçar o pedido de orçamento." },
    { id: "duvidas", type: "faq", surface: "muted", purpose: "Prazos, garantia e atendimento." },
    { id: "orcamento", type: "contact", purpose: "Receber o pedido de orçamento." },
    { id: "rodape", type: "footer" },
  ],
});
