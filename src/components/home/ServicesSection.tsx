import { menuCategories, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import SectionIndex from "@/components/ui/SectionIndex";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PremiumButton from "@/components/ui/PremiumButton";
import MenuCategoryNav from "@/components/home/MenuCategoryNav";
import MenuDishCard from "@/components/home/MenuDishCard";
import MenuDishRow from "@/components/home/MenuDishRow";
import MenuPortionCard from "@/components/home/MenuPortionCard";

/** Already given a dedicated visual moment above the carte. */
const HERO_FEATURED = new Set(["b-poivre", "b-gaston"]);
/** Official photos still shown in the carte — compact editorial rhythm. */
const PHOTO_SIGNATURES = new Set(["b-abbe", "b-longtarin", "b-jeanne"]);

function BurgersBlock({ items }: { items: MenuItem[] }) {
  const photoSignatures: MenuItem[] = [];
  const listItems: MenuItem[] = [];

  for (const item of items) {
    if (PHOTO_SIGNATURES.has(item.id) && item.image) {
      photoSignatures.push(item);
    } else {
      listItems.push(item);
    }
  }

  return (
    <div className="space-y-14 md:space-y-16 lg:space-y-20">
      {photoSignatures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {photoSignatures.map((item) => (
            <MenuDishCard key={item.id} item={item} stacked compact />
          ))}
        </div>
      ) : null}

      {listItems.length > 0 ? (
        <div>
          {photoSignatures.length > 0 ? (
            <p className="eyebrow text-cream/55 mb-5">Aussi en carte</p>
          ) : null}
          <ul>
            {listItems.map((item) => (
              <MenuDishRow
                key={item.id}
                item={item}
                compact={HERO_FEATURED.has(item.id)}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="carte"
      aria-labelledby="carte-heading"
      className="bg-night text-cream section-y scroll-mt-28 max-lg:pb-28"
    >
      <div className="page-shell">
        <AnimatedSection>
          <SectionIndex index="01" label="La carte" light />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 md:mb-14">
            <h2 id="carte-heading" className="font-display section-display max-w-xl">
              Burgers,
              <br />
              <span className="font-italic">snacks &amp; frites.</span>
            </h2>
            <p className="text-cream/72 max-w-md body-copy">
              Burgers, snacks, frites et bar. La carte en ligne est celle du moment — sur place ou à
              emporter.
            </p>
          </div>
        </AnimatedSection>
      </div>

      <MenuCategoryNav categories={menuCategories} />

      <div className="page-shell">
        <div className="space-y-20 md:space-y-28">
          {menuCategories.map((category) => {
            const maisonSauces = category.id === "sauces" ? category.items.filter((item) => item.tag === "Maison") : [];
            const otherSauces = category.id === "sauces" ? category.items.filter((item) => item.tag !== "Maison") : [];

            return (
              <div key={category.id} id={`cat-${category.id}`} className="scroll-mt-36 lg:scroll-mt-40">
                <header className="mb-8 md:mb-12 max-w-2xl">
                  <h3 className="font-display text-[clamp(2rem,4.8vw,3.4rem)] mb-4">{category.label}</h3>
                  {category.intro ? <p className="body-copy text-cream/72">{category.intro}</p> : null}
                </header>

                {category.id === "burgers" ? (
                  <BurgersBlock items={category.items} />
                ) : category.id === "frites" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {category.items.map((item) => (
                      <MenuPortionCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : category.id === "sauces" ? (
                  <>
                    {maisonSauces.length > 0 ? (
                      <div className="mb-8">
                        <p className="eyebrow text-cream/62 mb-4">Sauces maison · 1,00 €</p>
                        <ul>{maisonSauces.map((item) => <MenuDishRow key={item.id} item={item} />)}</ul>
                      </div>
                    ) : null}
                    {otherSauces.length > 0 ? (
                      <div>
                        <p className="eyebrow text-cream/62 mb-4">Sauces classiques · 0,90 €</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                          {otherSauces.map((item) => (
                            <MenuDishRow key={item.id} item={item} compact />
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </>
                ) : category.id === "supplements" ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                    {category.items.map((item) => (
                      <MenuDishRow key={item.id} item={item} compact />
                    ))}
                  </ul>
                ) : (
                  <ul>{category.items.map((item) => <MenuDishRow key={item.id} item={item} />)}</ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-24 flex flex-col sm:flex-row gap-3">
          <PremiumButton href={siteConfig.orderUrl} external size="lg" className="w-full sm:w-auto" cta="primary">
            Commander
          </PremiumButton>
          <PremiumButton href="/#contact" variant="outlineOnDark" size="lg" className="w-full sm:w-auto" cta="secondary">
            Nous trouver
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
