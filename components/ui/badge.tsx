import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Small pill label with a status dot. */
export function Badge({ className, children, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
      {children}
    </span>
  );
}
