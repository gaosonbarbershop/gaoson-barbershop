"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function Visit() {
  return (
    <section id="visite" className="section-light relative">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/70">
                ‹ 05 / Visite ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/55">
                Adresse & horaires
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-5 text-balance text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                Passe nous voir.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                Centre historique de Biot, à deux pas de la place. Sur
                rendez-vous via Booksy — ou en walk-in si on a un créneau.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {/* Left — infos sur fond crème */}
          <div className="flex flex-col">
            <Reveal>
              <div className="border-t border-ink/15 pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/55">
                  Adresse
                </p>
                <p className="font-display mt-3 text-3xl leading-tight text-ink md:text-4xl">
                  {site.address.street}
                  <br />
                  <span className="italic">
                    {site.address.postalCode} {site.address.city}
                  </span>
                </p>
                <a
                  href={site.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-ink/65"
                >
                  <MapPin size={14} strokeWidth={1.5} />
                  Voir sur Google Maps
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-ink/15 pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/55">
                  Horaires
                </p>
                <ul className="font-mono mt-4 flex flex-col divide-y divide-ink/15 text-sm">
                  {site.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-ink/85">{h.days}</span>
                      <span
                        className={
                          h.time === "Fermé" ? "text-ink/45" : "text-ink"
                        }
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-ink/15 pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/55">
                  Suivre
                </p>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-3 text-ink transition-colors hover:text-ink/65"
                >
                  <InstagramIcon size={20} strokeWidth={1.5} />
                  <span className="font-display text-2xl">
                    @gaosonbarbershop
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12">
                <a
                  href={site.links.booksy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-graphite"
                >
                  Réserver sur Booksy
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — map dark */}
          <Reveal delay={0.15}>
            <div className="relative aspect-square overflow-hidden border border-ink/15 bg-ink md:aspect-auto md:h-full md:min-h-[560px]">
              <iframe
                title="Plan d'accès Gaoson's Barber Shop"
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.0905%2C43.6260%2C7.0985%2C43.6310&layer=mapnik&marker=43.6285%2C7.0945"
                className="absolute inset-0 h-full w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/30 via-transparent to-ink/40 mix-blend-multiply" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
              >
                <div className="font-mono flex flex-col items-center gap-2">
                  <span className="bg-ivory px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink">
                    Gaoson&apos;s
                  </span>
                  <span className="block h-6 w-px bg-ivory" />
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
