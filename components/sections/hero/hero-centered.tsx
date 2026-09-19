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

/** Centered copy with the media below. Good for products and single-offer pages. */
export function HeroCentered({ id, surface = "default", content }: SectionProps<HeroContent>) {
  const { badge, title, description, primaryAction, secondaryAction, media } = content;

  return (
    <section id={id} className={cn("relative isolate overflow-hidden", surfaceStyles[surface])}>
      <HeroBackdrop />
      <Container className="flex flex-col items-center pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
        {badge && <Badge>{badge}</Badge>}
        <Heading as="h1" size="display" className={cn("max-w-4xl", badge && "mt-6")}>
          {title}
        </Heading>
        <Text size="lg" className="mt-6 max-w-text">
          {description}
        </Text>
        <Actions
          primary={primaryAction}
          secondary={secondaryAction}
          className="mt-10 w-full justify-center sm:w-auto"
        />
        {media && (
          <div className="mt-16 w-full max-w-media text-left sm:mt-20">
            <HeroMedia media={media} />
          </div>
        )}
      </Container>
    </section>
  );
}
