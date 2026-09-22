import { siteConfig } from "@/data/site";
import PremiumButton from "@/components/ui/PremiumButton";

export default function NotFoundView() {
  return (
    <section className="relative min-h-[100svh] flex items-end bg-night text-cream">
      <div className="page-shell pt-36 pb-24 md:pb-32">
        <p className="eyebrow text-cream/62 mb-6">
          <span className="text-gold/80">404</span>
        </p>
        <span className="accent-rule mb-8" aria-hidden />
        <h1 className="font-display text-[clamp(3rem,10vw,7.2rem)] max-w-4xl mb-8">
          Cette page
          <br />
          <span className="font-italic">n&apos;existe plus.</span>
        </h1>
        <p className="body-copy text-cream/72 max-w-md mb-10">
          Cette adresse n&apos;existe pas. Revenez à l&apos;accueil, ou commandez en ligne.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <PremiumButton href="/" size="lg" className="w-full sm:w-auto">
            Retour à l&apos;accueil
          </PremiumButton>
          <PremiumButton
            href={siteConfig.orderUrl}
            external
            variant="outlineOnDark"
            size="lg"
            className="w-full sm:w-auto"
            cta="primary"
          >
            Commander
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
