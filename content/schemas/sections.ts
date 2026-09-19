import type { IconName } from "@/components/ui/icon";
import type { TerminalLine } from "@/components/ui/terminal";
import type { Brand, ImageAsset, LinkItem, SectionHeader } from "./shared";

/*
 * Content schemas: the data each section type accepts. Every variant of a
 * section type (e.g. HeroCentered and HeroSplit) takes the same content, so
 * switching variants never requires rewriting content.
 */

export type NavbarContent = {
  brand: Brand;
  links: LinkItem[];
  action?: LinkItem;
};

export type HeroMedia =
  | { kind: "terminal"; title?: string; lines: TerminalLine[] }
  | { kind: "card"; title: string; items: string[]; footnote?: string }
  | ({ kind: "image" } & ImageAsset);

export type HeroContent = {
  badge?: string;
  title: string;
  description: string;
  primaryAction?: LinkItem;
  secondaryAction?: LinkItem;
  media?: HeroMedia;
};

export type FeatureItem = {
  icon?: IconName;
  title: string;
  description: string;
  badge?: string;
  /** Turns the whole card into a link. */
  href?: string;
  /** Text of the link shown on the card. Default: "Saiba mais". */
  linkLabel?: string;
};

export type FeaturesContent = SectionHeader & {
  items: FeatureItem[];
};

export type BenefitsContent = SectionHeader & {
  items: { title: string; description?: string }[];
  action?: LinkItem;
};

export type StatsContent = Partial<SectionHeader> & {
  items: { value: string; label: string }[];
};

export type LogosContent = {
  title?: string;
  /** Company names, rendered as wordmarks. */
  items: string[];
};

export type TestimonialsContent = SectionHeader & {
  items: { quote: string; author: string; role?: string }[];
};

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  action: LinkItem;
  highlighted?: boolean;
  badge?: string;
};

export type PricingContent = SectionHeader & {
  plans: PricingPlan[];
  note?: string;
};

export type FaqContent = SectionHeader & {
  items: { question: string; answer: string }[];
};

export type TimelineContent = SectionHeader & {
  items: { title: string; description: string }[];
};

export type ContactDetail = {
  icon?: IconName;
  label: string;
  value: string;
  href?: string;
};

export type ContactForm = {
  /** Where the form is sent: an endpoint URL or a mailto: address. */
  action: string;
  submitLabel: string;
  note?: string;
  labels?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

export type ContactContent = SectionHeader & {
  details: ContactDetail[];
  form?: ContactForm;
};

export type CtaForm = {
  action: string;
  /** Accessible label of the e-mail field. */
  label: string;
  placeholder?: string;
  submitLabel: string;
  note?: string;
};

export type CtaContent = {
  title: string;
  description?: string;
  primaryAction?: LinkItem;
  secondaryAction?: LinkItem;
  /** Used by the "form" variant. Other variants show the actions. */
  form?: CtaForm;
};

export type FooterContent = {
  brand: Brand;
  description?: string;
  columns?: { title: string; links: LinkItem[] }[];
  legal?: string;
};

export type CodeContent = SectionHeader & {
  points?: string[];
  action?: LinkItem;
  code: { filename?: string; content: string };
};

/** Maps each section type to its content schema. */
export type SectionContentMap = {
  navbar: NavbarContent;
  hero: HeroContent;
  features: FeaturesContent;
  benefits: BenefitsContent;
  stats: StatsContent;
  logos: LogosContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  faq: FaqContent;
  timeline: TimelineContent;
  contact: ContactContent;
  cta: CtaContent;
  footer: FooterContent;
  code: CodeContent;
};

export type SectionType = keyof SectionContentMap;
