import { cn } from "@/lib/cn";
import { CodeWindow } from "@/components/ui/code-window";
import type { TerminalLine } from "@/content/schemas";

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

/** Decorative terminal session. */
export function Terminal({ title = "terminal", lines, className }: TerminalProps) {
  return (
    <CodeWindow title={title} className={className}>
      <pre className="p-5 font-mono text-[13px] leading-7 whitespace-pre-wrap sm:p-6 sm:text-sm">
        <code>
          {lines.map((line, index) => {
            const style = lineStyles[line.kind];
            return (
              <span key={index} className={cn("flex", style.className)}>
                <span className="mr-3 shrink-0 text-zinc-500 select-none">{style.prefix}</span>
                <span className="min-w-0 wrap-break-word">{line.text}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </CodeWindow>
  );
}
