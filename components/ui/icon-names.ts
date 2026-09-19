/**
 * Names of the icons in components/ui/icon.tsx. Kept in a plain module so
 * content validation can check icon names without importing React code.
 */
export const iconNames = [
  "arrow-right",
  "award",
  "briefcase",
  "chart",
  "check",
  "clock",
  "code",
  "file-text",
  "globe",
  "heart",
  "help",
  "home",
  "layers",
  "layout",
  "mail",
  "map-pin",
  "menu",
  "message",
  "plus",
  "scale",
  "shield",
  "smartphone",
  "sparkles",
  "tag",
  "target",
  "users",
  "wind",
  "x",
  "zap",
] as const;

export type IconName = (typeof iconNames)[number];
