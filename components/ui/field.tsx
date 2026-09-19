import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared look of text controls (Input, Textarea). */
export const fieldControlStyles =
  "block w-full rounded-field border border-input bg-surface px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50";

export type FieldProps = {
  /** Required: connects the label to the control. */
  id: string;
  label: string;
  /** Keeps the label for screen readers only (for inline forms). */
  hideLabel?: boolean;
  hint?: string;
};

type FieldShellProps = FieldProps & {
  className?: string;
  children: ReactNode;
};

/** Label, control and optional hint, correctly linked for assistive technologies. */
export function FieldShell({ id, label, hideLabel, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className={cn("text-sm font-medium", hideLabel && "sr-only")}>
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function hintId({ id, hint }: Pick<FieldProps, "id" | "hint">) {
  return hint ? `${id}-hint` : undefined;
}
