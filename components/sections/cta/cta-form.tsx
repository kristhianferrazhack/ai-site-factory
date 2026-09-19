import { Actions } from "@/components/ui/actions";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import type { CtaContent } from "@/content/schemas";
import type { SectionProps } from "../types";

/** Lead capture: a single e-mail field. Falls back to buttons when there is no form. */
export function CtaForm({ id, surface, content }: SectionProps<CtaContent>) {
  const { title, description, primaryAction, secondaryAction, form } = content;
  const isMailto = form?.action.startsWith("mailto:");

  return (
    <Section id={id} surface={surface}>
      <div className="relative isolate overflow-hidden rounded-panel border border-border bg-surface px-6 py-14 sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -z-10 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="mx-auto max-w-2xl text-center">
          <Heading>{title}</Heading>
          {description && <Text className="mt-4">{description}</Text>}
          {form ? (
            <>
              <form
                action={form.action}
                method="post"
                encType={isMailto ? "text/plain" : undefined}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left sm:flex-row"
              >
                <Input
                  id={`${id ?? "cta"}-email`}
                  name="email"
                  type="email"
                  label={form.label}
                  hideLabel
                  placeholder={form.placeholder}
                  autoComplete="email"
                  required
                  className="flex-1"
                />
                <Button type="submit">{form.submitLabel}</Button>
              </form>
              {form.note && <p className="mt-3 text-xs text-muted-foreground">{form.note}</p>}
            </>
          ) : (
            <Actions
              primary={primaryAction}
              secondary={secondaryAction}
              className="mt-8 justify-center"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
