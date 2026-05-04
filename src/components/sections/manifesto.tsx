"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";

export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="manifesto" className="relative">
      <Marquee
        items={[
          "Crafted cuts",
          "Curated kicks",
          "Biot · 06410",
          "Heritage × Streetwear",
          "Depuis 2015",
          "Mar — Dim",
        ]}
      />

      <div ref={ref} className="container-x section">
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

            <motion.div
              style={{ y }}
              className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-12"
            >
              <Reveal delay={0.15}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  Gaoson&apos;s, c&apos;est un atelier où la <em className="not-italic text-ivory">précision du geste</em> rencontre la <em className="not-italic text-ivory">culture de la rue</em>. Une coupe nette. Une barbe sculptée. Un rasage à la lame. Le rituel masculin, sans compromis, dans un décor qui respire le cuir, le bois et le néon discret.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
                  Et puis il y a le <em className="not-italic text-ivory">drop</em>. Une sélection serrée de sneakers et pièces lifestyle — Jordans, Yeezy, Dunks, raretés — chinées, vérifiées, présentées comme des œuvres. La maison fonctionne en <em className="not-italic text-ivory">dépôt-vente</em>&nbsp;: tu déposes, on s&apos;occupe du reste.
                </p>
              </Reveal>
            </motion.div>

            <Reveal delay={0.45}>
              <div className="mt-14 grid grid-cols-2 gap-8 border-t hairline pt-10 md:grid-cols-4">
                {[
                  { kpi: "08:45", label: "Premier client" },
                  { kpi: "06.410", label: "Biot, France" },
                  { kpi: "1∶1", label: "Sur rendez-vous" },
                  { kpi: "100%", label: "Authentifié" },
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
