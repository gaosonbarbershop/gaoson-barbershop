import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y hairline bg-ink/60 backdrop-blur-sm",
        className,
      )}
    >
      <div className="marquee flex w-max items-center gap-12 py-5 will-change-transform">
        {loop.map((text, i) => (
          <span
            key={i}
            className="font-mono shrink-0 text-[11px] uppercase tracking-[0.32em] text-bone/60"
          >
            <span aria-hidden="true" className="mr-12 text-ivory">
              ✦
            </span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
