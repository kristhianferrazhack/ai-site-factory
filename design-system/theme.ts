import type { CSSProperties } from "react";
import {
  cssLength,
  custom,
  hexColor,
  object,
  oneOf,
  optional,
  partialRecord,
  type Infer,
} from "@/lib/schema";

/*
 * A Theme overrides Design System tokens (design-system/tokens.css) for one
 * site or template. Anything left out keeps the default token value. The
 * schema below is both the runtime validation and the source of the types.
 */

export const colorSchemes = ["system", "light", "dark"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

export const colorTokens = [
  "background",
  "foreground",
  "surface",
  "muted",
  "muted-foreground",
  "border",
  "input",
  "primary",
  "primary-foreground",
  "accent",
  "success",
  "ring",
] as const;
export type ColorToken = (typeof colorTokens)[number];

export const radiusTokens = ["control", "field", "card", "panel"] as const;
export type RadiusToken = (typeof radiusTokens)[number];

export const headingFonts = ["sans", "serif"] as const;

/** Background treatment of a section. "dark" switches the section to the dark palette. */
export const sectionSurfaces = ["default", "muted", "dark"] as const;
export type SectionSurface = (typeof sectionSurfaces)[number];

const colorPairSchema = object({ light: hexColor(), dark: hexColor() });

/** One hex color for both schemes, or a pair for light and dark. */
const themeColorSchema = custom<string | { light: string; dark: string }>(
  'a hex color, or { "light": hex color, "dark": hex color }',
  (value, ctx) =>
    typeof value === "string" ? hexColor().check(value, ctx) : colorPairSchema.check(value, ctx),
);
export type ThemeColor = Infer<typeof themeColorSchema>;

// Only hex colors and simple lengths are accepted: theme values become CSS
// variables, so free-form strings could inject arbitrary CSS.
export const themeSchema = object({
  scheme: optional(oneOf(colorSchemes, { subject: "color scheme" })),
  colors: optional(partialRecord(colorTokens, themeColorSchema)),
  radius: optional(partialRecord(radiusTokens, cssLength())),
  headingFont: optional(oneOf(headingFonts, { subject: "heading font" })),
});
export type Theme = Infer<typeof themeSchema>;

/** Classes defined in tokens.css that map the color tokens to a palette. */
export const schemeClassNames: Record<ColorScheme, string> = {
  system: "scheme-system",
  light: "scheme-light",
  dark: "scheme-dark",
};

/** Merges themes from left to right; later themes win. */
export function mergeThemes(...themes: (Theme | undefined)[]): Theme {
  return themes.reduce<Theme>(
    (merged, theme) => ({
      scheme: theme?.scheme ?? merged.scheme,
      headingFont: theme?.headingFont ?? merged.headingFont,
      colors: { ...merged.colors, ...theme?.colors },
      radius: { ...merged.radius, ...theme?.radius },
    }),
    {},
  );
}

/**
 * Converts a theme into CSS variables that override the palette. The element
 * receiving them must also carry a scheme class (see ThemeScope), which
 * re-maps the semantic --color-* tokens to the overridden palette.
 */
export function themeToStyle(theme: Theme): CSSProperties {
  const variables: Record<string, string> = {};

  for (const [token, color] of Object.entries(theme.colors ?? {})) {
    if (!color) continue;
    const { light, dark } = typeof color === "string" ? { light: color, dark: color } : color;
    variables[`--light-${token}`] = light;
    variables[`--dark-${token}`] = dark;
  }

  for (const [token, value] of Object.entries(theme.radius ?? {})) {
    if (value) variables[`--radius-${token}`] = value;
  }

  if (theme.headingFont) {
    variables["--font-heading"] = `var(--font-${theme.headingFont})`;
  }

  return variables as CSSProperties;
}
