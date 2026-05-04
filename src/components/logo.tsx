import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wordmark Gaoson's en blackletter (UnifrakturMaguntia) + sous-titre
 * BARBER SHOP en sans-serif technique. Hérite de `color` du parent —
 * fonctionne sur fond ink ou ivory sans changer de fichier.
 *
 * Layout fluide via `font-size`. Utilise `text-` Tailwind ou un fontSize
 * explicite via le className.
 */
export function Logo({
  className,
  showSubtitle = true,
  ariaLabel = `${site.name} — wordmark`,
}: {
  className?: string;
  showSubtitle?: boolean;
  ariaLabel?: string;
}) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
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
