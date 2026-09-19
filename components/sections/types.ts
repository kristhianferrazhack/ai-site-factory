import type { SectionSurface } from "@/components/ui/section";

/** Props every section component receives from the Page Composer. */
export type SectionProps<Content> = {
  /** Anchor id, so links like "#contato" can target the section. */
  id?: string;
  surface?: SectionSurface;
  content: Content;
};
