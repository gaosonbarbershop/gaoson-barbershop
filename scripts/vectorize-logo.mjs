import { trace } from "potrace";
import sharp from "sharp";
import { readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/images/logo-gaoson.jpg");
const TMP = path.resolve("public/images/logo-gaoson.tmp.png");
const OUT_SVG = path.resolve("public/images/logo-gaoson.svg");

const KEEP_TMP = process.env.KEEP_TMP === "1";

async function main() {
  const raw = await readFile(SRC);

  // 1. Aggressive preprocess to fully kill the halftone pattern and produce
  //    solid, fillable shapes:
  //    - grayscale + heavy blur to fuse halftone dots
  //    - low threshold to keep more of the strokes
  //    - light blur + harder threshold to smooth edges
  //    - negate (potrace traces dark on light)
  //    - trim the surrounding white/black border so the SVG viewBox hugs the
  //      glyphs (no wasted space when scaling via CSS)
  //    - extend with a small white padding so potrace doesn't clip near edges
  // Source: black bg, white halftone glyphs, plus a thin black frame at
  // the very edge of the JPG. We need to:
  //   1. Crop ~6% off each edge to kill that frame (else potrace traces a
  //      solid rectangle around the entire image).
  //   2. Blur hard so halftone dots fuse into solid shapes.
  //   3. Threshold to pure binary, then negate (potrace traces dark on light).
  //   4. Trim the surrounding white so the SVG viewBox hugs the wordmark.
  const { width = 2340, height = 2340 } = await sharp(raw).metadata();
  const inset = Math.round(Math.min(width, height) * 0.06);

  // Step 1 — binarize + crop the source. Output: black glyphs on white.
  const corePng = await sharp(raw)
    .extract({
      left: inset,
      top: inset,
      width: width - inset * 2,
      height: height - inset * 2,
    })
    .grayscale()
    .blur(12)
    .threshold(100)
    .blur(3)
    .threshold(150)
    .negate()
    .toColourspace("srgb")
    .png()
    .toBuffer();

  // Step 2 — find tight bbox of black pixels, then extract a snug rectangle
  //          so the final viewBox hugs the wordmark.
  const { data, info } = await sharp(corePng)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let maxX = 0;
  let minY = info.height;
  let maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if (data[idx] < 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const m = 40; // margin around glyphs
  const left = Math.max(0, minX - m);
  const top = Math.max(0, minY - m);
  const cropW = Math.min(info.width - left, maxX - minX + 2 * m);
  const cropH = Math.min(info.height - top, maxY - minY + 2 * m);

  const tight = await sharp(corePng)
    .extract({ left, top, width: cropW, height: cropH })
    .png()
    .toBuffer();

  // Step 3 — paste the tight crop onto a pure-white canvas slightly larger
  //          (avoids potrace clipping at the very edges).
  const padding = 80;
  const canvasW = cropW + padding * 2;
  const canvasH = cropH + padding * 2;
  const padded = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: tight, top: padding, left: padding }])
    .png()
    .toBuffer();

  // Step 4 — downsize for potrace.
  await sharp(padded).resize(1800, null, { fit: "inside" }).png().toFile(TMP);

  // 2. Trace with aggressive simplification.
  const svg = await new Promise((resolve, reject) => {
    trace(
      TMP,
      {
        threshold: 128,
        turdSize: 100,
        optTolerance: 1.4,
        alphaMax: 1,
        color: "currentColor",
        background: "transparent",
      },
      (err, out) => (err ? reject(err) : resolve(out)),
    );
  });

  // 3. Strip width/height so the SVG scales freely; add aria-hidden.
  const cleaned = svg
    .replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1")
    .replace(/<svg /, '<svg aria-hidden="true" ');

  await writeFile(OUT_SVG, cleaned, "utf8");
  if (!KEEP_TMP) await unlink(TMP).catch(() => {});

  console.log(`OK → ${OUT_SVG} (${(cleaned.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
