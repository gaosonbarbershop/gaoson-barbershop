"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useSite } from "@/components/site-context";
import type { ServiceGroup } from "@/lib/services";

export function Services({ groups }: { groups: ServiceGroup[] }) {
  const site = useSite();

  return (
    <section id="services" className="section-light relative">
      <div className="container-x section">
        {/* Header */}
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/70">
                ‹ 02 / Services ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/55">
                Tarifs Booksy
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-5 text-balance text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                Le geste, la lame,{" "}
                <span className="italic">le détail.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                Trois familles, un seul standard. Tous les rendez-vous incluent
                shampooing et finitions — paiement sur place (CB ou espèces).
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-3">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: gi * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col bg-ivory p-8 md:p-10 lg:p-12"
            >
              <div className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/55">
                  {String(gi + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-3xl text-ink md:text-4xl">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm italic text-ink/65">
                  {group.caption}
                </p>
              </div>

              <ul className="mt-auto flex flex-col divide-y divide-ink/10">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-base text-ink">{item.name}</p>
                      <span className="font-mono text-sm text-ink">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      {item.description ? (
                        <p className="max-w-[28ch] text-xs leading-relaxed text-ink/55">
                          {item.description}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
                        {item.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink/65">
              Tarifs susceptibles d&apos;ajustement selon longueur et type de
              prestation. La réservation se fait via Booksy.
            </p>
            <a
              href={site.links.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-graphite"
            >
              Prendre rendez-vous
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
