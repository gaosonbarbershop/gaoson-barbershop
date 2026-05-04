import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Sneaker, SneakerStatus } from "./sneakers";

const CONTENT_DIR = path.join(process.cwd(), "content", "sneakers");

export function getAllSneakers(): Sneaker[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const items = files.map((file): Sneaker => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      brand: String(data.brand ?? ""),
      model: String(data.model ?? ""),
      size: String(data.size ?? ""),
      condition: String(data.condition ?? "Neuf"),
      price:
        typeof data.price === "number"
          ? data.price
          : data.price
            ? Number(data.price)
            : null,
      status: (data.status as SneakerStatus) ?? "available",
      image: String(data.image ?? "/images/sneakers/placeholder-1.svg"),
      description: content.trim() || undefined,
      order: typeof data.order === "number" ? data.order : 999,
    };
  });

  return items.sort((a, b) => a.order - b.order);
}
