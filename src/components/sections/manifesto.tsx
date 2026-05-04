"use client";

import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import type { Manifesto as ManifestoData } from "@/lib/manifesto";

// Render markdown-ish bold inline (**text**) as <strong>
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="not-italic font-normal text-ivory">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Manifesto({ manifesto }: { manifesto: ManifestoData }) {
  return (
    <section id="manifesto" className="relative">
      <Marquee items={manifesto.marquee} />

      <div className="container-x section">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
              ‹ 01 / Maison ›
            </p>
            <p className="font-mono mt-3 text-[11px] uppercase tracking-[0.32em] text-bone/45">
              Le manifeste
            </p>
          </Reveal>

          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-balance text-3xl leading-[1.1] text-ghost sm:text-4xl md:text-5xl lg:text-[3.75rem]">
                {manifesto.title}
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-12">
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  {renderInline(manifesto.paragraph1)}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  {renderInline(manifesto.paragraph2)}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.45}>
              <div className="mt-14 grid grid-cols-2 gap-8 border-t hairline pt-10 md:grid-cols-4">
                {manifesto.kpis.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-3xl text-ivory sm:text-4xl">
                      {item.kpi}
                    </p>
                    <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.28em] text-bone/55">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
