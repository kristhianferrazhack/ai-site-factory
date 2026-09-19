import { iconNames } from "@/components/ui/icon-names";
import {
  array,
  boolean,
  discriminatedUnion,
  formAction,
  href,
  literal,
  object,
  oneOf,
  optional,
  partialRecord,
  text,
  type Infer,
} from "@/lib/schema";
import {
  bodyText,
  brandSchema,
  headingText,
  imageAssetShape,
  labelText,
  linkItemSchema,
  sectionHeaderShape,
  shortText,
} from "./shared";

/*
 * Content schemas: the data each section type accepts, validated at runtime
 * and typed through Infer. Every variant of a section type (e.g. HeroCentered
 * and HeroSplit) takes the same content, so switching variants never requires
 * rewriting content.
 */

const iconSchema = oneOf(iconNames, { subject: "icon" });

export const terminalLineSchema = object({
  kind: oneOf(["command", "success", "info"], { subject: "terminal line kind" }),
  text: text({ max: 120 }),
});
export type TerminalLine = Infer<typeof terminalLineSchema>;

export const navbarContentSchema = object({
  brand: brandSchema,
  links: array(linkItemSchema, { max: 8 }),
  action: optional(linkItemSchema),
});
export type NavbarContent = Infer<typeof navbarContentSchema>;

const heroMediaSchema = discriminatedUnion("kind", [
  object({
    kind: literal("terminal"),
    title: optional(shortText),
    lines: array(terminalLineSchema, { min: 1, max: 12 }),
  }),
  object({
    kind: literal("card"),
    title: shortText,
    items: array(text({ max: 120 }), { min: 1, max: 8 }),
    footnote: optional(text({ max: 200 })),
  }),
  object({ kind: literal("image"), ...imageAssetShape }),
]);
export type HeroMedia = Infer<typeof heroMediaSchema>;

export const heroContentSchema = object({
  badge: optional(labelText),
  title: headingText,
  description: bodyText,
  primaryAction: optional(linkItemSchema),
  secondaryAction: optional(linkItemSchema),
  media: optional(heroMediaSchema),
});
export type HeroContent = Infer<typeof heroContentSchema>;

const featureItemSchema = object({
  icon: optional(iconSchema),
  title: shortText,
  description: text({ max: 300 }),
  badge: optional(labelText),
  /** Turns the whole card into a link. */
  href: optional(href()),
  /** Text of the link shown on the card. Default: "Saiba mais". */
  linkLabel: optional(labelText),
});
export type FeatureItem = Infer<typeof featureItemSchema>;

export const featuresContentSchema = object({
  ...sectionHeaderShape,
  items: array(featureItemSchema, { min: 1, max: 16 }),
});
export type FeaturesContent = Infer<typeof featuresContentSchema>;

export const benefitsContentSchema = object({
  ...sectionHeaderShape,
  items: array(object({ title: shortText, description: optional(text({ max: 300 })) }), {
    min: 1,
    max: 8,
  }),
  action: optional(linkItemSchema),
});
export type BenefitsContent = Infer<typeof benefitsContentSchema>;

export const statsContentSchema = object({
  eyebrow: optional(labelText),
  title: optional(headingText),
  description: optional(bodyText),
  items: array(object({ value: text({ max: 20 }), label: text({ max: 60 }) }), { min: 1, max: 6 }),
});
export type StatsContent = Infer<typeof statsContentSchema>;

export const logosContentSchema = object({
  title: optional(text({ max: 120 })),
  /** Company names, rendered as wordmarks. */
  items: array(text({ max: 40 }), { min: 1, max: 12 }),
});
export type LogosContent = Infer<typeof logosContentSchema>;

export const testimonialsContentSchema = object({
  ...sectionHeaderShape,
  items: array(
    object({ quote: text({ max: 400 }), author: text({ max: 60 }), role: optional(text({ max: 80 })) }),
    { min: 1, max: 9 },
  ),
});
export type TestimonialsContent = Infer<typeof testimonialsContentSchema>;

