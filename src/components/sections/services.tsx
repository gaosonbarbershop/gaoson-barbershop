"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { BooksyButton } from "@/components/ui/booksy-button";
import { serviceGroups } from "@/lib/services";

export function Services() {
  return (
    <section id="services" className="relative bg-coal/40">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
                ‹ 02 / Services ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <SectionHeader
              eyebrow="Tarifs"
              title="Le geste, la lame, le détail."
              caption="Trois familles, un seul standard. Tous nos rendez-vous incluent shampooing, finitions et un café — ou ce que tu préfères."
            />
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border hairline bg-border md:grid-cols-3">
          {serviceGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: gi * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col bg-ink p-8 md:p-10 lg:p-12"
            >
              <div className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/70">
                  {String(gi + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-3xl text-ghost md:text-4xl">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm italic text-bone/70">
                  {group.caption}
                </p>
              </div>

              <ul className="mt-auto flex flex-col divide-y hairline">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-base text-ghost">{item.name}</p>
                      <span className="font-mono text-sm text-ivory">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      {item.description ? (
                        <p className="max-w-[28ch] text-xs leading-relaxed text-bone/55">
                          {item.description}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45">
                        {item.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-bone/60">
              Tarifs indicatifs susceptibles d&apos;ajustement selon la longueur
              et la coiffure souhaitée. Paiement sur place — CB, espèces.
            </p>
            <BooksyButton variant="primary" label="Prendre rendez-vous" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
