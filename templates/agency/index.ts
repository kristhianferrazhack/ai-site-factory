import { defineTemplate } from "../types";

export const agencyTemplate = defineTemplate({
  id: "agency",
  name: "Agência",
  description: "Agências e estúdios criativos: serviços, processo, clientes e chamada para projeto.",
  status: "draft",
  icon: "sparkles",
  theme: {
    scheme: "dark",
    colors: {
      primary: { light: "#09090b", dark: "#fb923c" },
      "primary-foreground": { light: "#fafafa", dark: "#09090b" },
      accent: { light: "#c2410c", dark: "#fb923c" },
      ring: { light: "#c2410c", dark: "#fb923c" },
    },
    radius: { card: "1.25rem", panel: "2rem" },
  },
  variants: { navbar: "transparent", hero: "centered", timeline: "flow", cta: "highlight" },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Manifesto curto e impactante." },
    { id: "servicos", type: "features", purpose: "Serviços da agência." },
    { id: "processo", type: "timeline", purpose: "Como um projeto acontece." },
    { id: "clientes", type: "logos", purpose: "Marcas atendidas." },
    { id: "depoimentos", type: "testimonials", purpose: "Resultados de clientes." },
    { id: "cta", type: "cta", purpose: "Convite para iniciar um projeto." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Tom confiante e autoral.",
    "Priorizar cases e resultados em vez de listas de serviços.",
  ],
});
