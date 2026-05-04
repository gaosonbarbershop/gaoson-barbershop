"use client";

import { cn } from "@/lib/utils";
import { useSite } from "@/components/site-context";

/**
 * Wordmark Gaoson's en blackletter (UnifrakturMaguntia) + sous-titre
 * BARBER SHOP en sans-serif technique. Hérite de `color` du parent.
 */
export function Logo({
  className,
  showSubtitle = true,
  ariaLabel,
}: {
  className?: string;
  showSubtitle?: boolean;
  ariaLabel?: string;
}) {
  const site = useSite();
  const label = ariaLabel ?? `${site.name} — wordmark`;

  return (
    <span
      role="img"
      aria-label={label}
      className={cn("inline-flex flex-col items-center leading-none", className)}
    >
      <span aria-hidden="true" className="font-wordmark tracking-tight">
        Gaoson&apos;s
      </span>
      {showSubtitle && (
        <span
          aria-hidden="true"
          className="mt-[0.25em] font-mono uppercase tracking-[0.5em] text-[0.18em] opacity-90"
          style={{ paddingLeft: "0.5em" }}
        >
          Barber Shop
        </span>
      )}
    </span>
  );
}
