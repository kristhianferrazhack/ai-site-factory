import { readFileSync } from "node:fs";

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

/** Example SiteSpecs rendered as sites. "minimal" is the smallest valid spec (used in the docs). */
export const exampleIds = ["landing-page", "law-firm", "service"] as const;
export type SpecName = (typeof exampleIds)[number] | "minimal";

/** Reads an example SiteSpec as untrusted JSON, like input coming from an AI. */
export function loadSpec(name: SpecName): JsonObject {
  const file = new URL(`../examples/site-specs/${name}.json`, import.meta.url);
  return JSON.parse(readFileSync(file, "utf8")) as JsonObject;
}

/** Copy of `value` with the field at `path` replaced, or removed when `newValue` is undefined. */
export function withChange(value: JsonObject, path: (string | number)[], newValue: Json | undefined): JsonObject {
  const copy = structuredClone(value);
  let parent: Json = copy;
  for (const segment of path.slice(0, -1)) {
    parent = (parent as Record<string | number, Json>)[segment];
  }
  const container = parent as Record<string | number, Json>;
  const last = path[path.length - 1];
  if (newValue === undefined) delete container[last];
  else container[last] = newValue;
  return copy;
}

/** Index of the section with the given id in a SiteSpec. */
export function sectionIndex(spec: JsonObject, id: string): number {
  const sections = spec.sections as JsonObject[];
  const index = sections.findIndex((section) => section.id === id);
  if (index === -1) throw new Error(`No section "${id}" in the spec.`);
  return index;
}
