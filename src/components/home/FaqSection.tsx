import { faqItems } from "@/data/faq";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-gold/14">
      <h2 id="faq-heading" className="font-display text-[clamp(2.1rem,4.8vw,3.6rem)] mb-12 md:mb-14">
        Avant de
        <br />
        <span className="font-italic">venir.</span>
      </h2>
      <div>
        {faqItems.map((item) => (
          <details key={item.id} className="group border-b border-cream/12 py-6 md:py-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left min-h-12 py-1 marker:content-none [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold">
              <h3 className="title text-[1.35rem] md:text-[1.7rem] text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] group-hover:text-cream/80">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="block h-2.5 w-2.5 shrink-0 border-r border-b border-gold/80 rotate-45 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-open:-rotate-[135deg]"
              />
            </summary>
            <div className="faq-panel">
              <div>
                <p className="mt-5 max-w-xl text-sm md:text-[0.95rem] leading-relaxed text-cream/72">
                  {item.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
