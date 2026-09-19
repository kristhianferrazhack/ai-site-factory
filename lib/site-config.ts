import type { LinkItem } from "@/lib/types";

/** Site-wide settings: identity, SEO defaults and navigation. */
export const siteConfig = {
  name: "AI Site Factory",
  title: "AI Site Factory | Sites criados e publicados com IA",
  description:
    "Uma infraestrutura para criar, versionar e publicar sites com inteligência artificial.",
  locale: "pt_BR",
  repoUrl: "https://github.com/kristhianferrazhack/ai-site-factory",
  nav: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Tecnologia", href: "#tecnologia" },
    { label: "Fluxo", href: "#fluxo" },
  ] satisfies LinkItem[],
};
