import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { FieldShell, fieldControlStyles, hintId, type FieldProps } from "@/components/ui/field";

type TextareaProps = Omit<ComponentProps<"textarea">, "id"> & FieldProps;

export function Textarea({ id, label, hideLabel, hint, className, rows = 5, ...props }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} hideLabel={hideLabel} hint={hint} className={className}>
      <textarea
        id={id}
        rows={rows}
        aria-describedby={hintId({ id, hint })}
        className={cn(fieldControlStyles, "resize-y py-3")}
        {...props}
      />
    </FieldShell>
  );
}
