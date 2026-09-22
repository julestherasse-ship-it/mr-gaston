"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { NewWindowText, TextLink } from "@/components/ui/PremiumButton";

export default function LocationMap() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const reveal = () => setLoadMap(true);
    if (typeof IntersectionObserver !== "function") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        reveal();
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="group map-frame aspect-[5/4] min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:aspect-[5/4] lg:min-h-[380px]"
    >
      {loadMap ? (
        <iframe
          title={`Carte — ${siteConfig.name}, ${siteConfig.fullAddress}`}
          src={siteConfig.googleMapsEmbed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 bg-soot" aria-hidden />
      )}
      <div className="absolute inset-x-0 bottom-0 z-[3] pointer-events-none bg-gradient-to-t from-night via-night/75 to-transparent pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 p-5 sm:p-7">
          <div>
            <p className="eyebrow text-cream/62 mb-2">Adresse</p>
            <p className="title text-[1.35rem] md:text-[1.6rem] text-cream leading-snug">
              {siteConfig.address}
            </p>
            <p className="mt-1 text-sm text-cream/72">
              {siteConfig.postalCode} {siteConfig.city}
              <span className="text-cream/62" aria-hidden>
                {" "}
                ·{" "}
              </span>
              {siteConfig.region}, {siteConfig.country}
            </p>
          </div>
          <TextLink
            href={siteConfig.googleMapsPlaceLink}
            external
            className="pointer-events-auto eyebrow text-cream hover:text-cream/80"
          >
            Ouvrir la carte
            <NewWindowText />
          </TextLink>
        </div>
      </div>
    </div>
  );
}
