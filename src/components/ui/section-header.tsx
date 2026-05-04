import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  caption,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  caption?: string;
  className?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header className={cn("max-w-3xl", alignClass, className)}>
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display mt-5 text-balance text-4xl leading-[1.05] text-ghost sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Reveal>
      {caption && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">
            {caption}
          </p>
        </Reveal>
      )}
    </header>
  );
}
