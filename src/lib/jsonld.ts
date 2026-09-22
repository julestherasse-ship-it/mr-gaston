import { siteConfig } from "@/data/site";
import { getSiteOrigin } from "@/lib/site-url";
import { openingHours } from "@/data/hours";
import { displayDescription, menuCategories } from "@/data/menu";
import { images } from "@/data/images";
import { faqItems } from "@/data/faq";

const origin = getSiteOrigin();
const pageUrl = origin;
const businessId = `${origin}/#restaurant`;
const websiteId = `${origin}/#website`;
const webpageId = `${origin}/#webpage`;
const primaryImageId = `${origin}/#primaryimage`;
const logoId = `${origin}/#logo`;
const menuId = `${origin}/#menu`;
const faqId = `${origin}/#faq`;
const carteUrl = `${origin}/#carte`;

function parsePrice(price: string) {
  const value = Number(price.replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

const foodCategoryIds = new Set(["burgers", "menus", "mitraillettes", "snacks", "frites"]);

const prices = menuCategories
  .filter((cat) => foodCategoryIds.has(cat.id))
  .flatMap((cat) => cat.items)
  .map((item) => parsePrice(item.price))
  .filter((value): value is number => value !== undefined && value >= 3);

const priceRange =
  prices.length > 0 ? `€${Math.min(...prices)}–€${Math.max(...prices)}` : undefined;

const openingHoursSpecification = openingHours.flatMap((day) => {
  if (day.closed) return [];
  return day.slots.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day.dayOfWeek}`,
    opens: slot.open,
    closes: slot.close,
  }));
});

const menu = {
  "@type": "Menu",
  "@id": menuId,
  name: "La carte",
  url: carteUrl,
  inLanguage: "fr-BE",
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    ...(category.intro ? { description: category.intro } : {}),
    hasMenuItem: category.items.map((item) => {
      const description = displayDescription(item.description);
      const price = parsePrice(item.price);
      return {
        "@type": "MenuItem",
        name: item.name,
        ...(description ? { description } : {}),
        ...(item.image
          ? {
              image: item.imageAlt
                ? {
                    "@type": "ImageObject",
                    url: `${origin}${item.image}`,
                    contentUrl: `${origin}${item.image}`,
                    caption: item.imageAlt,
                    description: item.imageAlt,
                    inLanguage: "fr-BE",
                  }
                : `${origin}${item.image}`,
            }
          : {}),
        ...(item.vegetarian ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        ...(price
          ? {
              offers: {
                "@type": "Offer",
                price: price.toFixed(2),
                priceCurrency: "EUR",
              },
            }
          : {}),
      };
    }),
  })),
};

const localBusiness = {
  "@type": ["FastFoodRestaurant", "Restaurant"],
  "@id": businessId,
  name: siteConfig.name,
  alternateName: siteConfig.nameDisplay,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  inLanguage: "fr-BE",
  image: [
    { "@id": primaryImageId },
    `${origin}${images.hero}`,
    `${origin}${images.gastonPlate}`,
    `${origin}${images.elementaire}`,
    `${origin}${images.burger}`,
    `${origin}${images.slider}`,
    `${origin}${images.maison}`,
    `${origin}${images.bar}`,
  ],
  logo: { "@id": logoId },
  url: pageUrl,
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  foundingDate: siteConfig.founded,
  servesCuisine: ["Belgian", "Burgers"],
  currenciesAccepted: "EUR",
  ...(priceRange ? { priceRange } : {}),
  areaServed: [
    {
      "@type": "City",
      name: siteConfig.city,
    },
    {
      "@type": "PostalAddress",
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.countryCode,
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: siteConfig.locality,
    addressRegion: siteConfig.region,
    postalCode: siteConfig.postalCode,
    addressCountry: siteConfig.countryCode,
  },
  containedInPlace: {
    "@type": "City",
    name: siteConfig.city,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: siteConfig.region,
    },
  },
  hasMap: siteConfig.googleMapsPlaceLink,
  menu: carteUrl,
  amenityFeature: siteConfig.services.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
  })),
  openingHoursSpecification,
  sameAs: [siteConfig.instagram, siteConfig.facebook],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    contactType: "customer service",
    areaServed: "BE",
    availableLanguage: ["fr-BE", "fr"],
    hoursAvailable: openingHoursSpecification,
  },
  hasMenu: { "@id": menuId },
  potentialAction: {
    "@type": "OrderAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: siteConfig.orderUrl,
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
  },
};

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: `${origin}/og.jpg`,
      contentUrl: `${origin}/og.jpg`,
      width: 1200,
      height: 630,
      caption: siteConfig.ogImageAlt,
      inLanguage: "fr-BE",
    },
    {
      "@type": "ImageObject",
      "@id": logoId,
      url: `${origin}${images.logo}`,
      contentUrl: `${origin}${images.logo}`,
      width: 360,
      height: 411,
      caption: "Logo Mr Gaston",
      inLanguage: "fr-BE",
    },
    localBusiness,
    menu,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: pageUrl,
      name: siteConfig.name,
      alternateName: siteConfig.nameDisplay,
      description: siteConfig.description,
      inLanguage: "fr-BE",
      publisher: { "@id": businessId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: siteConfig.seoTitle,
      description: siteConfig.description,
      inLanguage: "fr-BE",
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      mainEntity: { "@id": businessId },
      primaryImageOfPage: { "@id": primaryImageId },
      hasPart: { "@id": faqId },
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      url: `${pageUrl}#faq`,
      isPartOf: { "@id": webpageId },
      inLanguage: "fr-BE",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export const restaurantJsonLdScript = JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c");
