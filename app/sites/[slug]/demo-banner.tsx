import Link from "next/link";
import type { Blueprint } from "@/blueprints/blueprint";
import { Container } from "@/components/ui/container";

/** Tells visitors that the page is a factory demo with fictional content. */
export function DemoBanner({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="border-b border-border bg-muted text-xs sm:text-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5">
        <p className="text-muted-foreground">
          Demonstração gerada pelo SiteSpec{" "}
          <code className="font-mono text-foreground">{blueprint.id}</code> com o template{" "}
          <code className="font-mono text-foreground">{blueprint.template}</code>. Conteúdo fictício.
        </p>
        <Link
          href="/#templates"
          className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          ← Voltar para a AI Site Factory
        </Link>
      </Container>
    </div>
  );
}
