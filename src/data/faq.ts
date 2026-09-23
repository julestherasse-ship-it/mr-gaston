import { siteConfig } from "@/data/site";
import { formatSlots, openingHours } from "@/data/hours";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const hoursSummary = openingHours
  .map((day) => `${day.day} : ${formatSlots(day)}`)
  .join(". ");

export const faqItems: FaqItem[] = [
  {
    id: "commander",
    question: "Comment commander ?",
    answer: `En ligne sur la carte, ou par téléphone au ${siteConfig.phone}. Sur place et à emporter.`,
  },
  {
    id: "adresse",
    question: "Où se trouve Mr Gaston ?",
    answer: `Chaussée de Binche 141, 7000 Mons, Belgique.`,
  },
  {
    id: "horaires",
    question: "Quels sont les horaires ?",
    answer: `${hoursSummary}.`,
  },
  {
    id: "carte",
    question: "Que propose la carte ?",
    answer:
      "Burgers signatures, snacks, snacks du boucher, frites, sauces, suppléments, et une carte au bar. La commande en ligne reprend la carte du moment.",
  },
  {
    id: "sur-place",
    question: "Peut-on manger sur place ?",
    answer: "Oui. On peut manger sur place, emporter, ou commander en ligne.",
  },
];
