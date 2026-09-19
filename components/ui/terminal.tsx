import { cn } from "@/lib/cn";

export type TerminalLine = {
  kind: "command" | "success" | "info";
  text: string;
};

const lineStyles: Record<TerminalLine["kind"], { prefix: string; className: string }> = {
  command: { prefix: "$", className: "text-zinc-100" },
  success: { prefix: "✓", className: "text-emerald-400" },
  info: { prefix: "→", className: "text-indigo-300" },
};

type TerminalProps = {
  title?: string;
  lines: TerminalLine[];
  className?: string;
};

/** Decorative terminal window. Always dark, regardless of the page theme. */
export function Terminal({ title = "terminal", lines, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-accent/10",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="size-3 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-zinc-500">{title}</span>
      </div>
      <pre className="p-5 font-mono text-[13px] leading-7 whitespace-pre-wrap sm:p-6 sm:text-sm">
        <code>
          {lines.map((line, index) => {
            const style = lineStyles[line.kind];
            return (
              <span key={index} className={cn("flex", style.className)}>
                <span className="mr-3 shrink-0 select-none text-zinc-500">{style.prefix}</span>
                <span className="min-w-0 break-words">{line.text}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
