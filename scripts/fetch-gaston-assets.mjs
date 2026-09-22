import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

const files = [
  ["https://mrgaston.be/wp-content/uploads/2024/06/logo_MrGASTON_clean.png", "public/brand/logo.png"],
  [
    "https://mrgaston.be/wp-content/uploads/2024/06/logo-gaston-dine-in-take-awayPlan-de-travail-1.png",
    "public/brand/logo-icon.png",
  ],
  [
    "https://mrgaston.be/wp-content/uploads/2024/06/ardennais_frites_kriek_banner.jpg",
    "public/images/mr-gaston/hero.jpg",
  ],
  [
    "https://mrgaston.be/wp-content/uploads/2024/06/ardennais_frites_kriek_banner.jpg",
    "public/images/mr-gaston/gaston-plate.jpg",
  ],
  [
    "https://mrgaston.be/wp-content/uploads/2024/11/elementaire_frite_poulycroc_coca_biere-scaled.jpg",
    "public/images/mr-gaston/elementaire.jpg",
  ],
  ["https://mrgaston.be/wp-content/uploads/2025/06/maison25.png", "public/images/mr-gaston/maison25.png"],
  ["https://mrgaston.be/wp-content/uploads/2025/06/friture-0525.jpg", "public/images/mr-gaston/friture.jpg"],
  ["https://mrgaston.be/wp-content/uploads/2025/06/bar25.jpg", "public/images/mr-gaston/bar.jpg"],
  [
    "https://mrgaston.be/wp-content/uploads/2024/06/BG-slider-gastonPlan-de-travail-1-1.png",
    "public/images/mr-gaston/slider-bg.png",
  ],
];

async function get(url) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

mkdirSync(join(root, "public/brand"), { recursive: true });
mkdirSync(join(root, "public/images/mr-gaston"), { recursive: true });

for (const [url, dest] of files) {
  try {
    const buf = await get(url);
    const out = join(root, dest);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, buf);
    console.log("ok", dest, buf.length);
  } catch (err) {
    console.error("fail", dest, err.message);
  }
}
