import { displayDescription, menuBadge, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { ArrowIcon, NewWindowText } from "@/components/ui/PremiumButton";
import SmartImage from "@/components/ui/SmartImage";
import MenuFormats from "@/components/home/MenuFormats";

interface MenuDishCardProps {
  item: MenuItem;
  featured?: boolean;
}

export default function MenuDishCard({ item, featured = false }: MenuDishCardProps) {
  if (!item.image && !featured) return null;
  const description = displayDescription(item.description);
  const badge = menuBadge(item);
  const formats = item.formats;

  return (
    <article className="group card-dark card-lift overflow-hidden flex flex-col h-full hover:border-gold/28">
      {item.image ? (
        <a
          href={siteConfig.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`photo-frame relative bg-night block touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold ${
            featured
              ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[16/10] min-h-[280px] md:min-h-[420px]"
              : "aspect-[5/4] min-h-[220px] md:min-h-[300px]"
          }`}
        >
          <SmartImage
            src={item.image}
            alt={item.imageAlt ?? item.name}
            fill
            fetchPriority={featured ? "high" : "auto"}
            loading={featured ? "eager" : "lazy"}
            sizes={featured ? "(max-width: 1024px) 100vw, 88vw" : "(max-width: 768px) 100vw, 44vw"}
            className="object-cover object-center img-zoom"
          />
          <NewWindowText />
        </a>
      ) : null}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
        <h4 className={`title mb-3 ${featured ? "text-[2rem] md:text-[2.8rem]" : "text-[1.7rem] md:text-[2.05rem]"}`}>
          {item.name}
        </h4>
        {description ? (
          <p className="text-sm md:text-[0.95rem] text-cream/72 leading-relaxed mb-6 max-w-xl">{description}</p>
        ) : null}
        {item.note ? <p className="text-sm text-cream/62 mb-6">{item.note}</p> : null}
        <div className="mt-auto">
          {formats && formats.length > 0 ? (
            <MenuFormats formats={formats} large={featured} />
          ) : (
            <p className="text-[1.35rem] md:text-2xl text-cream price">{item.price}</p>
          )}
          <a
            href={siteConfig.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-gold/80 hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] inline-flex items-center gap-2 mt-6 min-h-11 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
          >
            Commander
            <ArrowIcon className="w-3 h-3" />
            <NewWindowText />
          </a>
        </div>
      </div>
    </article>
  );
}
