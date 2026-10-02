import { siteConfig } from "@/data/site";
import AnimatedSection from "@/components/ui/AnimatedSection";

const facts = [
  { label: "Depuis", value: siteConfig.founded },
  { label: "Ville", value: siteConfig.city },
  { label: "Service", value: siteConfig.services.join(" · ") },
];

export default function TrustBar() {
  return (
    <section className="bg-soot text-cream border-b border-gold/10">
      <AnimatedSection>
        <div className="page-shell py-9 md:py-11">
          <h2 className="sr-only">En quelques mots</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3">
            {facts.map((fact, index) => (
              <li
                key={fact.label}
                className={
                  index === 0
                    ? "pb-5 sm:pb-0 sm:pr-8"
                    : "pt-5 sm:pt-0 sm:pl-8 border-t sm:border-t-0 sm:border-l border-gold/12"
                }
              >
                <p className="eyebrow text-cream/55 mb-2">{fact.label}</p>
                <p className="text-[1.05rem] md:text-[1.12rem] text-cream/88 leading-snug">{fact.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </section>
  );
}
