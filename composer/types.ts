import type { SectionVariant } from "@/components/sections/catalog";
import type { SectionContentMap, SectionType } from "@/content/schemas";
import type { SectionSurface, Theme } from "@/design-system/theme";

/** How a section appears on a page, without its content. */
export type SectionLayout<T extends SectionType> = {
  type: T;
  /** Omitted: the template's preferred variant, then the catalog default. */
  variant?: SectionVariant<T>;
  /** Anchor id used by links such as "#contato". */
  id?: string;
  surface?: SectionSurface;
};

/** One section of a page: layout plus the content its schema requires. */
export type SectionBlock = {
  [T in SectionType]: SectionLayout<T> & { content: SectionContentMap[T] };
}[SectionType];

/** Everything the Page Composer needs to render a page. */
export type PageDefinition = {
  theme?: Theme;
  sections: SectionBlock[];
};
