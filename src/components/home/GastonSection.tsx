import { displayDescription, menuCategories } from "@/data/menu";
import { siteConfig } from "@/data/site";
import SmartImage from "@/components/ui/SmartImage";
import PremiumButton from "@/components/ui/PremiumButton";
import MenuFormats from "@/components/home/MenuFormats";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GastonSection() {
  const gaston = menuCategories
    .find((category) => category.id === "burgers")
    ?.items.find((item) => item.id === "b-gaston");

  if (!gaston?.image) return null;

  const description = displayDescription(gaston.description);

  return (
    <section
      id="gaston"
      aria-labelledby="gaston-heading"
      className="gaston-stage text-cream relative overflow-x-clip"
    >
      <div className="gaston-stage__fade" aria-hidden />
      <div className="gaston-stage__glow" aria-hidden />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:min-h-[min(82svh,48rem)] lg:items-stretch">
        <div className="relative order-2 lg:order-1 lg:col-span-7 overflow-hidden">
          <p className="gaston-backdrop-type" aria-hidden>
            GASTON
          </p>
          <AnimatedSection className="h-full">
            <div className="dish-stage group relative aspect-[4/5] min-h-[280px] sm:min-h-[360px] lg:aspect-auto lg:min-h-0 lg:h-full gaston-product">
              <SmartImage
                src={gaston.image}
                alt={gaston.imageAlt ?? "Burger Gaston de Mr Gaston"}
                fill
                sizes="(max-width: 1023px) 100vw, min(1254px, 70vw)"
                quality={90}
                className="object-cover img-zoom dish-shot dish-shot--gaston"
              />
              <div className="dish-stage__veil gaston-product__veil" aria-hidden />
            </div>
          </AnimatedSection>
        </div>

        <div className="relative order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center px-5 sm:px-8 lg:px-12 xl:px-16 pt-14 pb-10 md:pt-16 md:pb-12 lg:py-20">
          <AnimatedSection>
            <p className="eyebrow text-gold/80 mb-4">Signature Mr Gaston</p>
            <span className="accent-rule mb-6" aria-hidden />
            <h2
              id="gaston-heading"
              className="font-display text-cream leading-[0.92] mb-6"
            >
              <span className="block text-[clamp(0.9rem,2vw,1.05rem)] font-sans font-medium tracking-[0.28em] uppercase text-cream/48 mb-3">
                Le
              </span>
              <span className="block text-[clamp(2.6rem,6.5vw,4.6rem)] tracking-[-0.03em]">
                Gaston
              </span>
            </h2>

            <p className="gaston-meta mb-5">
              Bœuf · Sauce Gaston · Fromage d&apos;abbaye · Jambon d&apos;Ardenne
            </p>

            {description ? (
              <p className="body-copy text-cream/72 max-w-md leading-relaxed mb-8">{description}</p>
            ) : null}

            <div className="gaston-price mb-9">
              <span className="gaston-price__rule" aria-hidden />
              {gaston.formats && gaston.formats.length > 0 ? (
                <MenuFormats formats={gaston.formats} large />
              ) : (
                <p className="text-[1.55rem] text-cream price leading-none">{gaston.price}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PremiumButton href="/#carte" size="lg" className="w-full sm:w-auto" cta="primary">
                Voir le menu
              </PremiumButton>
              <PremiumButton
                href={siteConfig.orderUrl}
                external
                variant="outlineOnDark"
                size="lg"
                className="w-full sm:w-auto"
                cta="secondary"
              >
                Commander
              </PremiumButton>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
