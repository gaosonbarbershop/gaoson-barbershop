import "server-only";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Site } from "./site";

const SITE_PATH = path.join(process.cwd(), "content", "site.yml");

type RawSite = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  hours: { days: string; time: string }[];
  links: { booksy: string; instagram: string; googleMaps: string };
  legal: { siret: string; hostName: string; hostAddress: string };
  elfsightWidgetId: string;
};

let cached: Site | null = null;

export function getSite(): Site {
  if (cached) return cached;

  const raw = yaml.load(fs.readFileSync(SITE_PATH, "utf8")) as RawSite;

  cached = {
    name: raw.name,
    shortName: raw.shortName,
    tagline: raw.tagline,
    description: raw.description,
    address: {
      ...raw.address,
      full: `${raw.address.street}, ${raw.address.postalCode} ${raw.address.city}`,
    },
    hours: raw.hours,
    links: raw.links,
    legal: {
      siret: raw.legal.siret,
      host: { name: raw.legal.hostName, address: raw.legal.hostAddress },
    },
    elfsightWidgetId: raw.elfsightWidgetId,
  };

  return cached;
}
