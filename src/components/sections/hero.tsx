"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BooksyButton } from "@/components/ui/booksy-button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] overflow-hidden grain"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/atelier/hero-rooftop.jpg"
          alt="Coupe en plein air, skyline urbaine"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30" />
      </div>

      {/* Top corner labels */}
      <div className="container-x relative z-10 pt-28 md:pt-32">
        <div className="flex items-start justify-between">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-ivory/80"
          >
            Est. Biot · Côte d&apos;Azur
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono hidden text-[11px] uppercase tracking-[0.32em] text-ivory/80 md:block"
          >
            06 · 410
          </motion.p>
        </div>
      </div>

      {/* Wordmark + tagline */}
      <div className="container-x relative z-10 flex min-h-[70svh] flex-col justify-center pt-16 md:pt-24">
        <h1
          aria-label={`${site.name} — ${site.tagline}`}
          className="font-display text-balance leading-[0.86] text-ivory"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[clamp(4rem,16vw,15rem)]"
          >
            Gaoson&apos;s
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block italic text-[clamp(3.5rem,14vw,13rem)] text-ghost/95"
          >
            Barber Shop.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16"
        >
          <p className="max-w-md text-base leading-relaxed text-ghost sm:text-lg">
            <span className="text-ivory">Crafted cuts.</span>{" "}
            <span className="text-ivory">Curated kicks.</span>
            <br className="hidden sm:block" />
            Salon de coiffure homme premium et dépôt-vente sneakers, ancré au
            cœur de Biot.
          </p>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <BooksyButton />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ivory/65">
              ou Mar — Dim · 08:45 — 19:00
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer hero infos */}
      <div className="container-x relative z-10 mt-20 grid gap-3 pb-12 md:mt-32 md:grid-cols-3 md:gap-6">
        {[
          { label: "Adresse", value: site.address.full },
          { label: "Ouvert", value: "Mar — Dim · 08:45 — 19:00" },
          { label: "Repos", value: "Lundi" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="border-t border-ivory/15 pt-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-ivory/60">
              {item.label}
            </p>
            <p className="mt-2 text-sm text-ivory/95">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/55"
        >
          Scroll ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
