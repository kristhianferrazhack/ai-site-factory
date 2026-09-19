"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { LinkItem } from "@/content/schemas";

type MobileMenuProps = {
  links: LinkItem[];
  action?: LinkItem;
};

/** Disclosure menu for small screens. Closes on link click and on Escape. */
export function MobileMenu({ links, action }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-control transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Icon name={open ? "x" : "menu"} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-border bg-background shadow-elevated"
      >
        <Container className="py-4">
          <nav aria-label="Menu">
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block rounded-field px-3 py-3 text-base transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {action && (
            <ButtonLink href={action.href} onClick={close} className="mt-4 w-full">
              {action.label}
            </ButtonLink>
          )}
        </Container>
      </div>
    </div>
  );
}
