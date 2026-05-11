/**
 * Resize/compress hero carousel JPEGs (run locally before commit).
 * Usage: node scripts/optimize-hero-images.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const FILES = [
  "IMG_1580.jpg",
  "IMG_1582.jpg",
  "IMG_1586.jpg",
  "IMG_1588.jpg",
];

async function main() {
  const dir = path.join(__dirname, "..", "public", "images");

  for (const name of FILES) {
    const input = path.join(dir, name);
    if (!fs.existsSync(input)) {
      console.warn("Skip (missing):", input);
      continue;
    }
    const tmp = `${input}.tmp`;
    await sharp(input)
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(tmp);
    fs.renameSync(tmp, input);
    const stat = fs.statSync(input);
    console.log(name, "→", Math.round(stat.size / 1024), "KiB");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
