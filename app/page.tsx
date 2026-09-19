import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductionFlow } from "@/components/sections/production-flow";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TechStack } from "@/components/sections/tech-stack";
import { Terminal } from "@/components/ui/terminal";
import { homeContent } from "@/content/home";

export default function HomePage() {
  const { hero, terminal, howItWorks, techStack, productionFlow, cta } = homeContent;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero {...hero} visual={<Terminal title="ai-site-factory" lines={terminal} />} />
        <HowItWorks {...howItWorks} />
        <TechStack {...techStack} />
        <ProductionFlow {...productionFlow} />
        <Cta {...cta} />
      </main>
      <SiteFooter />
    </>
  );
}
