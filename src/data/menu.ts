import { existsSync } from "node:fs";
import { join } from "node:path";

export type MenuCategory =
  | "burgers"
  | "snacks"
  | "boucher"
  | "frites"
  | "sauces"
  | "supplements"
  | "bar";

export interface MenuFormat {
  label: string;
  price: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  formats?: MenuFormat[];
  note?: string;
  tag?: string;
  vegetarian?: boolean;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface MenuCategoryData {
  id: MenuCategory;
  label: string;
  intro?: string;
  items: MenuItem[];
}

const IMAGE_DIR = join(process.cwd(), "public", "images", "mr-gaston");

function dishImage(stems: string[], alt: string): Pick<MenuItem, "image" | "imageAlt"> {
  const extensions = [".webp", ".jpg", ".jpeg", ".png"];
  for (const stem of stems) {
    for (const ext of extensions) {
      const filename = `${stem}${ext}`;
      if (existsSync(join(IMAGE_DIR, filename))) {
        return { image: `/images/mr-gaston/${filename}`, imageAlt: alt };
      }
    }
  }
  return {};
}

function formats(...pairs: [string, string][]): MenuFormat[] {
  return pairs.map(([label, price]) => ({ label, price }));
}

const burger = (burgerPrice: string, pain: string, mitraillette: string) =>
  formats(["Burger", burgerPrice], ["Pain", pain], ["Mitraillette", mitraillette]);

const snack = (viande: string, pain?: string, mitraillette?: string) => {
  const rows: [string, string][] = [["Viande", viande]];
  if (pain) rows.push(["Pain", pain]);
  if (mitraillette) rows.push(["Mitraillette", mitraillette]);
  return formats(...rows);
};

export const menuCategories: MenuCategoryData[] = [
  {
    id: "burgers",
    label: "Burgers signatures",
    items: [
      {
        id: "b-poivre",
        name: "Poivré",
        description:
          "Burger de bœuf, sauce poivre, salade, chou, oignons rissolés, lard, cheddar vintage.",
        price: "11,90 €",
        formats: burger("11,90 €", "11,90 €", "14,90 €"),
        tag: "À découvrir",
        featured: true,
        ...dishImage(["poivre", "poivré"], "Burger Poivré de Mr Gaston"),
      },
      {
        id: "b-gaston",
        name: "Gaston",
        description:
          "Burger de bœuf, sauce Gaston, salade, oignons secs, carottes, cornichon, fromage d'abbaye, jambon d'Ardenne.",
        price: "11,90 €",
        formats: burger("11,90 €", "11,90 €", "14,90 €"),
        ...dishImage(["gaston-plate", "gaston"], "Burger Gaston"),
      },
      {
        id: "b-abbe",
        name: "Abbé",
        description:
          "Burger de bœuf, sauce Gaston, salade, oignons secs, carottes, cornichon, fromage d'abbaye.",
        price: "10,90 €",
        formats: burger("10,90 €", "10,90 €", "13,90 €"),
        ...dishImage(["abbe", "abbé"], "Burger Abbé"),
      },
      {
        id: "b-longtarin",
        name: "Longtarin",
        description:
          "Escalope de dinde, sauce Longtarin, salade, oignons rouges, lard, cheddar vintage.",
        price: "11,90 €",
        formats: burger("11,90 €", "11,90 €", "14,90 €"),
        ...dishImage(["longtarin"], "Burger Longtarin"),
      },
      {
        id: "b-jeanne",
        name: "M'zelle Jeanne",
        description:
          "Burger de pois chiches, sauce Gaston, salade, oignons secs, carottes, cornichon.",
        price: "9,90 €",
        formats: burger("9,90 €", "9,90 €", "12,90 €"),
        vegetarian: true,
        ...dishImage(["jeanne", "mzelle-jeanne", "m-zelle-jeanne"], "Burger M'zelle Jeanne"),
      },
      {
        id: "b-carcassonne",
        name: "Carcassonne",
        description: "Burger de bœuf, sauce Carcassonne, roquette, poivrons rouges, chorizo.",
        price: "11,90 €",
        formats: burger("11,90 €", "11,90 €", "14,90 €"),
        ...dishImage(["carcassonne"], "Burger Carcassonne"),
      },
      {
        id: "b-elementaire",
        name: "Élémentaire",
        description:
          "Burger de bœuf, sauce Gaston, salade, oignons secs, carottes, cornichon.",
        price: "9,90 €",
        formats: burger("9,90 €", "9,90 €", "12,90 €"),
        ...dishImage(["elementaire", "élémentaire"], "Burger Élémentaire"),
      },
      {
        id: "b-base",
        name: "Base",
        description: "Compose ton burger de bœuf.",
        price: "7,00 €",
        formats: burger("7,00 €", "7,00 €", "10,00 €"),
        note: "+ frites : 3,00 €",
        ...dishImage(["base"], "Burger Base"),
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    items: [
      {
        id: "s-fricandelle",
        name: "Fricandelle",
        description: "",
        price: "2,50 €",
        formats: snack("2,50 €", "5,50 €", "8,50 €"),
      },
      {
        id: "s-poulycroc",
        name: "Poulycroc",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-mexicanos",
        name: "Mexicanos",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-cervelas",
        name: "Cervelas",
        description: "",
        price: "4,00 €",
        formats: snack("4,00 €", "7,00 €", "10,00 €"),
      },
      {
        id: "s-nuggets",
        name: "Nuggets/Fingers",
        description: "",
        price: "4,50 €",
        formats: snack("4,50 €", "7,50 €", "10,50 €"),
      },
      {
        id: "s-viandelle",
        name: "Viandelle",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-cheese-crack",
        name: "Cheese Crack",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-brochette-porc",
        name: "Brochette de porc",
        description: "",
        price: "4,00 €",
        formats: snack("4,00 €", "7,00 €", "10,00 €"),
      },
      {
        id: "s-pilons",
        name: "Pilons de poulet",
        description: "",
        price: "5,00 €",
        formats: snack("5,00 €"),
      },
      {
        id: "s-burger-porc",
        name: "Burger de porc",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-burger-dinde",
        name: "Burger de dinde",
        description: "",
        price: "3,00 €",
        formats: snack("3,00 €", "6,00 €", "9,00 €"),
      },
      {
        id: "s-ravier-kebab",
        name: "Ravier kebab",
        description: "",
        price: "5,00 €",
        formats: snack("5,00 €", "8,00 €", "11,00 €"),
      },
      {
        id: "s-lucifer",
        name: "Lucifer",
        description: "",
        price: "4,50 €",
        formats: snack("4,50 €", "7,50 €", "10,50 €"),
      },
      {
        id: "s-brochette-ardennaise",
        name: "Brochette ardennaise",
        description: "",
        price: "4,00 €",
        formats: snack("4,00 €", "7,00 €", "10,00 €"),
      },
    ],
  },
  {
    id: "boucher",
    label: "Snacks du boucher",
    items: [
      {
        id: "sb-cervelas-cheval",
        name: "Cervelas de cheval",
        description: "",
        price: "5,00 €",
        formats: snack("5,00 €", "8,00 €", "11,00 €"),
      },
      {
        id: "sb-brochette-boeuf",
        name: "Brochette de bœuf",
        description: "",
        price: "5,00 €",
        formats: snack("5,00 €", "8,00 €", "11,00 €"),
      },
      {
        id: "sb-brochette-poulet",
        name: "Brochette poulet",
        description: "",
        price: "5,00 €",
        formats: snack("5,00 €", "8,00 €", "11,00 €"),
      },
      {
        id: "sb-boulette",
        name: "Boulette maison",
        description: "",
        price: "4,50 €",
        formats: snack("4,50 €", "7,50 €", "10,50 €"),
      },
    ],
  },
  {
    id: "frites",
    label: "Frites",
    items: [
      { id: "f-petite", name: "Petite", description: "", price: "3,50 €" },
      { id: "f-grande", name: "Grande", description: "", price: "4,50 €" },
      { id: "f-pain", name: "Pain frites", description: "", price: "6,50 €" },
    ],
  },
  {
    id: "sauces",
    label: "Sauces",
    items: [
      { id: "sa-gaston", name: "Gaston", description: "", price: "1,00 €", tag: "Maison" },
      { id: "sa-longtarin", name: "Longtarin", description: "", price: "1,00 €", tag: "Maison" },
      { id: "sa-carcassonne", name: "Carcassonne", description: "", price: "1,00 €", tag: "Maison" },
      { id: "sa-andalouse", name: "Andalouse", description: "", price: "0,90 €" },
      { id: "sa-aioli", name: "Aioli", description: "", price: "0,90 €" },
      { id: "sa-americaine", name: "Américaine douce/forte", description: "", price: "0,90 €" },
      { id: "sa-algerienne", name: "Algérienne", description: "", price: "0,90 €" },
      { id: "sa-bbq", name: "Barbecue", description: "", price: "0,90 €" },
      { id: "sa-brazil", name: "Brazil", description: "", price: "0,90 €" },
      { id: "sa-bicky", name: "Bicky 3", description: "", price: "0,90 €" },
      { id: "sa-cocktail", name: "Cocktail", description: "", price: "0,90 €" },
      { id: "sa-dallas", name: "Dallas", description: "", price: "0,90 €" },
      { id: "sa-giant", name: "Giant", description: "", price: "0,90 €" },
      { id: "sa-hannibal", name: "Hannibal", description: "", price: "0,90 €" },
      { id: "sa-ketchup-curry", name: "Ketchup/curry", description: "", price: "0,90 €" },
      { id: "sa-mayo-truffe", name: "Mayo/truffe", description: "", price: "0,90 €" },
      { id: "sa-mannalouse", name: "Mannalouse", description: "", price: "0,90 €" },
      { id: "sa-poivre", name: "Poivre", description: "", price: "0,90 €" },
      { id: "sa-samourai", name: "Samourai", description: "", price: "0,90 €" },
      { id: "sa-toscane", name: "Toscane", description: "", price: "0,90 €" },
      { id: "sa-tartare", name: "Tartare", description: "", price: "0,90 €" },
      { id: "sa-joppie", name: "Joppie", description: "", price: "0,90 €" },
    ],
  },
  {
    id: "supplements",
    label: "Suppléments",
    items: [
      { id: "x-cheddar", name: "Cheddar", description: "", price: "1,00 €" },
      { id: "x-cheddar-vintage", name: "Cheddar vintage", description: "", price: "2,00 €" },
      { id: "x-feta", name: "Feta", description: "", price: "2,00 €" },
      { id: "x-abbaye", name: "Fromage d'abbaye", description: "", price: "2,00 €" },
      { id: "x-jambon", name: "Jambon d'Ardenne", description: "", price: "2,00 €" },
      { id: "x-lard", name: "Lard", description: "", price: "2,00 €" },
      { id: "x-chorizo", name: "Chorizo", description: "", price: "2,00 €" },
      { id: "x-salade", name: "Salade", description: "", price: "0,70 €" },
      { id: "x-roquette", name: "Roquette", description: "", price: "0,80 €" },
      { id: "x-chou", name: "Chou", description: "", price: "0,80 €" },
      { id: "x-carotte", name: "Carotte", description: "", price: "0,70 €" },
      { id: "x-tomate", name: "Tomate", description: "", price: "0,70 €" },
      { id: "x-oignons-frais", name: "Oignons frais", description: "", price: "0,70 €" },
      { id: "x-oignons-rissoles", name: "Oignons rissolés", description: "", price: "1,00 €" },
      { id: "x-oignons-secs", name: "Oignons secs", description: "", price: "0,70 €" },
      { id: "x-cornichon", name: "Cornichon", description: "", price: "0,70 €" },
      { id: "x-poivron", name: "Poivron rouge", description: "", price: "0,70 €" },
      { id: "x-double-porc", name: "Double viande burger porc", description: "", price: "3,00 €" },
      { id: "x-double-dinde", name: "Double viande burger dinde", description: "", price: "3,00 €" },
      { id: "x-double-boeuf", name: "Double viande burger bœuf", description: "", price: "4,00 €" },
      { id: "x-frites", name: "Frites", description: "", price: "3,00 €" },
      { id: "x-baguette", name: "Baguette", description: "", price: "2,00 €" },
      { id: "x-vidange", name: "Vidange", description: "", price: "1,00 €" },
    ],
  },
  {
    id: "bar",
    label: "Au bar",
    intro: "Softs, eaux et une sélection de bières locales.",
    items: [
      { id: "d-jupiler", name: "Jupiler 33 cl", description: "", price: "2,50 €" },
      { id: "d-vedett", name: "Vedett IPA", description: "", price: "4,50 €" },
      { id: "d-orval", name: "Orval", description: "Bière d'abbaye.", price: "5,00 €" },
      { id: "d-duvel", name: "Duvel", description: "", price: "4,80 €" },
      { id: "d-chimay", name: "Chimay Dorée", description: "Bière d'abbaye.", price: "4,00 €" },
      { id: "d-liefmans", name: "Liefmans", description: "", price: "4,50 €" },
      { id: "d-jup0", name: "Jupiler 0%", description: "Bière sans alcool.", price: "2,50 €" },
      { id: "d-coca", name: "Coca-Cola", description: "Regular ou zéro.", price: "2,50 €" },
      { id: "d-fanta", name: "Fanta orange", description: "", price: "2,50 €" },
      { id: "d-sprite", name: "Sprite", description: "", price: "2,50 €" },
      { id: "d-tropico", name: "Tropico", description: "", price: "2,50 €" },
      { id: "d-capri", name: "Capri-Sun", description: "", price: "2,00 €" },
      { id: "d-eau", name: "Eau plate ou pétillante", description: "", price: "2,00 €" },
    ],
  },
];

const GENERIC_DESCRIPTIONS = new Set(["Sauce.", "Bière.", "Soft."]);

export function displayDescription(description: string) {
  if (!description || GENERIC_DESCRIPTIONS.has(description)) return "";
  return description;
}

export function menuBadge(item: MenuItem) {
  if (item.tag) return item.tag;
  return undefined;
}
