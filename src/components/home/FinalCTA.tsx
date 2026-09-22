import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import PremiumButton from "@/components/ui/PremiumButton";
import SmartImage from "@/components/ui/SmartImage";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FinalCTA() {
  return (
    <section id="fin" aria-labelledby="fin-heading" className="relative min-h-[78vh] flex items-center overflow-hidden bg-night">
      <div className="absolute inset-0">
        <SmartImage
          src={images.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_52%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/42 to-night/18" />
      </div>

      <AnimatedSection className="relative z-10 page-shell py-24 md:py-36">
        <p className="eyebrow text-cream/62 mb-5">
          {siteConfig.address} · {siteConfig.postalCode} {siteConfig.city}
        </p>
        <span className="accent-rule mb-8 md:mb-10" aria-hidden />
        <h2 id="fin-heading" className="font-display text-[clamp(2.6rem,8.5vw,6.4rem)] text-cream leading-[0.92] max-w-5xl">
          On se retrouve
          <br />
          <span className="font-italic">chez Mr Gaston ?</span>
        </h2>
        <p className="mt-7 text-cream/72 body-copy max-w-md">
          {siteConfig.city}, {siteConfig.address}. Sur place ou à emporter. La carte en ligne reprend les
          plats du moment.
        </p>
        <div className="mt-11 flex flex-col sm:flex-row gap-3">
          <PremiumButton href={siteConfig.orderUrl} external size="lg" className="w-full sm:w-auto" cta="primary">
            Commander
          </PremiumButton>
          <PremiumButton
            href={siteConfig.googleMapsLink}
            external
            variant="outlineOnDark"
            size="lg"
            className="w-full sm:w-auto"
            cta="secondary"
          >
            Itinéraire
          </PremiumButton>
        </div>
      </AnimatedSection>
    </section>
  );
}
