import type { ValidationIssue } from "@/lib/schema";

export type FactoryErrorCode =
  | "INVALID_SITE_SPEC"
  | "INVALID_BLUEPRINT"
  | "UNKNOWN_TEMPLATE"
  | "UNKNOWN_SECTION"
  | "UNKNOWN_VARIANT"
  | "MISSING_CONTENT";

/**
 * Explicit failure of a factory stage. The factory throws instead of falling
 * back silently: rendering nothing is better than rendering a wrong site.
 */
export class FactoryError extends Error {
  readonly code: FactoryErrorCode;
  readonly issues: readonly ValidationIssue[];

  constructor(code: FactoryErrorCode, message: string, issues: readonly ValidationIssue[] = []) {
    super(`${code}: ${message}`);
    this.name = "FactoryError";
    this.code = code;
    this.issues = issues;
  }
}
