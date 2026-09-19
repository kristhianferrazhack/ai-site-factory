import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CodeWindowProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

/** Editor-like window frame for code and terminal output. Always dark. */
export function CodeWindow({ title, className, children }: CodeWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-zinc-800 bg-zinc-950 text-zinc-300 shadow-elevated",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        {title && <span className="ml-2 truncate font-mono text-xs text-zinc-400">{title}</span>}
      </div>
      {children}
    </div>
  );
}
