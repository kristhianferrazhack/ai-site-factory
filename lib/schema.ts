/*
 * Minimal runtime schema library for untrusted input (e.g. SiteSpecs written
 * by an AI). No dependencies.
 *
 * - Every problem is reported with its exact path ("sections[2].content.title"),
 *   all at once, so the author can fix everything in one pass.
 * - Objects are strict: unknown fields are rejected, never silently ignored.
 * - Values are validated, never transformed: a valid input is used as is.
 * - The TypeScript type comes from the schema (Infer<typeof schema>), so the
 *   runtime rules and the static types are one single definition.
 */

export type IssueCode =
  | "required"
  | "invalid_type"
  | "invalid_value"
  | "invalid_format"
  | "unknown_field"
  | "too_short"
  | "too_long"
  | "too_few"
  | "too_many"
  | "unknown_template"
  | "unknown_section"
  | "unknown_variant"
  | "duplicate_id"
  | "invalid_structure"
  | "broken_link";

export type ValidationIssue = {
  /** Where the problem is, e.g. "sections[2].variant". Empty string for the root. */
  path: string;
  code: IssueCode;
  message: string;
};

export type PathSegment = string | number;

export function formatPath(segments: readonly PathSegment[]): string {
  return segments.reduce<string>((path, segment) => {
    if (typeof segment === "number") return `${path}[${segment}]`;
    return path ? `${path}.${segment}` : segment;
  }, "");
}

/** Collects issues while a value is checked. */
export class ValidationContext {
  readonly issues: ValidationIssue[] = [];
  private readonly path: PathSegment[] = [];

  /** Runs a check one level deeper in the path. */
  at<T>(segment: PathSegment, run: () => T): T {
    this.path.push(segment);
    try {
      return run();
    } finally {
      this.path.pop();
    }
  }

  /** Records an issue at the current path. Returns false, so checks can `return ctx.fail(...)`. */
  fail(code: IssueCode, message: string): false {
    this.issues.push({ path: formatPath(this.path), code, message });
    return false;
  }

  /** Records an issue at an absolute path (used by cross-field rules). */
  failAt(path: readonly PathSegment[], code: IssueCode, message: string): false {
    this.issues.push({ path: formatPath(path), code, message });
    return false;
  }
}

export type Schema<T> = {
  /** What a valid value looks like, used in error messages. */
  readonly expected: string;
  readonly isOptional?: boolean;
  check(value: unknown, ctx: ValidationContext): value is T;
};

export type OptionalSchema<T> = Schema<T | undefined> & { readonly isOptional: true };

export type Infer<S> = S extends Schema<infer T> ? T : never;

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Short description of a received value, for error messages. */
export function describe(value: unknown): string {
  if (value === undefined) return "nothing";
  if (value === null) return "null";
  if (Array.isArray(value)) return "a list";
  if (typeof value === "string") {
    return `text ${JSON.stringify(value.length > 40 ? `${value.slice(0, 40)}…` : value)}`;
  }
  if (typeof value === "object") return "an object";
  return `${typeof value} ${String(value)}`;
}

/* ---------------------------------- Primitives --------------------------------- */

const markupPattern = /<\/?[a-z][^>]*>/i;

type TextOptions = {
  min?: number;
  max?: number;
  /** Allow text that looks like HTML (only for code samples; it is always rendered as text). */
  allowMarkup?: boolean;
};

/** Plain text. Required text must contain at least one non-space character. */
export function text({ min = 1, max = 500, allowMarkup = false }: TextOptions = {}): Schema<string> {
  const expected = min > 0 ? `text of ${min} to ${max} characters` : `text of up to ${max} characters`;

  return {
    expected,
    check(value, ctx): value is string {
      if (typeof value !== "string") {
        return ctx.fail("invalid_type", `expected ${expected}, received ${describe(value)}`);
      }
      const length = value.trim().length;
      if (min > 0 && length === 0) return ctx.fail("required", "must not be empty");
      if (length < min) {
        return ctx.fail("too_short", `must have at least ${min} characters (received ${length})`);
      }
      if (value.length > max) {
        return ctx.fail("too_long", `must have at most ${max} characters (received ${value.length})`);
      }
      if (!allowMarkup && markupPattern.test(value)) {
        return ctx.fail("invalid_format", "must be plain text: HTML tags are not allowed");
      }
      return true;
    },
  };
}

type NumberOptions = { min?: number; max?: number; integer?: boolean };

export function number({
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  integer = false,
}: NumberOptions = {}): Schema<number> {
  const expected = `${integer ? "an integer" : "a number"} from ${min} to ${max}`;

  return {
    expected,
    check(value, ctx): value is number {
      const isNumber = typeof value === "number" && Number.isFinite(value);
      if (!isNumber || (integer && !Number.isInteger(value))) {
        return ctx.fail("invalid_type", `expected ${expected}, received ${describe(value)}`);
      }
      if (value < min || value > max) {
        return ctx.fail("invalid_value", `must be from ${min} to ${max} (received ${value})`);
      }
      return true;
    },
  };
}

