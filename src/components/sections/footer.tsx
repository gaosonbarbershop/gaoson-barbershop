import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Marquee } from "@/components/ui/marquee";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t hairline bg-ink">
      <Marquee
        items={[
          "Crafted cuts",
          "Curated kicks",
          "Biot · 06410",
          "Mar — Dim · 08:45 — 19:00",
          "Booksy ↗",
        ]}
      />

      <div className="container-x py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="h-24 w-[280px] text-ivory md:h-32 md:w-[360px]" />
            <p className="font-display mt-10 text-3xl italic leading-tight text-ivory md:text-4xl">
              Until next cut.
            </p>
            <p className="mt-8 max-w-sm text-sm text-bone/60">
              {site.tagline} — {site.address.full}
            </p>
          </div>

          <div className="grid gap-10 md:col-span-7 md:grid-cols-3 md:gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/45">
                Maison
              </p>
              <ul className="font-mono mt-4 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href="#manifesto"
                    className="text-ghost/85 hover:text-ivory"
                  >
                    Le manifeste
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-ghost/85 hover:text-ivory">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#drop" className="text-ghost/85 hover:text-ivory">
                    Le drop
                  </a>
                </li>
                <li>
                  <a href="#atelier" className="text-ghost/85 hover:text-ivory">
                    Atelier
                  </a>
                </li>
                <li>
                  <a href="#avis" className="text-ghost/85 hover:text-ivory">
                    Avis
                  </a>
                </li>
                <li>
                  <a href="#visite" className="text-ghost/85 hover:text-ivory">
                    Visite
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/45">
                Contact
              </p>
              <ul className="font-mono mt-4 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href={site.links.booksy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ghost/85 hover:text-ivory"
                  >
                    Réserver — Booksy ↗
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ghost/85 hover:text-ivory"
                  >
                    <InstagramIcon size={12} strokeWidth={1.5} />
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ghost/85 hover:text-ivory"
                  >
                    Google Maps ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/45">
                Horaires
              </p>
              <ul className="font-mono mt-4 flex flex-col gap-2 text-sm">
                {site.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex flex-col gap-0.5 text-ghost/85"
                  >
                    <span>{h.days}</span>
                    <span className="text-bone/55">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="font-mono mt-20 flex flex-col gap-3 border-t hairline pt-8 text-[10px] uppercase tracking-[0.28em] text-bone/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} — SIRET {site.legal.siret}
          </p>
          <p>
            Hébergé par {site.legal.host.name} —{" "}
            <span className="hidden sm:inline">{site.legal.host.address}</span>
          </p>
          <p>
            <a
              href="/admin"
              className="text-bone/55 hover:text-ivory"
              aria-label="Espace gestion"
            >
              Espace gestion ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
