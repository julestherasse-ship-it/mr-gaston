"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { galleryImages } from "@/data/images";
import SmartImage from "@/components/ui/SmartImage";

const Lightbox = dynamic(() => import("@/components/ui/Lightbox"), { ssr: false });

const layout: Record<(typeof galleryImages)[number]["span"], { col: string; min: string; sizes: string }> = {
  large: {
    col: "md:col-span-8",
    min: "min-h-[62vw] sm:min-h-[56vw] md:min-h-[480px] lg:min-h-[540px]",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  tall: {
    col: "md:col-span-4",
    min: "min-h-[62vw] sm:min-h-[56vw] md:min-h-[480px] lg:min-h-[540px]",
    sizes: "(max-width: 768px) 100vw, 34vw",
  },
  wide: {
    col: "md:col-span-6",
    min: "min-h-[56vw] sm:min-h-[48vw] md:min-h-[340px] lg:min-h-[400px]",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
};

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((current) => (current === null ? current : (current + galleryImages.length - 1) % galleryImages.length)),
    []
  );
  const next = useCallback(
    () => setIndex((current) => (current === null ? current : (current + 1) % galleryImages.length)),
    []
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {galleryImages.map((img, i) => (
          <div key={img.src} className={layout[img.span].col}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              aria-label={`Agrandir : ${img.alt}`}
              className={`photo-frame group relative block w-full cursor-zoom-in text-left card-lift ${layout[img.span].min} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink`}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                fill
                sizes={layout[img.span].sizes}
                className="object-cover img-zoom"
              />
              <div className="absolute inset-0 z-[3] bg-night/0 transition-colors duration-[var(--duration)] ease-[var(--ease-out)] md:group-hover:bg-night/18" />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 bottom-4 z-[4] flex h-8 w-8 items-center justify-center border border-gold/40 text-cream/80 text-base leading-none opacity-90 transition-opacity duration-[var(--duration)] ease-[var(--ease-out)] md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
              >
                +
              </span>
            </button>
          </div>
        ))}
      </div>
      {index !== null ? (
        <Lightbox images={galleryImages} index={index} onClose={close} onPrev={prev} onNext={next} />
      ) : null}
    </>
  );
}