export function boolean(): Schema<boolean> {
  return {
    expected: "true or false",
    check(value, ctx): value is boolean {
      return (
        typeof value === "boolean" ||
        ctx.fail("invalid_type", `expected true or false, received ${describe(value)}`)
      );
    },
  };
}

export type LiteralSchema<V> = Schema<V> & { readonly value: V };

export function literal<const V extends string | number | boolean>(expectedValue: V): LiteralSchema<V> {
  const expected = JSON.stringify(expectedValue);

  return {
    value: expectedValue,
    expected,
    check(value, ctx): value is V {
      return (
        value === expectedValue ||
        ctx.fail("invalid_value", `expected ${expected}, received ${describe(value)}`)
      );
    },
  };
}

type OneOfOptions = {
  /** Issue code for unknown values, e.g. "unknown_template". */
  code?: IssueCode;
  /** What the value is, used in messages: 'variant for section "hero"'. */
  subject?: string;
};

/** One of a fixed list of strings. */
export function oneOf<const V extends readonly string[]>(
  values: V,
  { code = "invalid_value", subject = "value" }: OneOfOptions = {},
): Schema<V[number]> {
  const list = values.join(", ");

  return {
    expected: `one of: ${list}`,
    check(value, ctx): value is V[number] {
      if (typeof value !== "string") {
        return ctx.fail("invalid_type", `expected a ${subject} (one of: ${list}), received ${describe(value)}`);
      }
      if ((values as readonly string[]).includes(value)) return true;
      return ctx.fail(code, `"${value}" is not a valid ${subject}. Expected one of: ${list}`);
    },
  };
}

/* --------------------------------- Composites ---------------------------------- */

export function optional<T>(schema: Schema<T>): OptionalSchema<T> {
  return {
    expected: schema.expected,
    isOptional: true,
    check(value, ctx): value is T | undefined {
      return value === undefined || schema.check(value, ctx);
    },
  };
}

type ArrayOptions = { min?: number; max?: number };

export function array<T>(item: Schema<T>, { min = 0, max = 100 }: ArrayOptions = {}): Schema<T[]> {
  const expected = `a list of ${min} to ${max} items`;

  return {
    expected,
    check(value, ctx): value is T[] {
      if (!Array.isArray(value)) {
        return ctx.fail("invalid_type", `expected ${expected}, received ${describe(value)}`);
      }
      if (value.length < min) {
        return ctx.fail("too_few", `must have at least ${min} item${min === 1 ? "" : "s"} (received ${value.length})`);
      }
      if (value.length > max) {
        return ctx.fail("too_many", `must have at most ${max} items (received ${value.length})`);
      }
      let valid = true;
      value.forEach((entry, index) => {
        if (!ctx.at(index, () => item.check(entry, ctx))) valid = false;
      });
      return valid;
    },
  };
}

export type Shape = Record<string, Schema<unknown>>;

type OptionalKeys<S extends Shape> = {
  [K in keyof S]: S[K] extends { readonly isOptional: true } ? K : never;
}[keyof S];

type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type InferShape<S extends Shape> = Simplify<
  { [K in Exclude<keyof S, OptionalKeys<S>>]: Infer<S[K]> } & {
    [K in OptionalKeys<S>]?: Exclude<Infer<S[K]>, undefined>;
  }
>;

export type ObjectSchema<S extends Shape> = Schema<InferShape<S>> & { readonly shape: S };

/** Strict object: every field is checked and unknown fields are errors. */
export function object<S extends Shape>(shape: S): ObjectSchema<S> {
  const fields = Object.keys(shape);
  const expected = `an object with fields: ${fields.join(", ")}`;

  return {
    shape,
    expected,
    check(value, ctx): value is InferShape<S> {
      if (!isPlainObject(value)) {
        return ctx.fail("invalid_type", `expected ${expected}, received ${describe(value)}`);
      }
      let valid = true;

      for (const key of Object.keys(value)) {
        if (Object.hasOwn(shape, key)) continue;
        ctx.at(key, () => ctx.fail("unknown_field", `unknown field. Allowed fields: ${fields.join(", ")}`));
        valid = false;
      }

      for (const key of fields) {
        const schema = shape[key];
        const fieldValue = value[key];
        if (fieldValue === undefined && schema.isOptional) continue;
        if (fieldValue === undefined) {
          ctx.at(key, () => ctx.fail("required", `required: ${schema.expected}`));
          valid = false;
          continue;
        }
        if (fieldValue === null && schema.isOptional) {
          ctx.at(key, () => ctx.fail("invalid_type", "null is not allowed: omit optional fields instead"));
          valid = false;
          continue;
        }
        if (!ctx.at(key, () => schema.check(fieldValue, ctx))) valid = false;
      }

      return valid;
    },
  };
}

