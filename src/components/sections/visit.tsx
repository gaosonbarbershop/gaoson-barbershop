"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { BooksyButton } from "@/components/ui/booksy-button";
import { site } from "@/lib/site";

export function Visit() {
  return (
    <section id="visite" className="relative bg-coal/40">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
                ‹ 06 / Visite ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <SectionHeader
              eyebrow="Adresse & horaires"
              title="Passe nous voir."
              caption="On t'attend dans le centre historique de Biot, à deux pas de la place. Sur rendez-vous Booksy, ou en walk-in si on a un créneau."
            />
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <Reveal>
              <div className="border-t hairline pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/55">
                  Adresse
                </p>
                <p className="font-display mt-3 text-3xl leading-tight text-ghost md:text-4xl">
                  {site.address.street}
                  <br />
                  <span className="text-ivory">
                    {site.address.postalCode} {site.address.city}
                  </span>
                </p>
                <a
                  href={site.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ivory hover:text-ghost"
                >
                  <MapPin size={14} strokeWidth={1.5} />
                  Voir sur Google Maps
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t hairline pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/55">
                  Horaires
                </p>
                <ul className="font-mono mt-4 flex flex-col divide-y hairline text-sm">
                  {site.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-bone/85">{h.days}</span>
                      <span
                        className={
                          h.time === "Fermé" ? "text-bone/45" : "text-ghost"
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
              <div className="mt-10 border-t hairline pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/55">
                  Suivre
                </p>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-3 text-ghost transition-colors hover:text-ivory"
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
                <BooksyButton />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-square overflow-hidden border hairline md:aspect-auto md:h-full md:min-h-[520px]">
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
                  <span className="rounded-none bg-ivory px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink">
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
