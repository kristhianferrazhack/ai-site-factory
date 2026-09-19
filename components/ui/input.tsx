import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { FieldShell, fieldControlStyles, hintId, type FieldProps } from "@/components/ui/field";

type InputProps = Omit<ComponentProps<"input">, "id"> & FieldProps;

export function Input({ id, label, hideLabel, hint, className, ...props }: InputProps) {
  return (
    <FieldShell id={id} label={label} hideLabel={hideLabel} hint={hint} className={className}>
      <input
        id={id}
        aria-describedby={hintId({ id, hint })}
        className={cn(fieldControlStyles, "h-11")}
        {...props}
      />
    </FieldShell>
  );
}
