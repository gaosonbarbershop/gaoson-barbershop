"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { BooksyButton } from "./ui/booksy-button";
import { Logo } from "./logo";

const links = [
  { href: "#manifesto", label: "Maison" },
  { href: "#services", label: "Services" },
  { href: "#atelier", label: "Atelier" },
  { href: "#visite", label: "Visite" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b hairline"
            : "bg-transparent",
        )}
      >
        <nav className="container-x flex h-20 items-center justify-between md:h-24">
          <a
            href="#hero"
            className="text-ivory transition-opacity hover:opacity-80"
            aria-label={site.name}
          >
            <Logo className="h-12 md:h-14" />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/70 transition-colors duration-300 hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href={site.links.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors duration-300 hover:text-ghost"
            >
              Réserver →
            </a>
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden p-2 -m-2 text-ghost"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex h-20 items-center justify-between">
              <Logo className="h-12 text-ivory" />
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
                className="p-2 -m-2 text-ghost"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="container-x mt-12 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-5xl tracking-tight text-ghost"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="container-x mt-auto pb-12">
              <BooksyButton className="w-full justify-center" />
              <p className="font-mono mt-6 text-[11px] uppercase tracking-[0.28em] text-bone/50">
                {site.address.full}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
