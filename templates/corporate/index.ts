import { defineTemplate } from "../types";

export const corporateTemplate = defineTemplate({
  id: "corporate",
  name: "Corporativo",
  description: "Site institucional de empresa: quem somos, soluções, números, clientes e contato.",
  status: "draft",
  icon: "briefcase",
  theme: {
    scheme: "light",
    colors: {
      primary: { light: "#1e3a8a", dark: "#93c5fd" },
      "primary-foreground": { light: "#ffffff", dark: "#172554" },
      accent: { light: "#1d4ed8", dark: "#60a5fa" },
      ring: { light: "#1d4ed8", dark: "#60a5fa" },
    },
    radius: { control: "0.5rem", field: "0.5rem", card: "0.75rem", panel: "1rem" },
  },
  variants: { hero: "split", cta: "simple" },
  sections: [
    { id: "navbar", type: "navbar" },
    { id: "inicio", type: "hero", purpose: "Posicionamento da empresa em uma frase." },
    { id: "sobre", type: "benefits", purpose: "Quem somos e o que nos diferencia." },
    { id: "solucoes", type: "features", surface: "muted", purpose: "Soluções ou unidades de negócio." },
    { id: "numeros", type: "stats", purpose: "Escala e tempo de mercado." },
    { id: "clientes", type: "logos", purpose: "Clientes e parceiros relevantes." },
    { id: "contato", type: "contact", purpose: "Canais comerciais e institucionais." },
    { id: "rodape", type: "footer" },
  ],
  guidelines: [
    "Tom institucional e objetivo.",
    "Dados e números sempre verificáveis.",
  ],
});
