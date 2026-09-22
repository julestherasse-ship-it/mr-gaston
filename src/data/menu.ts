export type MenuCategory =
  | "burgers"
  | "menus"
  | "mitraillettes"
  | "snacks"
  | "frites"
  | "bar";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tag?: string;
  vegetarian?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface MenuCategoryData {
  id: MenuCategory;
  label: string;
  intro?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategoryData[] = [
  {
    id: "burgers",
    label: "Burgers",
    intro:
      "Des burgers élaborés à base de produits frais issus de commerces locaux.",
    items: [
      {
        id: "b-gaston",
        name: "Le Gaston",
        description:
          "Pain brioché, steak de bœuf haché, fromage d'Abbaye, jambon d'Ardennes, crudités et sauce Gaston.",
        price: "11,90 €",
        tag: "Signature",
        image: "/images/mr-gaston/gaston-plate.webp",
        imageAlt: "Le Gaston : burger, frites et Kriek chez Mr Gaston à Mons",
      },
      {
        id: "b-carcassonne",
        name: "Le Carcassonne",
        description:
          "Pain brioché, steak de bœuf haché, chorizo, poivrons grillés, roquette et sauce Carcassonne.",
        price: "11,90 €",
      },
      {
        id: "b-poivre",
        name: "Le Poivre",
        description:
          "Pain brioché, steak de bœuf haché, cheddar vintage, lard grillé, crudités et sauce au poivre.",
        price: "11,90 €",
      },
      {
        id: "b-longtarin",
        name: "Le Longtarin",
        description:
          "Pain brioché, escalope de dinde panée, pancetta grillée, cheddar vintage, sauce Longtarin, salade et oignon rouge.",
        price: "11,90 €",
      },
      {
        id: "b-abbe",
        name: "L'Abbé",
        description:
          "Pain brioché, steak de bœuf haché, fromage de Chimay, crudités et sauce Gaston.",
        price: "10,90 €",
      },
      {
        id: "b-elementaire",
        name: "L'élémentaire",
        description:
          "Pain brioché, steak de bœuf haché, crudités et sauce Gaston.",
        price: "9,90 €",
        image: "/images/mr-gaston/elementaire.webp",
        imageAlt: "L'élémentaire : burger, frites et snacks chez Mr Gaston à Mons",
      },
      {
        id: "b-jeanne",
        name: "Le M'zelle Jeanne",
        description:
          "Pain brioché, burger végétarien aux pois chiches, crudités et sauce Gaston.",
        price: "9,90 €",
        tag: "Végétarien",
        vegetarian: true,
      },
      {
        id: "b-base",
        name: "La Base",
        description: "Pain brioché, steak de bœuf haché et sauce au choix.",
        price: "6,50 €",
      },
    ],
  },
  {
    id: "menus",
    label: "Menus",
    intro:
      "Burger, petite portion de frites et une sauce au choix.",
    items: [
      {
        id: "m-gaston",
        name: "Gaston + frites",
        description: "Le Gaston, petite frites et sauce au choix.",
        price: "14,90 €",
        tag: "Le plus demandé",
        image: "/images/mr-gaston/gaston-plate.webp",
        imageAlt: "Le Gaston : burger, frites et Kriek chez Mr Gaston à Mons",
      },
      {
        id: "m-carcassonne",
        name: "Carcassonne + frites",
        description: "Le Carcassonne, petite frites et sauce au choix.",
        price: "14,90 €",
      },
      {
        id: "m-poivre",
        name: "Poivre + frites",
        description: "Le Poivre, petite frites et sauce au choix.",
        price: "14,90 €",
      },
      {
        id: "m-longtarin",
        name: "Longtarin + frites",
        description: "Le Longtarin, petite frites et sauce au choix.",
        price: "14,90 €",
      },
      {
        id: "m-abbe",
        name: "L'Abbé + frites",
        description: "L'Abbé, petite frites et sauce au choix.",
        price: "13,40 €",
      },
      {
        id: "m-elementaire",
        name: "L'élémentaire + frites",
        description: "L'élémentaire, petite frites et sauce au choix.",
        price: "12,40 €",
        image: "/images/mr-gaston/elementaire.webp",
        imageAlt: "L'élémentaire : burger, frites et snacks chez Mr Gaston à Mons",
      },
      {
        id: "m-jeanne",
        name: "M'zelle Jeanne + frites",
        description: "Le M'zelle Jeanne, petite frites et sauce au choix.",
        price: "12,90 €",
        vegetarian: true,
      },
      {
        id: "m-base",
        name: "La Base + frites",
        description: "La Base, petite frites et sauce au choix.",
        price: "9,50 €",
      },
      {
        id: "m-enfant",
        name: "Menu enfant",
        description:
          "Petite frite et sa sauce, un snack du boucher et une boisson. Moins de 10 ans.",
        price: "9,90 €",
        tag: "< 10 ans",
      },
      {
        id: "m-gigaston",
        name: "Le Gigaston",
        description: "Le lundi et le mardi — la Giga Dalle de Mr Gaston.",
        price: "20,00 €",
        tag: "Lundi & mardi",
      },
    ],
  },
  {
    id: "mitraillettes",
    label: "Mitraillettes",
    intro:
      "Demi-baguette, belle portion de frites et une sauce au choix.",
    items: [
      {
        id: "mi-gaston",
        name: "Mitraillette Gaston",
        description:
          "Steak de bœuf haché, fromage d'Abbaye, jambon d'Ardennes, crudités et sauce Gaston.",
        price: "13,90 €",
        tag: "Maison",
      },
      {
        id: "mi-carcassonne",
        name: "Mitraillette Carcassonne",
        description:
          "Steak de bœuf haché, chorizo, poivrons grillés, roquette et sauce Carcassonne.",
        price: "13,90 €",
      },
      {
        id: "mi-poivre",
        name: "Mitraillette Poivre",
        description:
          "Steak de bœuf haché, cheddar vintage, lard grillé, crudités et sauce au poivre.",
        price: "13,90 €",
      },
      {
        id: "mi-longtarin",
        name: "Mitraillette Longtarin",
        description:
          "Escalope de dinde panée, pancetta, cheddar vintage, sauce Longtarin, salade et oignon rouge.",
        price: "13,90 €",
      },
      {
        id: "mi-abbe",
        name: "Mitraillette Abbé",
        description:
          "Steak de bœuf haché, fromage de Chimay, crudités et sauce Gaston.",
        price: "13,40 €",
      },
      {
        id: "mi-elementaire",
        name: "Mitraillette élémentaire",
        description: "Steak de bœuf haché, crudités et sauce Gaston.",
        price: "12,90 €",
      },
      {
        id: "mi-jeanne",
        name: "Mitraillette M'zelle Jeanne",
        description: "Burger végétarien aux pois chiches, crudités et sauce Gaston.",
        price: "12,90 €",
        vegetarian: true,
      },
      {
        id: "mi-base",
        name: "Mitraillette La Base",
        description: "Steak de bœuf haché et sauce au choix.",
        price: "9,90 €",
      },
      {
        id: "mi-boeuf",
        name: "Mitraillette brochette de bœuf",
        description: "Brochette de bœuf, salade, carottes râpées, oignons secs et cornichons.",
        price: "9,50 €",
      },
      {
        id: "mi-poulet",
        name: "Mitraillette brochette de poulet",
        description: "Brochette de poulet, salade, carottes râpées, oignons secs et cornichons.",
        price: "9,50 €",
      },
      {
        id: "mi-cervelas",
        name: "Mitraillette cervelas cheval fumé",
        description: "Cervelas de cheval, salade, carottes râpées, oignons secs et cornichons.",
        price: "7,20 €",
      },
      {
        id: "mi-boulette",
        name: "Mitraillette boulette maison",
        description: "Boulette maison, salade, carottes râpées, oignons secs et cornichons.",
        price: "7,00 €",
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    intro: "Snacks préparés par nos bouchers partenaires.",
    items: [
      {
        id: "s-boulette",
        name: "Boulette maison",
        description: "Préparée par notre partenaire boucher.",
        price: "4,20 €",
      },
      {
        id: "s-cervelas-cheval",
        name: "Cervelas de cheval",
        description: "Artisanat Boucherie ABC.",
        price: "4,50 €",
      },
      {
        id: "s-cervelas-porc",
        name: "Cervelas de porc",
        description: "Artisanat Boucherie ABC.",
        price: "4,50 €",
      },
      {
        id: "s-brochette-poulet",
        name: "Brochette de poulet",
        description: "Brochette marinée, Boucherie ABC.",
        price: "4,50 €",
      },
      {
        id: "s-brochette-boeuf",
        name: "Brochette de bœuf",
        description: "Brochette marinée, Boucherie ABC.",
        price: "4,90 €",
      },
      {
        id: "s-fricadelle",
        name: "Fricadelle",
        description: "Fritkot.",
        price: "2,20 €",
      },
      {
        id: "s-poulycroc",
        name: "Poulycroc",
        description: "Fritkot.",
        price: "3,00 €",
      },
      {
        id: "s-mexicanos",
        name: "Mexicanos",
        description: "Fritkot.",
        price: "3,00 €",
      },
      {
        id: "s-nuggets",
        name: "Nuggets",
        description: "Fritkot.",
        price: "4,50 €",
      },
      {
        id: "s-cervelas-chasseur",
        name: "Cervelas chasseur",
        description: "Fritkot.",
        price: "4,00 €",
      },
      {
        id: "s-burger",
        name: "Burger fritkot",
        description: "Fritkot.",
        price: "5,50 €",
      },
      {
        id: "s-burger-dinde",
        name: "Burger dinde",
        description: "Fritkot.",
        price: "6,00 €",
      },
    ],
  },
  {
    id: "frites",
    label: "Frites & sauces",
    intro:
      "Frites fraîches cuites dans une graisse de bœuf contrôlée quotidiennement.",
    items: [
      { id: "f-petite", name: "Petite", description: "Portion de frites.", price: "3,00 €" },
      { id: "f-grande", name: "Grande", description: "Portion de frites.", price: "4,00 €", tag: "Classique" },
      {
        id: "sa-gaston",
        name: "Sauce Gaston",
        description: "Mayo, cornichons, oignons, paprika, ail.",
        price: "1,00 €",
        tag: "Maison",
      },
      {
        id: "sa-carcassonne",
        name: "Sauce Carcassonne",
        description: "Mayo, ail, thym et romarin.",
        price: "1,00 €",
        tag: "Maison",
      },
      {
        id: "sa-longtarin",
        name: "Sauce Longtarin",
        description: "Mayo pimentée, paprika, ail.",
        price: "1,00 €",
        tag: "Maison",
      },
      { id: "sa-mayo", name: "Mayo", description: "Sauce.", price: "0,90 €" },
      { id: "sa-andalouse", name: "Andalouse", description: "Sauce.", price: "0,90 €" },
      { id: "sa-samourai", name: "Samouraï", description: "Sauce.", price: "0,90 €" },
      { id: "sa-brazil", name: "Brazil", description: "Sauce.", price: "0,90 €" },
      { id: "sa-poivre", name: "Sauce poivre", description: "Sauce.", price: "0,90 €" },
      { id: "sa-tartare", name: "Tartare", description: "Sauce.", price: "0,90 €" },
      { id: "sa-bbq", name: "Barbecue", description: "Sauce.", price: "0,90 €" },
      { id: "sa-aioli", name: "Aïoli", description: "Sauce.", price: "0,90 €" },
      { id: "sa-bearnaise", name: "Béarnaise", description: "Sauce.", price: "0,90 €" },
      { id: "sa-truffe", name: "Mayo truffe", description: "Sauce.", price: "0,90 €" },
    ],
  },
  {
    id: "bar",
    label: "Au bar",
    intro: "Softs, eaux et une sélection de bières locales.",
    items: [
      { id: "d-jupiler", name: "Jupiler 33 cl", description: "Bière.", price: "2,50 €" },
      { id: "d-vedett", name: "Vedett IPA", description: "Bière.", price: "4,50 €" },
      { id: "d-orval", name: "Orval", description: "Bière d'abbaye.", price: "5,00 €" },
      { id: "d-duvel", name: "Duvel", description: "Bière.", price: "4,80 €" },
      { id: "d-chimay", name: "Chimay Dorée", description: "Bière d'abbaye.", price: "4,00 €" },
      { id: "d-liefmans", name: "Liefmans", description: "Bière.", price: "4,50 €" },
      { id: "d-jup0", name: "Jupiler 0%", description: "Bière sans alcool.", price: "2,50 €" },
      { id: "d-coca", name: "Coca-Cola", description: "Regular ou zéro.", price: "2,50 €" },
      { id: "d-fanta", name: "Fanta orange", description: "Soft.", price: "2,50 €" },
      { id: "d-sprite", name: "Sprite", description: "Soft.", price: "2,50 €" },
      { id: "d-tropico", name: "Tropico", description: "Soft.", price: "2,50 €" },
      { id: "d-capri", name: "Capri-Sun", description: "Soft.", price: "2,00 €" },
      { id: "d-eau", name: "Eau plate ou pétillante", description: "Soft.", price: "2,00 €" },
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
  if (item.vegetarian) return "Végétarien";
  return undefined;
}
