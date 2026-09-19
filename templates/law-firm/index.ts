import { defineTemplate } from "../types";

export const lawFirmTemplate = defineTemplate({
  id: "law-firm",
  name: "Escritório de advocacia",
  description:
    "Institucional sóbrio para advogados: áreas de atuação, forma de trabalho, dúvidas e contato.",
  status: "ready",
  icon: "scale",
  theme: {
    scheme: "light",
    headingFont: "serif",
    colors: {
      background: { light: "#fbfaf7", dark: "#0e1726" },
      foreground: { light: "#1a2233", dark: "#f3efe6" },
      surface: { light: "#ffffff", dark: "#132036" },
      muted: { light: "#f3f0ea", dark: "#16243b" },
      "muted-foreground": { light: "#5b6272", dark: "#a9b1c1" },
      border: { light: "#e6e1d8", dark: "#25344d" },
      input: { light: "#8d8a84", dark: "#5f6d85" },
      primary: { light: "#14233c", dark: "#d4b483" },
      "primary-foreground": { light: "#fbfaf7", dark: "#14233c" },
      accent: { light: "#8a6630", dark: "#d4b483" },
      ring: { light: "#14233c", dark: "#d4b483" },
    },
    radius: { control: "0.25rem", field: "0.25rem", card: "0.375rem", panel: "0.5rem" },
  },
  variants: { navbar: "transparent", hero: "split", timeline: "steps", cta: "highlight" },
  sections: [
    { id: "navbar", type: "navbar", surface: "dark" },
    { id: "inicio", type: "hero", surface: "dark", purpose: "Transmitir seriedade e apresentar as áreas de atuação." },
    { id: "escritorio", type: "benefits", purpose: "Apresentar o escritório e a forma de trabalho." },
    { id: "areas", type: "features", surface: "muted", purpose: "Descrever as áreas de atuação de forma informativa." },
    { id: "atuacao", type: "timeline", purpose: "Explicar o atendimento, do primeiro contato ao acompanhamento." },
    { id: "duvidas", type: "faq", surface: "muted", purpose: "Responder dúvidas sobre atendimento e honorários." },
    { id: "contato", type: "contact", purpose: "Facilitar o agendamento do atendimento." },
    { id: "rodape", type: "footer", surface: "dark" },
  ],
  guidelines: [
    "Tom sóbrio, informativo e sem linguagem de venda.",
    "Seguir o Provimento 205/2021 da OAB: sem promessa de resultado, sem menção a preços ou gratuidade e sem divulgação de clientes.",
    "Não usar depoimentos de clientes nem números de causas ganhas.",
    "Priorizar clareza: áreas de atuação, forma de atendimento e canais de contato.",
  ],
});
