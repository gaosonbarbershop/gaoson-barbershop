import opentype from "opentype.js";
import { readFileSync, writeFileSync } from "node:fs";

const font = opentype.parse(readFileSync("/tmp/unif.ttf").buffer);
const glyph = font.charToGlyph("G");

const fontSize = 100;
const path = glyph.getPath(0, fontSize, fontSize);
const bbox = path.getBoundingBox();
const w = bbox.x2 - bbox.x1;
const h = bbox.y2 - bbox.y1;
const pathD = path.toPathData(2);

const SIZE = 64;
const PAD = 8;
const target = SIZE - PAD * 2;
const scale = Math.min(target / w, target / h);
const offsetX = (SIZE - w * scale) / 2 - bbox.x1 * scale;
const offsetY = (SIZE - h * scale) / 2 - bbox.y1 * scale;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="10" fill="#050505"/>
  <g transform="translate(${offsetX.toFixed(2)} ${offsetY.toFixed(2)}) scale(${scale.toFixed(4)})">
    <path d="${pathD}" fill="#f5f1e8"/>
  </g>
</svg>
`;

writeFileSync("public/favicon.svg", svg);
console.log(
  `OK → public/favicon.svg (${(svg.length / 1024).toFixed(1)} KB, glyph ${w.toFixed(1)}×${h.toFixed(1)})`,
);
