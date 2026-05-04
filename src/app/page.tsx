import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Drop } from "@/components/sections/drop";
import { Atelier } from "@/components/sections/atelier";
import { Reviews } from "@/components/sections/reviews";
import { Visit } from "@/components/sections/visit";
import { Footer } from "@/components/sections/footer";
import { getAllSneakers } from "@/lib/sneakers.server";

export default function Home() {
  const sneakers = getAllSneakers();

  return (
    <>
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero />
        <Manifesto />
        <Services />
        <Drop items={sneakers} />
        <Atelier />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
