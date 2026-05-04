"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import {
  formatPrice,
  STATUS_LABEL,
  type Sneaker,
  type SneakerStatus,
} from "@/lib/sneakers";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const STATUS_STYLE: Record<SneakerStatus, string> = {
  available: "bg-ivory text-ink",
  reserved: "bg-bone/30 text-ghost border border-ghost/20",
  sold: "bg-transparent text-bone/55 border border-bone/20",
};

export function Drop({ items }: { items: Sneaker[] }) {
  return (
    <section id="drop" className="relative">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
                ‹ 03 / Drop ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <SectionHeader
              eyebrow="Sneakers & Lifestyle"
              title="Le drop. Pièces choisies, pas chinées."
              caption="Chaque paire est authentifiée, photographiée, et présentée en boutique. La maison fonctionne en dépôt-vente — la sélection tourne en permanence."
            />
          </div>
        </div>

        {items.length === 0 ? (
          <Reveal>
            <div className="border hairline px-8 py-20 text-center">
              <p className="font-display text-3xl text-ghost md:text-4xl">
                Le drop arrive bientôt.
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm text-bone/65">
                En attendant, retrouve la sélection en cours sur Instagram —
                nouveautés chaque semaine.
              </p>
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ivory hover:text-ghost"
              >
                <InstagramIcon size={14} strokeWidth={1.5} />
                @gaosonbarbershop
              </a>
            </div>
          </Reveal>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden border hairline bg-coal/30 transition-colors duration-500",
                  item.status !== "sold" && "hover:bg-coal/60",
                )}
              >
                <div className="relative aspect-square overflow-hidden bg-graphite">
                  <Image
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      item.status !== "sold" && "group-hover:scale-105",
                      item.status === "sold" && "opacity-50 grayscale",
                    )}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={cn(
                      "font-mono absolute left-4 top-4 inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                      STATUS_STYLE[item.status],
                    )}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/55">
                      {item.brand}
                    </p>
                    <h3 className="font-display mt-2 text-xl leading-tight text-ghost md:text-2xl">
                      {item.model}
                    </h3>
                  </div>

                  <dl className="font-mono mt-auto grid grid-cols-2 gap-3 border-t hairline pt-4 text-[11px] uppercase tracking-[0.18em]">
                    <div>
                      <dt className="text-bone/45">Pointure</dt>
                      <dd className="mt-1 text-ghost/90">{item.size}</dd>
                    </div>
                    <div>
                      <dt className="text-bone/45">État</dt>
                      <dd className="mt-1 text-ghost/90">{item.condition}</dd>
                    </div>
                  </dl>

                  <div className="flex items-end justify-between border-t hairline pt-4">
                    <span className="font-display text-2xl text-ivory">
                      {formatPrice(item.price)}
                    </span>
                    {item.status === "available" && (
                      <a
                        href={site.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/70 transition-colors hover:text-ivory"
                      >
                        Réserver →
                      </a>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-start gap-4 border-t hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-bone/60">
              Une paire à déposer&nbsp;? On évalue, on photographie, on vend
              pour toi. Passe en boutique ou écris-nous sur Instagram.
            </p>
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ivory hover:text-ghost"
            >
              <InstagramIcon size={14} strokeWidth={1.5} />
              @gaosonbarbershop
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
