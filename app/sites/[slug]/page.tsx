import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageComposer } from "@/composer/page-composer";
import { exampleSites, getExampleSite } from "@/content/examples";
import { DemoBanner } from "./demo-banner";

// Known sites are prerendered at build time; unknown slugs hit notFound() below.
export function generateStaticParams() {
  return exampleSites.map((site) => ({ slug: site.blueprint.id }));
}

export async function generateMetadata({ params }: PageProps<"/sites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const site = getExampleSite(slug);
  if (!site) return {};

  const { name, seo } = site.blueprint;
  return {
    title: { absolute: seo.title },
    description: seo.description,
    // Demo sites with fictional content must not be indexed.
    robots: { index: false, follow: false },
    openGraph: { siteName: name, title: seo.title, description: seo.description },
  };
}

export default async function ExampleSitePage({ params }: PageProps<"/sites/[slug]">) {
  const { slug } = await params;
  const site = getExampleSite(slug);
  if (!site) notFound();

  return (
    <>
      <DemoBanner blueprint={site.blueprint} />
      <PageComposer page={site.page} />
    </>
  );
}
