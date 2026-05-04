"use client";

import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative">
      <Marquee
        items={[
          "Crafted cuts",
          "Sharp style",
          "Biot · 06410",
          "Heritage barbering",
          "Mar — Dim",
          "Booksy ↗",
        ]}
      />

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
                On ne fait pas juste des coupes —{" "}
                <span className="italic text-ivory">on cultive un style.</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-12">
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  Gaoson&apos;s, c&apos;est un atelier où la{" "}
                  <em className="not-italic text-ivory">précision du geste</em>{" "}
                  rencontre la{" "}
                  <em className="not-italic text-ivory">culture du soin</em>.
                  Une coupe nette. Une barbe sculptée. Un rasage à la lame —
                  serviette chaude, mousse, baume apaisant. Le rituel masculin
                  sans compromis.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  Un seul lieu, deux fauteuils, deux miroirs lumineux. Un{" "}
                  <em className="not-italic text-ivory">décor</em> qui respire
                  le cuir, le béton et le néon discret. Mardi au dimanche, sur
                  rendez-vous Booksy — ou en walk-in si on a un créneau libre.
                  Tu repars net, posé, prêt.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.45}>
              <div className="mt-14 grid grid-cols-2 gap-8 border-t hairline pt-10 md:grid-cols-4">
                {[
                  { kpi: "08:45", label: "Premier client" },
                  { kpi: "06.410", label: "Biot, France" },
                  { kpi: "1∶1", label: "Sur rendez-vous" },
                  { kpi: "Mar — Dim", label: "Tous les jours sauf lundi" },
                ].map((item) => (
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
