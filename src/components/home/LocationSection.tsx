import { siteConfig } from "@/data/site";
import SectionIndex from "@/components/ui/SectionIndex";
import PremiumButton, { NewWindowText, TextLink } from "@/components/ui/PremiumButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import TodayHours from "@/components/ui/TodayHours";
import OpeningHoursList from "@/components/ui/OpeningHoursList";
import LocationMap from "@/components/home/LocationMap";
import FaqSection from "@/components/home/FaqSection";

export default function LocationSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-soot text-cream section-y scroll-mt-28">
      <div className="page-shell">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          <AnimatedSection className="lg:col-span-5 flex flex-col">
            <SectionIndex index="05" label="Localisation" light />
            <h2 id="contact-heading" className="font-display section-display mb-6 md:mb-8">
              Mons,
              <br />
              <span className="font-italic">Chaussée de Binche.</span>
            </h2>
            <p className="body-copy text-cream/72 max-w-md mb-8 md:mb-10">
              {siteConfig.subtitle}. {siteConfig.address}, {siteConfig.postalCode} {siteConfig.city}.
            </p>

            <div className="mb-8">
              <p className="eyebrow text-cream/62 mb-3">Aujourd&apos;hui</p>
              <TodayHours className="text-[1.05rem] text-cream/72" />
            </div>

            <nav aria-label="Venir et commander" className="flex flex-col sm:flex-row gap-3 mb-10">
              <PremiumButton href={siteConfig.googleMapsLink} external size="lg" className="w-full sm:w-auto" cta="secondary">
                Itinéraire
              </PremiumButton>
              <PremiumButton href={siteConfig.orderUrl} external variant="outlineOnDark" size="lg" className="w-full sm:w-auto" cta="primary">
                Commander
              </PremiumButton>
            </nav>

            <address className="not-italic">
              <p className="eyebrow text-cream/62 mb-3">Adresse</p>
              <a
                href={siteConfig.googleMapsPlaceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1.15rem] md:text-[1.3rem] leading-relaxed text-cream inline-flex min-h-11 items-start hover:text-cream/80 transition-colors duration-[var(--duration)] ease-[var(--ease-out)]"
              >
                <span>
                  {siteConfig.address}
                  <br />
                  {siteConfig.postalCode} {siteConfig.city}
                  <br />
                  <span className="text-[1.05rem] text-cream/72">
                    {siteConfig.region}, {siteConfig.country}
                  </span>
                  <NewWindowText />
                </span>
              </a>
            </address>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-7">
            <LocationMap />
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mt-16 md:mt-24 pt-12 md:pt-16 border-t border-gold/14">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="eyebrow text-cream/62 mb-5">Horaires</p>
              <OpeningHoursList />
            </div>

            <div className="md:col-span-6 lg:col-span-3">
              <p className="eyebrow text-cream/62 mb-5">Contact</p>
              <ul className="space-y-5">
                <li>
                  <p className="eyebrow text-cream/62 mb-2">Téléphone</p>
                  <TextLink
                    href={`tel:${siteConfig.phoneHref}`}
                    className="text-[1.25rem] md:text-[1.35rem] text-cream hover:text-cream/80"
                    aria-label={`Appeler Mr Gaston au ${siteConfig.phone}`}
                  >
                    {siteConfig.phone}
                  </TextLink>
                </li>
                <li>
                  <p className="eyebrow text-cream/62 mb-2">E-mail</p>
                  <TextLink href={`mailto:${siteConfig.email}`} className="text-[1.05rem] text-cream hover:text-cream/80">
                    {siteConfig.email}
                  </TextLink>
                </li>
                <li>
                  <p className="eyebrow text-cream/62 mb-2">Réseaux</p>
                  <p className="flex flex-wrap gap-x-5 gap-y-2">
                    <TextLink
                      href={siteConfig.instagram}
                      external
                      rel="me noopener noreferrer"
                      className="text-sm text-cream/72 hover:text-cream"
                    >
                      {siteConfig.instagramHandle}
                      <NewWindowText />
                    </TextLink>
                    <TextLink
                      href={siteConfig.facebook}
                      external
                      rel="me noopener noreferrer"
                      className="text-sm text-cream/72 hover:text-cream"
                    >
                      Facebook
                      <NewWindowText />
                    </TextLink>
                  </p>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <p className="eyebrow text-cream/62 mb-5">Service</p>
              <ul>
                {siteConfig.services.map((service) => (
                  <li
                    key={service}
                    className="text-[1.05rem] text-cream/72 border-b border-cream/12 py-3.5 last:border-0"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <FaqSection />
        </AnimatedSection>
      </div>
    </section>
  );
}
