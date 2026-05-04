import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wordmark Gaoson's en SVG vectorisé. ViewBox ~1800×705 (ratio 2.55:1).
 * Couleur via `color` du parent (currentColor mask), donc utilisable sur
 * fond ink comme sur fond ivory sans changer de fichier.
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
        "inline-block bg-current align-middle aspect-[1800/705]",
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
