"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSite } from "@/components/site-context";

type Variant = "primary" | "ghost";

export function BooksyButton({
  variant = "primary",
  className,
  label = "Réserver sur Booksy",
  href,
  external = true,
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  href?: string;
  external?: boolean;
}) {
  const site = useSite();
  const finalHref = href ?? site.links.booksy;

  const base =
    "group relative inline-flex items-center gap-3 px-7 py-4 text-sm uppercase tracking-[0.18em] font-medium overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  const styles =
    variant === "primary"
      ? "bg-ivory text-ink hover:bg-ghost"
      : "border border-ghost/20 text-ghost hover:border-ghost/40 hover:bg-ghost/5";

  return (
    <motion.a
      href={finalHref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, styles, className)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="relative z-10">{label}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}
