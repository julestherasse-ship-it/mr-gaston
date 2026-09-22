import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/site";
import type { Testimonial } from "@/types";
import SectionIndex from "@/components/ui/SectionIndex";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { TextLink } from "@/components/ui/PremiumButton";

function ReviewCard({ item }: { item: Testimonial }) {
  return (
    <figure className="card-paper card-lift h-full p-8 md:p-10 lg:p-12 flex flex-col">
      {item.source ? <p className="eyebrow text-ink/70 mb-5">{item.source}</p> : null}
      {item.rating ? (
        <p className="flex gap-1 mb-7" aria-label={`${item.rating} sur 5`}>
          {Array.from({ length: item.rating }).map((_, star) => (
            <span key={star} className="block h-px w-4 bg-gold-deep" aria-hidden />
          ))}
        </p>
      ) : null}
      <blockquote className="title text-[1.35rem] md:text-[1.6rem] leading-snug text-ink/90 flex-1">
        <p>“{item.text}”</p>
      </blockquote>
      <figcaption className="mt-10 eyebrow text-ink/70">— {item.name}</figcaption>
    </figure>
  );
}

export default function ReviewsSection() {
  const hasReviews = testimonials.length > 0;

  return (
    <section id="avis" aria-labelledby="avis-heading" className="bg-paper text-ink section-y scroll-mt-28 border-t border-line max-lg:pb-28">
      <div className="page-shell">
        <AnimatedSection>
          <SectionIndex index="04" label="Confiance" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
            <h2 id="avis-heading" className="font-display section-display max-w-xl">
              Ils en
              <br />
              <span className="font-italic">parlent.</span>
            </h2>
            <div className="max-w-md">
              <p className="body-copy text-ink/70">{siteConfig.fullAddress}</p>
              {hasReviews ? <p className="eyebrow text-ink/70 mt-5">Avis publiés sur Google</p> : null}
              <p className="mt-4">
                <TextLink href="/#contact" className="eyebrow text-ink/70 hover:text-ink">
                  Adresse et horaires
                </TextLink>
              </p>
            </div>
          </div>
        </AnimatedSection>

        {hasReviews ? (
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((item) => (
                <ReviewCard key={item.id} item={item} />
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <p className="body-copy text-ink/70 max-w-md">
              Nous n&apos;affichons ici que des avis vérifiés. En attendant, le plus juste reste de venir
              à la friterie — ou de suivre le quotidien sur les réseaux.
            </p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
