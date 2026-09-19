import { cn } from "@/lib/cn";
import { Actions } from "@/components/ui/actions";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { surfaceStyles } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import type { HeroContent } from "@/content/schemas";
import type { SectionProps } from "../types";
import { HeroBackdrop, HeroMedia } from "./hero-shared";

/** Copy on the left, media on the right (stacked on mobile). Good for services and firms. */
export function HeroSplit({ id, surface = "default", content }: SectionProps<HeroContent>) {
  const { badge, title, description, primaryAction, secondaryAction, media } = content;

  return (
    <section id={id} className={cn("relative isolate overflow-hidden", surfaceStyles[surface])}>
      <HeroBackdrop />
      <Container className="grid items-center gap-12 pt-24 pb-20 sm:pt-32 sm:pb-28 lg:grid-cols-2 lg:gap-16">
        <div>
          {badge && <Badge>{badge}</Badge>}
          <Heading as="h1" size="xl" className={cn("lg:text-6xl", badge && "mt-6")}>
            {title}
          </Heading>
          <Text size="lg" className="mt-6 max-w-xl">
            {description}
          </Text>
          <Actions primary={primaryAction} secondary={secondaryAction} className="mt-10" />
        </div>
        {/* Wrapper keeps the media at its natural height instead of the row height. */}
        {media && (
          <div>
            <HeroMedia media={media} />
          </div>
        )}
      </Container>
    </section>
  );
}
