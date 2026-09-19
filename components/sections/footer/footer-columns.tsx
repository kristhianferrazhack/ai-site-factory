import Link from "next/link";
import { cn } from "@/lib/cn";
import { Brand } from "@/components/ui/brand";
import { Container } from "@/components/ui/container";
import { surfaceStyles } from "@/components/ui/section";
import type { FooterContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Brand and description, link columns and a legal line. */
export function FooterColumns({ id, surface = "default", content }: SectionProps<FooterContent>) {
  const { brand, description, columns, legal } = content;

  return (
    <footer id={id} className={cn("border-t border-border", surfaceStyles[surface])}>
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Brand {...brand} />
            {description && (
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
            )}
          </div>
          {columns && columns.length > 0 && (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
              {columns.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <p className="text-sm font-semibold">{column.title}</p>
                  <ul className="mt-4 grid gap-3 text-sm">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          )}
        </div>
        {legal && (
          <p className="mt-12 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">
            {legal}
          </p>
        )}
      </Container>
    </footer>
  );
}
