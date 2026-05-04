import { trace } from "potrace";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/images/logo-gaoson.jpg");
const TMP = path.resolve("public/images/logo-gaoson.tmp.png");
const OUT_SVG = path.resolve("public/images/logo-gaoson.svg");

async function main() {
  const raw = await readFile(SRC);

  // 1. Préprocess : grayscale + heavy blur (×2 passes) to merge halftone dots
  //    into solid shapes, then strong threshold to pure black/white. The
  //    successive blurs act like a morphological closing.
  await sharp(raw)
    .grayscale()
    .blur(6)
    .threshold(120)
    .blur(2)
    .threshold(180)
    .negate()
    .resize(1200, 1200, { fit: "inside" })
    .png()
    .toFile(TMP);

  // 2. Vectorize with potrace (path optimisé, agressif).
  const svg = await new Promise((resolve, reject) => {
    trace(
      TMP,
      {
        threshold: 128,
        turdSize: 80,
        optTolerance: 1.2,
        alphaMax: 1,
        color: "currentColor",
        background: "transparent",
      },
      (err, out) => (err ? reject(err) : resolve(out)),
    );
  });

  // 3. Strip width/height attributes so the SVG scales freely via CSS.
  const cleaned = svg
    .replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1")
    .replace(/<svg /, '<svg aria-hidden="true" ');

  await writeFile(OUT_SVG, cleaned, "utf8");
  console.log(`OK → ${OUT_SVG} (${(cleaned.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
