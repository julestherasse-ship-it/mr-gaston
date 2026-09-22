import Image from "next/image";
import { siteConfig } from "@/data/site";
import heroPlate from "../../../public/images/mr-gaston/hero-plate.webp";
import PremiumButton, { TextLink } from "@/components/ui/PremiumButton";
import TodayHours from "@/components/ui/TodayHours";

export default function Hero() {
  return (
    <section
      id="accueil"
      aria-labelledby="accueil-heading"
      className="relative min-h-[100svh] flex items-end overflow-x-hidden bg-night"
    >
      <div className="absolute inset-0 overflow-hidden bg-night">
        <div className="hero-media absolute inset-0 md:inset-[-3%]">
          <Image
            src={heroPlate}
            alt="Burger, frites et Kriek chez Mr Gaston à Mons"
            fill
            fetchPriority="high"
            loading="eager"
            placeholder="blur"
            sizes="100vw"
            quality={75}
            className="object-cover object-[72%_48%]"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/75 via-night/25 to-transparent md:via-night/15" />

      <div className="hero-copy relative z-10 page-shell pt-[calc(var(--header-h,5.5rem)+0.5rem)] pb-[calc(2.25rem+env(safe-area-inset-bottom,0px))] min-[390px]:pt-[calc(var(--header-h,5.5rem)+0.75rem)] min-[390px]:pb-12 md:pt-28 md:pb-32">
        <p className="eyebrow text-cream/62 mb-4 md:mb-7">
          {siteConfig.nameDisplay}
          <span className="mx-3 text-gold/80" aria-hidden>
            ·
          </span>
          <span className="lg:hidden">{siteConfig.city}</span>
          <span className="hidden lg:inline">{siteConfig.subtitle}</span>
        </p>
        <span className="accent-rule mb-5 md:mb-8" aria-hidden />
        <h1 id="accueil-heading" className="font-display text-[clamp(2.55rem,11vw,6.8rem)] max-w-[12ch] text-cream text-balance">
          Des frites
          <br />
          <span className="font-italic">&amp; des burgers</span>
        </h1>
        <p className="eyebrow mt-4 md:mt-7 text-cream/62 leading-relaxed tracking-[0.14em]">
          {siteConfig.services.join(" · ")}
        </p>
        <p className="hidden md:block mt-6 md:mt-8 text-cream/72 body-copy max-w-md">
          {siteConfig.aboutLead}
        </p>
        <div className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-3">
          <PremiumButton href={siteConfig.orderUrl} external size="lg" className="w-full sm:w-auto" cta="primary">
            Commander
          </PremiumButton>
          <PremiumButton href="/#carte" variant="outlineOnDark" size="lg" className="w-full sm:w-auto" cta="secondary">
            Voir la carte
          </PremiumButton>
        </div>
        <div className="mt-6 md:mt-8 flex flex-col text-sm text-cream/72">
          <TodayHours className="text-sm text-cream/72 py-2 max-[360px]:flex max-[360px]:flex-wrap" />
          <TextLink href="/#contact" className="text-cream/72 hover:text-cream">
            {siteConfig.address}, {siteConfig.postalCode} {siteConfig.city}
          </TextLink>
          <div className="hidden lg:block">
            <TextLink
              href={`tel:${siteConfig.phoneHref}`}
              aria-label={`Appeler Mr Gaston au ${siteConfig.phone}`}
              className="text-cream hover:text-cream/80"
            >
              {siteConfig.phone}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
