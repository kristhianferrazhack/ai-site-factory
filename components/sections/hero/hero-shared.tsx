import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Terminal } from "@/components/ui/terminal";
import type { HeroMedia as HeroMediaContent } from "@/content/schemas";

/** Grid pattern and accent glow shared by the hero variants. */
export function HeroBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-[48rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />
    </>
  );
}

export function HeroMedia({ media }: { media: HeroMediaContent }) {
  switch (media.kind) {
    case "terminal":
      return <Terminal title={media.title} lines={media.lines} />;
    case "image":
      return (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          preload
          className="h-auto w-full rounded-panel border border-border shadow-elevated"
        />
      );
    case "card":
      return (
        <Card variant="elevated">
          <p className="font-heading text-lg font-semibold">{media.title}</p>
          <ul className="mt-5 grid gap-3">
            {media.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 sm:text-base">
                <Icon name="check" className="mt-0.5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          {media.footnote && (
            <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              {media.footnote}
            </p>
          )}
        </Card>
      );
  }
}
