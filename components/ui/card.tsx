import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("h-full rounded-2xl border border-border bg-card p-6 sm:p-8", className)}
      {...props}
    />
  );
}
