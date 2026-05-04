import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wordmark Gaoson's en SVG vectorisé.
 *
 * Utilise mask-image pour rester teinté par `color` du parent (currentColor).
 * Le ratio est ~3:1 (large × haute), à toi de définir width/height ou h-X
 * via className. La couleur suit `color`.
 */
export function Logo({
  className,
  ariaLabel = `${site.name} — wordmark`,
}: {
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "inline-block bg-current align-middle",
        // par défaut : 3.5rem haut × auto large pour respecter le ratio du SVG
        className,
      )}
      style={{
        WebkitMaskImage: "url(/images/logo-gaoson.svg)",
        maskImage: "url(/images/logo-gaoson.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
