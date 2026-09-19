import type { CSSProperties } from "react";

/**
 * A Theme overrides Design System tokens (design-system/tokens.css) for one
 * site or template. Anything left out keeps the default token value.
 */
export type ColorScheme = "system" | "light" | "dark";

export type ColorToken =
  | "background"
  | "foreground"
  | "surface"
  | "muted"
  | "muted-foreground"
  | "border"
  | "input"
  | "primary"
  | "primary-foreground"
  | "accent"
  | "success"
  | "ring";

export type RadiusToken = "control" | "field" | "card" | "panel";

/** One color for both schemes, or a pair for light and dark. */
export type ThemeColor = string | { light: string; dark: string };

export type Theme = {
  scheme?: ColorScheme;
  colors?: Partial<Record<ColorToken, ThemeColor>>;
  radius?: Partial<Record<RadiusToken, string>>;
  headingFont?: "sans" | "serif";
};

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