const pricingPlanSchema = object({
  name: labelText,
  price: text({ max: 30 }),
  period: optional(text({ max: 20 })),
  description: text({ max: 200 }),
  features: array(text({ max: 80 }), { min: 1, max: 12 }),
  action: linkItemSchema,
  highlighted: optional(boolean()),
  badge: optional(labelText),
});
export type PricingPlan = Infer<typeof pricingPlanSchema>;

export const pricingContentSchema = object({
  ...sectionHeaderShape,
  plans: array(pricingPlanSchema, { min: 1, max: 4 }),
  note: optional(text({ max: 200 })),
});
export type PricingContent = Infer<typeof pricingContentSchema>;

export const faqContentSchema = object({
  ...sectionHeaderShape,
  items: array(object({ question: text({ max: 200 }), answer: text({ max: 1000 }) }), {
    min: 1,
    max: 20,
  }),
});
export type FaqContent = Infer<typeof faqContentSchema>;

export const timelineContentSchema = object({
  ...sectionHeaderShape,
  items: array(object({ title: text({ max: 60 }), description: text({ max: 300 }) }), {
    min: 2,
    max: 10,
  }),
});
export type TimelineContent = Infer<typeof timelineContentSchema>;

const contactDetailSchema = object({
  icon: optional(iconSchema),
  label: labelText,
  value: text({ max: 120 }),
  href: optional(href()),
});
export type ContactDetail = Infer<typeof contactDetailSchema>;

const contactFormSchema = object({
  /** Where the form is sent: an HTTPS endpoint or a mailto: address. */
  action: formAction(),
  submitLabel: labelText,
  note: optional(text({ max: 200 })),
  labels: optional(partialRecord(["name", "email", "phone", "message"], text({ max: 60 }))),
});
export type ContactForm = Infer<typeof contactFormSchema>;

export const contactContentSchema = object({
  ...sectionHeaderShape,
  details: array(contactDetailSchema, { min: 1, max: 8 }),
  form: optional(contactFormSchema),
});
export type ContactContent = Infer<typeof contactContentSchema>;

const ctaFormSchema = object({
  action: formAction(),
  /** Accessible label of the e-mail field. */
  label: text({ max: 60 }),
  placeholder: optional(text({ max: 60 })),
  submitLabel: labelText,
  note: optional(text({ max: 200 })),
});
export type CtaForm = Infer<typeof ctaFormSchema>;

export const ctaContentSchema = object({
  title: headingText,
  description: optional(text({ max: 300 })),
  primaryAction: linkItemSchema,
  secondaryAction: optional(linkItemSchema),
  /** Required by the "form" variant; the other variants show the actions. */
  form: optional(ctaFormSchema),
});
export type CtaContent = Infer<typeof ctaContentSchema>;

export const footerContentSchema = object({
  brand: brandSchema,
  description: optional(text({ max: 300 })),
  columns: optional(
    array(object({ title: labelText, links: array(linkItemSchema, { min: 1, max: 8 }) }), {
      min: 1,
      max: 4,
    }),
  ),
  legal: optional(text({ max: 300 })),
});
export type FooterContent = Infer<typeof footerContentSchema>;

export const codeContentSchema = object({
  ...sectionHeaderShape,
  points: optional(array(text({ max: 160 }), { min: 1, max: 6 })),
  action: optional(linkItemSchema),
  code: object({
    filename: optional(text({ max: 80 })),
    content: text({ max: 4000, allowMarkup: true }),
  }),
});
export type CodeContent = Infer<typeof codeContentSchema>;

/** Content schema of each section type. */
export const sectionContentSchemas = {
  navbar: navbarContentSchema,
  hero: heroContentSchema,
  features: featuresContentSchema,
  benefits: benefitsContentSchema,
  stats: statsContentSchema,
  logos: logosContentSchema,
  testimonials: testimonialsContentSchema,
  pricing: pricingContentSchema,
  faq: faqContentSchema,
  timeline: timelineContentSchema,
  contact: contactContentSchema,
  cta: ctaContentSchema,
  footer: footerContentSchema,
  code: codeContentSchema,
};

export type SectionContentMap = {
  [T in keyof typeof sectionContentSchemas]: Infer<(typeof sectionContentSchemas)[T]>;
};

export type SectionType = keyof SectionContentMap;

export const sectionTypes = Object.keys(sectionContentSchemas) as SectionType[];
