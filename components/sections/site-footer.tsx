import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p className="flex items-center gap-2">
          <LogoMark className="size-5" />
          <span>{siteConfig.name} · Fase 1: infraestrutura base</span>
        </p>
        <Link
          href={siteConfig.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Código no GitHub
        </Link>
      </Container>
    </footer>
  );
}
