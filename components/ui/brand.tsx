import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Brand as BrandContent } from "@/content/schemas";

type BrandProps = BrandContent & {
  href?: string;
  className?: string;
};

/** Site name with an optional logo image, linking to the home page. */
export function Brand({ name, logo, href = "/", className }: BrandProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-sm font-heading text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className,
      )}
    >
      {logo && (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="size-7"
        />
      )}
      <span>{name}</span>
    </Link>
  );
}
