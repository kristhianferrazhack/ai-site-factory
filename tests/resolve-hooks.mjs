import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const extensions = ["", ".ts", "/index.ts"];

function isFile(url) {
  const path = fileURLToPath(url);
  return existsSync(path) && statSync(path).isFile();
}

/**
 * Lets Node run the project's TypeScript directly (native type stripping):
 * resolves the "@/" alias from tsconfig.json and extensionless relative
 * imports, as the Next.js bundler does. .tsx files are deliberately not
 * resolved: the code under test must not depend on React components.
 */
export async function resolve(specifier, context, nextResolve) {
  let base;
  if (specifier.startsWith("file:") && specifier.endsWith(".ts")) {
    // Entry points (test files) arrive as absolute URLs.
    return { url: specifier, format: "module-typescript", shortCircuit: true };
  } else if (specifier.startsWith("@/")) {
    base = new URL(specifier.slice(2), root).href;
  } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
    base = new URL(specifier, context.parentURL).href;
  } else {
    return nextResolve(specifier, context);
  }

  for (const extension of extensions) {
    const url = base + extension;
    if (!isFile(url)) continue;
    // Project .ts files are ES modules; saying so avoids Node's format detection.
    if (url.endsWith(".ts")) return { url, format: "module-typescript", shortCircuit: true };
    return nextResolve(url, context);
  }
  return nextResolve(specifier, context);
}
