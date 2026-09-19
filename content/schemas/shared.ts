import {
  href,
  imagePath,
  number,
  object,
  optional,
  text,
  type Infer,
  type InferShape,
} from "@/lib/schema";

/* Text presets, so length limits are consistent across sections. */

/** Buttons, links, badges, eyebrows. */
export const labelText = text({ max: 40 });
/** Names and item titles. */
export const shortText = text({ max: 80 });
/** Section titles. */
export const headingText = text({ max: 140 });
/** Paragraphs. */
export const bodyText = text({ max: 600 });

/** A labeled link: navigation items and call-to-action buttons. */
export const linkItemSchema = object({
  label: labelText,
  href: href(),
});
export type LinkItem = Infer<typeof linkItemSchema>;

/** An image in /public, with intrinsic size. Use alt "" for decorative images. */
export const imageAssetShape = {
  src: imagePath(),
  alt: text({ min: 0, max: 200 }),
  width: number({ integer: true, min: 1, max: 4000 }),
  height: number({ integer: true, min: 1, max: 4000 }),
};
export const imageAssetSchema = object(imageAssetShape);
export type ImageAsset = Infer<typeof imageAssetSchema>;

/** Eyebrow, title and description shown at the top of most sections. */
export const sectionHeaderShape = {
  eyebrow: optional(labelText),
  title: headingText,
  description: optional(bodyText),
};
export type SectionHeader = InferShape<typeof sectionHeaderShape>;

export const brandSchema = object({
  name: shortText,
  logo: optional(imageAssetSchema),
});
export type Brand = Infer<typeof brandSchema>;
