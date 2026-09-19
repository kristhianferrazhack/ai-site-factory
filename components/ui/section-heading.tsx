import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-text", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-medium tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <Heading>{title}</Heading>
      {description && <Text className="mt-4">{description}</Text>}
    </div>
  );
}
