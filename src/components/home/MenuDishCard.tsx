import { displayDescription, menuBadge, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { ArrowIcon, NewWindowText } from "@/components/ui/PremiumButton";
import SmartImage from "@/components/ui/SmartImage";

interface MenuDishCardProps {
  item: MenuItem;
  featured?: boolean;
  pair?: boolean;
}

export default function MenuDishCard({ item, featured = false, pair = false }: MenuDishCardProps) {
  if (!item.image) return null;
  const description = displayDescription(item.description);
  const badge = menuBadge(item);
  const largePhoto = featured || pair;

  return (
    <a
      href={siteConfig.orderUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-dark card-lift overflow-hidden flex flex-col h-full hover:border-gold/28 active:border-gold/28 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
    >
      <div
        className={`photo-frame relative bg-night ${
          largePhoto
            ? "aspect-[5/4] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[28rem]"
            : "aspect-[5/4] min-h-[200px] md:min-h-[300px]"
        }`}
      >
        <SmartImage
          src={item.image}
          alt={item.imageAlt ?? ""}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 768px) 100vw, 44vw"}
          className="object-cover img-zoom"
        />
        {featured ? (
          <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-night/90 via-night/28 to-transparent">
            {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
            <h4 className="title text-[1.7rem] sm:text-[2rem] md:text-[2.55rem] text-cream mb-3">
              {item.name}
            </h4>
            <p className="text-[1.45rem] md:text-[1.7rem] text-cream price">{item.price}</p>
          </div>
        ) : null}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        {!featured ? (
          <>
            {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
            <h4 className="title text-[1.7rem] md:text-[2.05rem] mb-3">{item.name}</h4>
          </>
        ) : null}
        {description ? (
          <p className="text-sm md:text-[0.95rem] text-cream/72 leading-relaxed mb-6 max-w-xl">{description}</p>
        ) : null}
        <div className="flex items-end justify-between gap-4 mt-auto">
          {featured ? (
            <span className="eyebrow text-gold/80 group-hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] inline-flex items-center gap-2">
              Commander
              <ArrowIcon className="w-3 h-3 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
            </span>
          ) : (
            <>
              <p className="text-[1.35rem] md:text-2xl text-cream price">{item.price}</p>
              <span className="eyebrow text-gold/80 group-hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] inline-flex items-center gap-2">
                Commander
                <ArrowIcon className="w-3 h-3 transition-transform duration-[var(--duration)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
              </span>
            </>
          )}
        </div>
        <NewWindowText />
      </div>
    </a>
  );
}
