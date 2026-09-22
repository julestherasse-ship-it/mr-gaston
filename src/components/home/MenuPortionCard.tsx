import { displayDescription, menuBadge, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { ArrowIcon, NewWindowText } from "@/components/ui/PremiumButton";

export default function MenuPortionCard({ item }: { item: MenuItem }) {
  const description = displayDescription(item.description);
  const badge = menuBadge(item);

  return (
    <a
      href={siteConfig.orderUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-dark card-lift min-h-[148px] md:min-h-[176px] p-6 md:p-8 flex flex-col justify-between hover:border-gold/28 active:border-gold/28 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
    >
      <div>
        {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
        <h4 className="title text-[1.7rem] md:text-[2.05rem]">{item.name}</h4>
        {description ? <p className="mt-2 text-sm text-cream/72 leading-relaxed">{description}</p> : null}
      </div>
      <div className="mt-8 flex items-end justify-between gap-4">
        <p className="text-[1.5rem] md:text-[1.7rem] text-cream price group-hover:text-gold transition-colors duration-[var(--duration)] ease-[var(--ease-out)]">
          {item.price}
        </p>
        <span className="eyebrow text-gold/80 group-hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] inline-flex items-center gap-2">
          Commander
          <ArrowIcon className="w-3 h-3 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
        </span>
      </div>
      <NewWindowText />
    </a>
  );
}
