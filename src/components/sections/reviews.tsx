"use client";

import Script from "next/script";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function Reviews() {
  return (
    <section id="avis" className="relative">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
                ‹ 05 / Avis ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <SectionHeader
              eyebrow="Google Reviews"
              title="La voix de ceux qui passent."
              caption="Les avis bruts, sans filtre, directement depuis Google. Le seul jugement qui vaut, c'est le tien."
            />
          </div>
        </div>

        <Reveal>
          <div className="border hairline bg-coal/40 p-4 md:p-6">
            <div
              className={`elfsight-app-${site.elfsightWidgetId}`}
              data-elfsight-app-lazy
            />
          </div>
        </Reveal>
      </div>

      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
        async
      />
    </section>
  );
}
