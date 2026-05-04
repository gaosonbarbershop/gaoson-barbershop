import { SiteNav } from "@/components/site-nav";
import { SiteProvider } from "@/components/site-context";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Atelier } from "@/components/sections/atelier";
import { Reviews } from "@/components/sections/reviews";
import { Visit } from "@/components/sections/visit";
import { Footer } from "@/components/sections/footer";
import { getSite } from "@/lib/site.server";
import { getServiceGroups } from "@/lib/services.server";
import { getManifesto } from "@/lib/manifesto.server";
import { getAtelierTiles } from "@/lib/atelier.server";

export default function Home() {
  const site = getSite();
  const services = getServiceGroups();
  const manifesto = getManifesto();
  const atelier = getAtelierTiles();

  return (
    <SiteProvider site={site}>
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero manifesto={manifesto} />
        <Manifesto manifesto={manifesto} />
        <Services groups={services} />
        <Atelier tiles={atelier} />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </SiteProvider>
  );
}
