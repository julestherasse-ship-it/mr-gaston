import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "public/images/mr-gaston");
const brandDir = join(root, "public/brand");
mkdirSync(outDir, { recursive: true });
mkdirSync(brandDir, { recursive: true });

function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(0, 0);
  entry.writeUInt8(0, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

const plate = join(outDir, "gaston-plate.jpg");
const elementaire = join(outDir, "elementaire.jpg");
const slider = join(outDir, "slider-bg.png");
const logoPath = join(brandDir, "logo.png");

await sharp(plate)
  .rotate()
  .resize(1920, 1280, { fit: "cover", position: "centre" })
  .webp({ quality: 80 })
  .toFile(join(outDir, "hero-plate.webp"));

await sharp(plate)
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(join(outDir, "gaston-plate.webp"));

await sharp(elementaire)
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(join(outDir, "elementaire.webp"));

await sharp(slider)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(join(outDir, "slider-bg.webp"));

const sliderMeta = await sharp(slider).metadata();
const burgerLeft = Math.round((sliderMeta.width ?? 1600) * 0.5);
await sharp(slider)
  .extract({
    left: burgerLeft,
    top: 0,
    width: (sliderMeta.width ?? 1600) - burgerLeft,
    height: sliderMeta.height ?? 900,
  })
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(join(outDir, "burger.webp"));

await sharp(plate)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 84 })
  .toFile(join(root, "public/og.jpg"));

const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 10) continue;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  if (sat > 0.32 && max > 90) continue;
  data[i] = 250;
  data[i + 1] = 246;
  data[i + 2] = 239;
}

const lightLogo = join(brandDir, "logo-light.png");
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).png().toFile(lightLogo);

await sharp(logoPath)
  .resize(256, 256, { fit: "contain", background: { r: 243, g: 235, b: 224, alpha: 1 } })
  .flatten({ background: { r: 243, g: 235, b: 224 } })
  .png()
  .toFile(join(brandDir, "favicon.png"));

await sharp(logoPath)
  .resize(180, 180, { fit: "contain", background: { r: 243, g: 235, b: 224, alpha: 1 } })
  .flatten({ background: { r: 243, g: 235, b: 224 } })
  .png()
  .toFile(join(brandDir, "apple-touch-icon.png"));

const favPng = await sharp(logoPath)
  .resize(48, 48, { fit: "contain", background: { r: 20, g: 19, b: 18, alpha: 1 } })
  .flatten({ background: { r: 20, g: 19, b: 18 } })
  .png()
  .toBuffer();

writeFileSync(join(root, "public/favicon.ico"), pngToIco(favPng));

console.log("gaston images processed");
