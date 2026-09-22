import Image from "next/image";
import { siteConfig, navLinks } from "@/data/site";
import { openingHours } from "@/data/hours";
import { images } from "@/data/images";
import PremiumButton, { NewWindowText, TextLink } from "@/components/ui/PremiumButton";

export default function Footer() {
  return (
    <footer className="bg-night text-cream border-t border-gold/14">
      <div className="page-shell py-24 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-12">
          <div className="lg:col-span-4">
            <Image
              src={images.logo}
              alt="Logo Mr Gaston"
              width={96}
              height={110}
              sizes="72px"
              quality={75}
              loading="lazy"
              decoding="async"
              className="h-[4.5rem] w-auto object-contain mb-6"
            />
            <p className="font-display text-[2.5rem] md:text-4xl mb-5">Mr GASTON</p>
            <p className="body-copy text-cream/72 max-w-xs">
              {siteConfig.tagline} à Mons — depuis {siteConfig.founded}.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-cream/62 mb-5">Navigation</p>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} className="text-sm text-cream/72 hover:text-cream">
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cream/62 mb-5">Horaires</p>
            <ul className="space-y-0">
              {openingHours.map((h) => (
                <li key={h.day} className="text-sm flex justify-between gap-3 py-1.5 items-baseline">
                  <span className="text-cream shrink-0">{h.day}</span>
                  <span className="text-cream/62 text-right min-w-0 price">
                    {h.slots.map((slot, index) => (
                      <span key={`${h.day}-${slot.open}`}>
                        {index > 0 ? " / " : ""}
                        <time dateTime={slot.open}>{slot.open}</time>
                        –
                        <time dateTime={slot.close}>{slot.close}</time>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-cream/62 mb-5">La friterie</p>
            <address className="not-italic text-sm text-cream/72 space-y-3">
              <p>
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-start hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)]"
                >
                  <span>
                    {siteConfig.address}
                    <br />
                    {siteConfig.postalCode} {siteConfig.locality}
                    <br />
                    {siteConfig.region}, {siteConfig.country}
                    <NewWindowText />
                  </span>
                </a>
              </p>
              <p>
                <TextLink href={`tel:${siteConfig.phoneHref}`} className="hover:text-cream">
                  {siteConfig.phone}
                </TextLink>
              </p>
              <p>
                <TextLink href={`mailto:${siteConfig.email}`} className="hover:text-cream">
                  {siteConfig.email}
                </TextLink>
              </p>
              <p className="flex flex-wrap gap-x-5 gap-y-1 pt-3">
                <TextLink
                  href={siteConfig.instagram}
                  external
                  rel="me noopener noreferrer"
                  className="hover:text-cream"
                >
                  Instagram
                  <NewWindowText />
                </TextLink>
                <TextLink
                  href={siteConfig.facebook}
                  external
                  rel="me noopener noreferrer"
                  className="hover:text-cream"
                >
                  Facebook
                  <NewWindowText />
                </TextLink>
                <TextLink href={siteConfig.resellerUrl} external className="hover:text-cream">
                  5.G
                  <NewWindowText />
                </TextLink>
              </p>
            </address>
            <div className="mt-10">
              <PremiumButton href={siteConfig.orderUrl} external size="sm" cta="primary">
                Commander
              </PremiumButton>
            </div>
          </div>
        </div>

        <div className="rule-light my-12 md:my-14" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 eyebrow text-cream/62">
          <p>© 2026 {siteConfig.name} · Mons</p>
          <TextLink href={`tel:${siteConfig.phoneHref}`} className="hover:text-cream">
            {siteConfig.phone}
          </TextLink>
        </div>
      </div>
    </footer>
  );
}
