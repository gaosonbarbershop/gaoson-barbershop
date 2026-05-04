import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Atelier } from "@/components/sections/atelier";
import { Reviews } from "@/components/sections/reviews";
import { Visit } from "@/components/sections/visit";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero />
        <Manifesto />
        <Services />
        <Atelier />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
