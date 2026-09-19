import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

/** Brand mark: four blocks, one highlighted — components assembled into a site. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <rect x="8" y="8" width="7" height="7" rx="1.5" className="fill-background" />
      <rect x="17" y="8" width="7" height="7" rx="1.5" className="fill-background" />
      <rect x="8" y="17" width="7" height="7" rx="1.5" className="fill-background" />
      <rect x="17" y="17" width="7" height="7" rx="1.5" className="fill-accent" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-semibold tracking-tight", className)}
    >
      <LogoMark className="size-7" />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
