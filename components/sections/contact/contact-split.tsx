import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import type { ContactContent, ContactForm } from "@/content/schemas";
import type { SectionProps } from "../types";

const defaultLabels = {
  name: "Nome",
  email: "E-mail",
  phone: "Telefone (opcional)",
  message: "Mensagem",
};

function ContactFormFields({ form, idPrefix }: { form: ContactForm; idPrefix: string }) {
  const labels = { ...defaultLabels, ...form.labels };
  const isMailto = form.action.startsWith("mailto:");

  return (
    <form
      action={form.action}
      method="post"
      encType={isMailto ? "text/plain" : undefined}
      className="grid gap-5"
    >
      <Input id={`${idPrefix}-name`} name="nome" label={labels.name} autoComplete="name" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          label={labels.email}
          autoComplete="email"
          required
        />
        <Input id={`${idPrefix}-phone`} name="telefone" type="tel" label={labels.phone} autoComplete="tel" />
      </div>
      <Textarea id={`${idPrefix}-message`} name="mensagem" label={labels.message} required />
      <Button type="submit" className="w-full sm:w-auto sm:justify-self-start">
        {form.submitLabel}
      </Button>
      {form.note && <p className="text-xs leading-5 text-muted-foreground">{form.note}</p>}
    </form>
  );
}

/** Contact channels on one side and a form on the other. */
export function ContactSplit({ id, surface, content }: SectionProps<ContactContent>) {
  const { eyebrow, title, description, details, form } = content;

  return (
    <Section id={id} surface={surface}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
          <dl className="mt-10 grid gap-6">
            {details.map((detail) => (
              <div key={detail.label} className="flex gap-4">
                {detail.icon && (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-field bg-accent/10 text-accent">
                    <Icon name={detail.icon} />
                  </span>
                )}
                <div>
                  <dt className="text-sm text-muted-foreground">{detail.label}</dt>
                  <dd className="mt-0.5 font-medium">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="rounded-sm underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        {form && (
          <div className="self-start">
            <Card>
              <ContactFormFields form={form} idPrefix={id ?? "contact"} />
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
