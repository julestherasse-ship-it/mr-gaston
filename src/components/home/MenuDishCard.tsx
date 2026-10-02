import { displayDescription, menuBadge, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { ArrowIcon, NewWindowText } from "@/components/ui/PremiumButton";
import SmartImage from "@/components/ui/SmartImage";
import MenuFormats from "@/components/home/MenuFormats";

interface MenuDishCardProps {
  item: MenuItem;
  featured?: boolean;
  editorial?: boolean;
  reverse?: boolean;
  compact?: boolean;
  stacked?: boolean;
}

function dishShotClass(itemId: string) {
  if (itemId === "b-poivre") return "dish-shot dish-shot--poivre";
  if (itemId === "b-gaston") return "dish-shot dish-shot--gaston";
  if (itemId === "b-abbe") return "dish-shot dish-shot--abbe";
  if (itemId === "b-longtarin") return "dish-shot dish-shot--longtarin";
  if (itemId === "b-jeanne") return "dish-shot dish-shot--jeanne";
  return "dish-shot";
}

export default function MenuDishCard({
  item,
  featured = false,
  editorial = false,
  reverse = false,
  compact = false,
  stacked = false,
}: MenuDishCardProps) {
  if (!item.image && !featured) return null;
  const description = displayDescription(item.description);
  const badge = menuBadge(item);
  const formats = item.formats;
  const objectPosition = item.imagePosition ?? "50% 70%";

  if (stacked && item.image) {
    return (
      <article className="flex flex-col">
        <a
          href={siteConfig.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dish-stage photo-frame group relative bg-night block overflow-hidden touch-manipulation aspect-[4/5] min-h-[220px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
        >
          <SmartImage
            src={item.image}
            alt={item.imageAlt ?? item.name}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            quality={90}
            className={`object-cover img-zoom ${dishShotClass(item.id)}`}
            style={{ objectPosition }}
          />
          <div className="dish-stage__veil" aria-hidden />
          <NewWindowText />
        </a>
        <div className="flex flex-col pt-5 md:pt-6">
          {badge ? <p className="eyebrow text-gold/80 mb-2">{badge}</p> : null}
          <h4 className="title text-[1.45rem] md:text-[1.7rem] mb-3">{item.name}</h4>
          {description ? (
            <p className="text-sm text-cream/72 leading-relaxed mb-4 max-w-sm">{description}</p>
          ) : null}
          {item.note ? <p className="text-sm text-cream/62 mb-4">{item.note}</p> : null}
          {formats && formats.length > 0 ? (
            <MenuFormats formats={formats} />
          ) : (
            <p className="text-cream price text-[1.15rem] md:text-[1.25rem]">{item.price}</p>
          )}
          <a
            href={siteConfig.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-gold/80 hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)] inline-flex items-center gap-2 mt-5 min-h-11 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
          >
            Commander
            <ArrowIcon className="w-3 h-3" />
            <NewWindowText />
          </a>
        </div>
      </article>
    );
  }

  if (editorial && item.image) {
    const frameClass = featured
      ? "aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] min-h-[240px] md:min-h-[440px]"
      : compact
        ? "aspect-[5/4] min-h-[200px] md:min-h-[280px]"
        : "aspect-[4/5] min-h-[220px] md:min-h-[340px]";

    return (
      <article
        className={`grid grid-cols-1 md:grid-cols-2 items-center ${
          compact ? "gap-6 md:gap-10" : "gap-8 md:gap-14 lg:gap-16"
        }`}
      >
        <a
          href={siteConfig.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`dish-stage photo-frame group relative bg-night block overflow-hidden touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold ${frameClass} ${
            reverse ? "md:order-2" : ""
          }`}
        >
          <SmartImage
            src={item.image}
            alt={item.imageAlt ?? item.name}
            fill
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 42vw"
                : compact
                  ? "(max-width: 768px) 100vw, 34vw"
                  : "(max-width: 768px) 100vw, 40vw"
            }
            quality={90}
            className={`object-cover img-zoom ${dishShotClass(item.id)}`}
            style={{ objectPosition }}
          />
          <div className="dish-stage__veil" aria-hidden />
          <NewWindowText />
        </a>
        <div className={`flex flex-col ${reverse ? "md:order-1" : ""}`}>
          {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
          <h4
            className={`title mb-4 ${
              featured
                ? "text-[2rem] md:text-[2.85rem]"
                : compact
                  ? "text-[1.55rem] md:text-[1.9rem]"
                  : "text-[1.75rem] md:text-[2.25rem]"
            }`}
          >
            {item.name}
          </h4>
          {description ? (
            <p
              className={`text-cream/72 leading-relaxed mb-6 max-w-md ${
                compact ? "text-sm" : "text-sm md:text-[1.02rem] mb-7"
              }`}
            >
              {description}
            </p>
          ) : null}
          {item.note ? <p className="text-sm text-cream/62 mb-6">{item.note}</p> : null}
          {formats && formats.length > 0 ? (
            <MenuFormats formats={formats} large={featured} />
          ) : (
            <p className={`text-cream price ${featured ? "text-[1.35rem] md:text-2xl" : "text-[1.2rem] md:text-[1.4rem]"}`}>
              {item.price}
            </p>
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
      </article>
    );
  }

  return (
    <article className="group card-dark card-lift overflow-hidden flex flex-col h-full hover:border-gold/28">
      {item.image ? (
        <a
          href={siteConfig.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`dish-stage photo-frame relative bg-night block touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold ${
            featured
              ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[16/10] min-h-[240px] md:min-h-[360px]"
              : "aspect-[5/4] min-h-[200px] md:min-h-[260px]"
          }`}
        >
          <SmartImage
            src={item.image}
            alt={item.imageAlt ?? item.name}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 768px) 100vw, 40vw"}
            quality={90}
            className={`object-cover img-zoom ${dishShotClass(item.id)}`}
            style={{ objectPosition }}
          />
          <div className="dish-stage__veil" aria-hidden />
          <NewWindowText />
        </a>
      ) : null}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        {badge ? <p className="eyebrow text-gold/80 mb-3">{badge}</p> : null}
        <h4 className={`title mb-3 ${featured ? "text-[2rem] md:text-[2.6rem]" : "text-[1.6rem] md:text-[1.9rem]"}`}>
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
            <p className="text-[1.25rem] md:text-xl text-cream price">{item.price}</p>
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
