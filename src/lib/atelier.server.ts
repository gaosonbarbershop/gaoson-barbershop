import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AtelierTile } from "./atelier";

const DIR = path.join(process.cwd(), "content", "atelier");

export function getAtelierTiles(): AtelierTile[] {
  if (!fs.existsSync(DIR)) return [];

  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file): AtelierTile => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        image: String(data.image ?? ""),
        alt: String(data.alt ?? ""),
        caption: String(data.caption ?? ""),
        size: (data.size as AtelierTile["size"]) ?? "medium",
        order: typeof data.order === "number" ? data.order : 999,
      };
    })
    .sort((a, b) => a.order - b.order);
}