/** Object whose keys all come from a fixed list and are all optional. */
export function partialRecord<const K extends readonly string[], T>(
  keys: K,
  valueSchema: Schema<T>,
): Schema<Partial<Record<K[number], T>>> {
  const shape = Object.fromEntries(keys.map((key) => [key, optional(valueSchema)]));
  return object(shape) as unknown as Schema<Partial<Record<K[number], T>>>;
}

/** Union of object schemas told apart by a literal field, e.g. { kind: "image" | "card" }. */
export function discriminatedUnion<
  const K extends string,
  O extends ObjectSchema<Shape & Record<K, LiteralSchema<string>>>,
>(key: K, options: readonly O[]): Schema<Infer<O>> {
  const byTag = new Map(options.map((option) => [option.shape[key].value, option]));
  const tags = [...byTag.keys()].join(", ");

  return {
    expected: `an object whose "${key}" is one of: ${tags}`,
    check(value, ctx): value is Infer<O> {
      if (!isPlainObject(value)) {
        return ctx.fail("invalid_type", `expected an object with "${key}", received ${describe(value)}`);
      }
      const tag = value[key];
      if (tag === undefined) return ctx.at(key, () => ctx.fail("required", `required: one of ${tags}`));
      const option = typeof tag === "string" ? byTag.get(tag) : undefined;
      if (!option) {
        return ctx.at(key, () =>
          ctx.fail("invalid_value", `${JSON.stringify(tag)} is not a valid ${key}. Expected one of: ${tags}`),
        );
      }
      return option.check(value, ctx);
    },
  };
}

/** Escape hatch for rules that depend on other values (e.g. variants of a section type). */
export function custom<T>(
  expected: string,
  check: (value: unknown, ctx: ValidationContext) => boolean,
): Schema<T> {
  return {
    expected,
    check: (value, ctx): value is T => check(value, ctx),
  };
}

/* --------------------------------- Web formats --------------------------------- */

function format(expected: string, isValid: (value: string) => boolean, hint: string): Schema<string> {
  return {
    expected,
    check(value, ctx): value is string {
      if (typeof value !== "string") {
        return ctx.fail("invalid_type", `expected ${expected}, received ${describe(value)}`);
      }
      if (isValid(value)) return true;
      return ctx.fail("invalid_format", `invalid ${expected} ${JSON.stringify(value)}. ${hint}`);
    },
  };
}

const slugPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const anchorPattern = /^#[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const pathPattern = /^\/(?!\/)[\w\-./~%?=&#]*$/;
const mailtoPattern = /^mailto:[^\s@<>"'()]+@[^\s@<>"'()]+\.[a-z]{2,}$/i;
const telPattern = /^tel:\+?\d{8,15}$/;
const imagePathPattern = /^\/(?!\/)[\w\-./]+\.(?:png|jpe?g|webp|avif|gif|svg)$/i;
const hexColorPattern = /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
const cssLengthPattern = /^(?:0|\d{1,4}(?:\.\d{1,3})?(?:px|rem|em))$/;

function isHttpsUrl(value: string) {
  if (!value.startsWith("https://")) return false;
  try {
    const url = new URL(value);
    return url.hostname.includes(".") && !url.username && !url.password;
  } catch {
    return false;
  }
}

/** Identifier safe for URLs and anchors: "contato", "areas-de-atuacao". */
export function slug(subject = "id"): Schema<string> {
  return format(
    subject,
    (value) => value.length <= 40 && slugPattern.test(value),
    'Use up to 40 lowercase letters, numbers and hyphens, starting with a letter, e.g. "areas-de-atuacao".',
  );
}

/** Link target. Anything else (javascript:, data:, http:...) is rejected. */
export function href(): Schema<string> {
  return format(
    "link",
    (value) =>
      anchorPattern.test(value) ||
      pathPattern.test(value) ||
      isHttpsUrl(value) ||
      mailtoPattern.test(value) ||
      telPattern.test(value),
    'Use "#section-id", "/path", "https://...", "mailto:name@domain.com" or "tel:+5511999999999".',
  );
}

/** Where a form is sent: an HTTPS endpoint or an e-mail address. */
export function formAction(): Schema<string> {
  return format(
    "form action",
    (value) => isHttpsUrl(value) || mailtoPattern.test(value),
    'Use an "https://..." endpoint or a "mailto:name@domain.com" address.',
  );
}

/** Image served from /public. */
export function imagePath(): Schema<string> {
  return format(
    "image path",
    (value) => imagePathPattern.test(value),
    'Use a file from /public with an image extension, e.g. "/images/hero.webp".',
  );
}

export function hexColor(): Schema<string> {
  return format("color", (value) => hexColorPattern.test(value), 'Use a hex color such as "#14233c".');
}

export function cssLength(): Schema<string> {
  return format("CSS length", (value) => cssLengthPattern.test(value), 'Use px, rem or em, e.g. "0.5rem".');
}
