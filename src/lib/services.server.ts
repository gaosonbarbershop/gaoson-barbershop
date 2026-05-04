import "server-only";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { ServiceGroup } from "./services";

const SERVICES_PATH = path.join(process.cwd(), "content", "services.yml");

type RawServices = {
  groups: {
    title: string;
    caption: string;
    items: {
      name: string;
      price: string;
      duration: string;
      description?: string;
    }[];
  }[];
};

let cached: ServiceGroup[] | null = null;

export function getServiceGroups(): ServiceGroup[] {
  if (cached) return cached;

  const raw = yaml.load(fs.readFileSync(SERVICES_PATH, "utf8")) as RawServices;
  cached = raw.groups.map((g) => ({
    title: g.title,
    caption: g.caption,
    items: g.items.map((i) => ({
      name: i.name,
      price: i.price,
      duration: i.duration,
      description: i.description?.trim() || undefined,
    })),
  }));

  return cached;
}
