import { displayDescription, menuBadge, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { ArrowIcon, NewWindowText } from "@/components/ui/PremiumButton";
import MenuFormats from "@/components/home/MenuFormats";

interface MenuDishRowProps {
  item: MenuItem;
  compact?: boolean;
}

export default function MenuDishRow({ item, compact = false }: MenuDishRowProps) {
  const description = displayDescription(item.description);
  const badge = menuBadge(item);
  const formats = item.formats;

  return (
    <li>
      <a
        href={siteConfig.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group menu-row flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-cream/12 hover:border-gold/28 active:bg-cream/[0.03] touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold ${
          compact ? "min-h-14 py-4 gap-3" : "min-h-16 py-5 md:py-6 gap-4"
        }`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className={`text-cream leading-snug ${compact ? "text-[1.05rem]" : "text-[1.12rem] md:text-[1.2rem]"}`}>
              {item.name}
            </h4>
            {badge ? <span className="eyebrow text-gold/80">{badge}</span> : null}
          </div>
          {!compact && description ? (
            <p className="mt-1.5 text-sm text-cream/72 leading-relaxed max-w-lg">{description}</p>
          ) : null}
          {item.note ? <p className="mt-1.5 text-sm text-cream/62">{item.note}</p> : null}
          <NewWindowText />
        </div>
        {formats && formats.length > 0 && !compact ? (
          <div className="shrink-0 sm:pt-0.5">
            <MenuFormats formats={formats} />
          </div>
        ) : (
          <span
            className={`shrink-0 pt-0.5 flex items-center gap-2 price ${
              compact ? "text-[1.05rem]" : "text-[1.15rem] md:text-[1.25rem]"
            }`}
          >
            <span className="text-cream group-hover:text-gold transition-colors duration-[var(--duration)] ease-[var(--ease-out)]">
              {item.price}
            </span>
            <ArrowIcon className="w-3 h-3 text-gold/80" />
          </span>
        )}
      </a>
    </li>
  );
}
