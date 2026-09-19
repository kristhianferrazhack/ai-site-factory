import Link from "next/link";
import { cn } from "@/lib/cn";
import { Brand } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { NavbarContent } from "@/content/schemas";
import type { SectionProps } from "../types";
import { MobileMenu } from "./mobile-menu";

function NavbarBar({ content }: { content: NavbarContent }) {
  const { brand, links, action } = content;

  return (
    <Container className="flex h-16 items-center justify-between gap-6">
      <Brand {...brand} />
      <nav aria-label="Principal" className="hidden items-center gap-8 text-sm md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {action && (
          // On small screens the action moves into the mobile menu.
          <div className="hidden sm:block">
            <ButtonLink href={action.href} size="sm">
              {action.label}
            </ButtonLink>
          </div>
        )}
        {links.length > 0 && <MobileMenu links={links} action={action} />}
      </div>
    </Container>
  );
}

/** Sticky bar with a translucent background. */
export function NavbarMinimal({ id, surface, content }: SectionProps<NavbarContent>) {
  return (
    <header
      id={id}
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/80 text-foreground backdrop-blur-md",
        surface === "dark" && "scheme-dark",
      )}
    >
      <NavbarBar content={content} />
    </header>
  );
}

/** Transparent bar over the first section. Give it the same surface as the hero below. */
export function NavbarTransparent({ id, surface, content }: SectionProps<NavbarContent>) {
  return (
    <header
      id={id}
      className={cn(
        "absolute inset-x-0 top-0 z-50 text-foreground",
        surface === "dark" && "scheme-dark",
      )}
    >
      <NavbarBar content={content} />
    </header>
  );
}
