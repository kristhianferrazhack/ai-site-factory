import { ButtonLink } from "@/components/ui/button";
import { CodeWindow } from "@/components/ui/code-window";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CodeContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Explanation on one side, a code sample on the other. For technical products. */
export function CodeSplit({ id, surface, content }: SectionProps<CodeContent>) {
  const { eyebrow, title, description, points, action, code } = content;

  return (
    <Section id={id} surface={surface}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
          {points && points.length > 0 && (
            <ul className="mt-8 grid gap-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 leading-7">
                  <Icon name="check" className="mt-1 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          )}
          {action && (
            <ButtonLink href={action.href} className="mt-10">
              {action.label}
            </ButtonLink>
          )}
        </div>
        <CodeWindow title={code.filename} className="min-w-0">
          <pre
            tabIndex={0}
            className="max-h-[32rem] overflow-auto p-5 font-mono text-[13px] leading-6 whitespace-pre-wrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:p-6"
          >
            <code>
              {code.content.split("\n").map((line, index) => {
                // Hanging indent: wrapped lines stay aligned under their own indentation.
                const indent = `${line.length - line.trimStart().length + 2}ch`;
                return (
                  <span
                    key={index}
                    className="block"
                    style={{ paddingLeft: indent, textIndent: `-${indent}` }}
                  >
                    {line || " "}
                  </span>
                );
              })}
            </code>
          </pre>
        </CodeWindow>
      </div>
    </Section>
  );
}
