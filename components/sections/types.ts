import type { SectionSurface } from "@/design-system/theme";

/** Props every section component receives from the Page Composer. */
export type SectionProps<Content> = {
  /** Anchor id, so links like "#contato" can target the section. */
  id?: string;
  surface?: SectionSurface;
  content: Content;
};
