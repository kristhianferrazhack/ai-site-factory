/** A labeled link: navigation items and call-to-action buttons. */
export type LinkItem = {
  label: string;
  href: string;
};

/** An image in /public (or an allowed remote host), with intrinsic size. */
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Eyebrow, title and description shown at the top of most sections. */
export type SectionHeader = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type Brand = {
  name: string;
  logo?: ImageAsset;
};
