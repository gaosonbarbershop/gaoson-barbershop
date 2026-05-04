import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Manifesto } from "./manifesto";

const MANIFESTO_PATH = path.join(process.cwd(), "content", "manifesto.md");

let cached: Manifesto | null = null;

export function getManifesto(): Manifesto {
  if (cached) return cached;

  const raw = fs.readFileSync(MANIFESTO_PATH, "utf8");
  const { data } = matter(raw);
  cached = data as Manifesto;
  return cached;
}
