import Image from "next/image";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import PremiumButton, { TextLink } from "@/components/ui/PremiumButton";
import TodayHours from "@/components/ui/TodayHours";

/** Official Poivré — only this photo as the Hero product. */
const POIVRE_SRC = images.poivre;

export default function Hero() {
  return (
    <section
      id="accueil"
      aria-labelledby="accueil-heading"
      className="relative overflow-x-clip hero-stage"
    >
      <div className="hero-stage__atmosphere" aria-hidden />
      <div className="hero-stage__spotlight" aria-hidden />
      <div className="hero-stage__grain" aria-hidden />

      <div className="relative z-10 hero-canvas">
        <p className="hero-backdrop-type hero-anim hero-anim-title" aria-hidden>
          POIVRÉ
        </p>

        <div className="hero-copy">
          <div className="hero-anim hero-anim-brand">
            <p className="eyebrow text-cream/55 mb-3">{siteConfig.nameDisplay}</p>
            <div className="flex items-center gap-3 mb-7 lg:mb-8">
              <span className="accent-rule shrink-0" aria-hidden />
              <p className="eyebrow text-gold/75 tracking-[0.18em]">Signature Mr Gaston</p>
            </div>
          </div>

          <h1
            id="accueil-heading"
            className="hero-anim hero-anim-heading font-display text-cream leading-[0.9]"
          >
            <span className="block text-[clamp(0.95rem,2.2vw,1.15rem)] font-sans font-medium tracking-[0.28em] uppercase text-cream/48 mb-3 lg:mb-4">
              Le
            </span>
            <span className="block text-[clamp(3.4rem,9.5vw,6.4rem)] tracking-[-0.035em]">
              Poivré
            </span>
          </h1>

          <div className="hero-media hero-media--mobile hero-anim hero-anim-product lg:hidden">
            <div className="hero-product">
              <div className="hero-product__frame">
                <Image
                  src={POIVRE_SRC}
                  alt="Burger Poivré de Mr Gaston"
                  fill
                  priority
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 1023px) 180vw, 1254px"
                  quality={92}
                  className="object-cover hero-poivre-shot"
                />
              </div>
              <div className="hero-product__veil" aria-hidden />
            </div>
          </div>

          <p className="hero-anim hero-anim-meta hero-meta">
            Bœuf · Poivre · Lard · Cheddar vintage
          </p>

          <p className="hero-anim hero-anim-desc text-cream/72 body-copy max-w-[28rem] mt-5 lg:mt-6 leading-relaxed">
            Burger de bœuf, sauce poivre, salade, chou, oignons rissolés, lard &amp; cheddar
            vintage.
          </p>

          <div className="hero-anim hero-anim-price hero-price mt-7 lg:mt-8">
            <span className="hero-price__rule" aria-hidden />
            <p className="price text-cream text-[1.65rem] lg:text-[1.9rem] leading-none">11,90 €</p>
          </div>

          <div className="hero-anim hero-anim-cta mt-8 lg:mt-9 flex flex-col sm:flex-row gap-3">
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

          <div className="hero-anim hero-anim-cta mt-6 lg:mt-7 flex flex-col text-sm text-cream/58">
            <TodayHours className="text-sm text-cream/58 py-1.5 max-[360px]:flex max-[360px]:flex-wrap" />
            <TextLink href="/#contact" className="text-cream/58 hover:text-cream/85">
              {siteConfig.address}, {siteConfig.postalCode} {siteConfig.city}
            </TextLink>
          </div>
        </div>

        <div className="hero-media hero-media--desktop hero-anim hero-anim-product hidden lg:block">
          <div className="hero-product">
            <div className="hero-product__frame">
              <Image
                src={POIVRE_SRC}
                alt="Burger Poivré de Mr Gaston"
                fill
                priority
                fetchPriority="high"
                loading="eager"
                sizes="(max-width: 1023px) 180vw, 1254px"
                quality={92}
                className="object-cover hero-poivre-shot"
              />
            </div>
            <div className="hero-product__veil" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
