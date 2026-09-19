import { defineBlueprint } from "./types";

/** Institutional site of a (fictional) law firm in São Paulo. */
export const lawFirmBlueprint = defineBlueprint({
  id: "law-firm",
  name: "Vieira Montenegro Advocacia",
  type: "law-firm",
  template: "law-firm",
  goal: "scheduling",
  audience: "Empresas e famílias que buscam orientação jurídica preventiva e contenciosa",
  offer: "Assessoria jurídica em direito empresarial, trabalhista, de família e imobiliário",
  cta: { label: "Agendar atendimento", href: "#contato" },
  tone: ["sóbrio", "claro", "confiável"],
  seo: {
    title: "Vieira Montenegro Advocacia | Advocacia empresarial e de família em São Paulo",
    description:
      "Orientação jurídica clara em direito empresarial, trabalhista, de família e imobiliário. Atendimento presencial em São Paulo e on-line.",
  },
  sections: [
    { id: "navbar", type: "navbar", variant: "transparent", surface: "dark" },
    { id: "inicio", type: "hero", variant: "split", surface: "dark", purpose: "Transmitir seriedade e apresentar as áreas de atuação." },
    { id: "escritorio", type: "benefits", purpose: "Apresentar o escritório e a forma de trabalho." },
    { id: "areas", type: "features", surface: "muted", purpose: "Descrever as áreas de atuação." },
    { id: "atuacao", type: "timeline", variant: "steps", purpose: "Explicar como funciona o atendimento." },
    { id: "duvidas", type: "faq", surface: "muted", purpose: "Responder dúvidas sobre atendimento e honorários." },
    { id: "contato", type: "contact", purpose: "Facilitar o agendamento do atendimento." },
    { id: "rodape", type: "footer", surface: "dark" },
  ],
});
