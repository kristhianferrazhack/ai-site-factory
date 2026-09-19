import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { schemeClassNames, themeToStyle, type Theme } from "@/design-system/theme";

type ThemeScopeProps = {
  theme?: Theme;
  className?: string;
  children: ReactNode;
};

/** Applies a theme to everything inside it by overriding the token variables. */
export function ThemeScope({ theme = {}, className, children }: ThemeScopeProps) {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col bg-background text-foreground",
        schemeClassNames[theme.scheme ?? "system"],
        className,
      )}
      style={themeToStyle(theme)}
    >
      {children}
    </div>
  );
}
