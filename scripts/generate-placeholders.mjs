/**
 * Generates elegant, palette-matched SVG photo placeholders into /public/photos.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Each file is named after the PHOTO_PLACEHOLDER_XX label used in lib/content.ts,
 * so the layout looks finished before any real photos are added. To use a real
 * photo: drop it in /public/photos and point the matching `src` in content.ts at it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "photos");
mkdirSync(outDir, { recursive: true });

// Warm/romantic gradient pairs rotated across the placeholders for variety.
const GRADIENTS = [
  ["#161d45", "#3a2150"],
  ["#0f1330", "#24306b"],
  ["#241b48", "#5a3a5e"],
  ["#10162e", "#4a2f4f"],
  ["#1a2150", "#603a4a"],
  ["#0f1330", "#3a2a5e"],
];
const ACCENTS = ["#f4c982", "#e9a6bd", "#b7a4ec", "#ffe3ad"];

function svg(label, index) {
  const [c1, c2] = GRADIENTS[index % GRADIENTS.length];
  const accent = ACCENTS[index % ACCENTS.length];
  const w = 1200;
  const h = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.3" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <!-- soft sparkles -->
  ${Array.from({ length: 18 })
    .map(() => {
      const x = Math.round(Math.random() * w);
      const y = Math.round(Math.random() * h);
      const r = (Math.random() * 2 + 1).toFixed(1);
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#f5f1ea" opacity="${(Math.random() * 0.5 + 0.2).toFixed(2)}"/>`;
    })
    .join("\n  ")}
  <!-- frame -->
  <rect x="${w / 2 - 230}" y="${h / 2 - 150}" width="460" height="300" rx="24"
        fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
  <!-- icon: a house for the future-home placeholders, otherwise a heart -->
  ${
    label.includes("HOUSE")
      ? `<g transform="translate(${w / 2 - 34},${h / 2 - 104}) scale(2.0)" fill="${accent}" opacity="0.9">
    <path d="M17 2 L32 14 L29 14 L29 30 L20 30 L20 21 L14 21 L14 30 L5 30 L5 14 L2 14 Z"/>
  </g>`
      : `<path transform="translate(${w / 2 - 18},${h / 2 - 96}) scale(1.4)"
        d="M18 30 C 4 18, 4 6, 12 4 C 16 3, 18 6, 18 8 C 18 6, 20 3, 24 4 C 32 6, 32 18, 18 30 Z"
        fill="${accent}" opacity="0.85"/>`
  }
  <text x="50%" y="${h / 2 + 20}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="34"
        fill="#f5f1ea" letter-spacing="3">${label}</text>
  <text x="50%" y="${h / 2 + 68}" text-anchor="middle"
        font-family="Georgia, serif" font-size="20" fill="#a9b0cf" letter-spacing="2">
    drop your photo here
  </text>
</svg>`;
}

const labels = [];
for (let i = 1; i <= 13; i++) {
  labels.push(`PHOTO_PLACEHOLDER_${String(i).padStart(2, "0")}`);
}
labels.push("PHOTO_PLACEHOLDER_FINAL");
// Our future home — the locked surprise at the end of the page.
for (let i = 1; i <= 4; i++) {
  labels.push(`PHOTO_PLACEHOLDER_HOUSE_${String(i).padStart(2, "0")}`);
}

labels.forEach((label, i) => {
  writeFileSync(join(outDir, `${label}.svg`), svg(label, i));
});

console.log(`Generated ${labels.length} placeholder SVGs in public/photos/`);
