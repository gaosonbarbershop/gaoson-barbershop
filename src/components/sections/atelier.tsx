"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const tiles = [
  {
    src: "/images/atelier/atelier-1.svg",
    alt: "Vue du fauteuil et du miroir",
    span: "md:col-span-5 md:row-span-2 aspect-[4/5]",
    caption: "Le rituel · 08:45",
  },
  {
    src: "/images/atelier/atelier-2.svg",
    alt: "Détail outils barbier",
    span: "md:col-span-7 aspect-[4/3]",
    caption: "L'atelier",
  },
  {
    src: "/images/atelier/atelier-3.svg",
    alt: "Coupe en action",
    span: "md:col-span-3 aspect-[3/4]",
    caption: "La coupe",
  },
  {
    src: "/images/atelier/atelier-4.svg",
    alt: "Sélection sneakers",
    span: "md:col-span-4 aspect-square",
    caption: "Le drop · 06.410",
  },
  {
    src: "/images/atelier/atelier-5.svg",
    alt: "Façade Gaoson Barber Shop",
    span: "md:col-span-12 aspect-[16/7]",
    caption: "32 Rue Saint-Sébastien — Biot",
  },
];

export function Atelier() {
  return (
    <section id="atelier" className="relative bg-coal/40">
      <div className="container-x section">
        <div className="mb-16 grid gap-10 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
                ‹ 04 / Atelier ›
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <SectionHeader
              eyebrow="L'instant capturé"
              title="Le lieu, la lumière, le geste."
              caption="Quelques fragments du quotidien. Cuir, néons discrets, verre fumé — et toujours quelqu'un en train de couper, raser, ou parler kicks."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden border hairline bg-graphite ${tile.span}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60" />
              <figcaption className="font-mono absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.32em] text-ghost/85">
                {tile.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
