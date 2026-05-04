"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

type Tile = {
  src: string;
  alt: string;
  span: string;
  caption: string;
  priority?: boolean;
};

const tiles: Tile[] = [
  {
    src: "/images/atelier/salon-interior.jpg",
    alt: "Vue intérieure du salon — chaises noires, miroirs ronds, sol béton",
    span: "md:col-span-7 md:row-span-2 aspect-[4/5]",
    caption: "L'atelier · Biot",
    priority: true,
  },
  {
    src: "/images/atelier/hero-rooftop.jpg",
    alt: "Coupe streetwear sur rooftop, skyline en arrière-plan",
    span: "md:col-span-5 aspect-[4/3]",
    caption: "Le rituel · noir & blanc",
  },
  {
    src: "/images/atelier/atelier-3.svg",
    alt: "Lumière sur outils du barbier",
    span: "md:col-span-2 aspect-square",
    caption: "Outils",
  },
  {
    src: "/images/atelier/atelier-4.svg",
    alt: "Détail mobilier velours noir",
    span: "md:col-span-3 aspect-square",
    caption: "Velours",
  },
];

export function Atelier() {
  return (
    <section id="atelier" className="relative">
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
              eyebrow="Le lieu, capté"
              title="Cuir, lumière, béton, miroirs ronds."
              caption="32 Rue Saint-Sébastien. Une seule pièce, deux fauteuils, deux miroirs lumineux. Le décor est posé, le geste fait le reste."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                priority={tile.priority}
                className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60" />
              <figcaption className="font-mono absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.32em] text-ivory/95">
                {tile.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
