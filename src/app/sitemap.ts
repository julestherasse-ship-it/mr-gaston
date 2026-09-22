import type { MetadataRoute } from "next";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";
import { getSiteOrigin } from "@/lib/site-url";

const origin = getSiteOrigin();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin,
      lastModified: siteConfig.contentUpdated,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "fr-BE": origin,
          "x-default": origin,
        },
      },
      images: [
        `${origin}/og.jpg`,
        `${origin}${images.hero}`,
        `${origin}${images.gastonPlate}`,
        `${origin}${images.elementaire}`,
        `${origin}${images.burger}`,
        `${origin}${images.slider}`,
        `${origin}${images.maison}`,
        `${origin}${images.bar}`,
      ],
    },
  ];
}
