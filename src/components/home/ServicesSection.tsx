import { menuCategories, type MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import SectionIndex from "@/components/ui/SectionIndex";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SmartImage from "@/components/ui/SmartImage";
import PremiumButton from "@/components/ui/PremiumButton";
import MenuCategoryNav from "@/components/home/MenuCategoryNav";
import MenuDishCard from "@/components/home/MenuDishCard";
import MenuDishRow from "@/components/home/MenuDishRow";
import MenuPortionCard from "@/components/home/MenuPortionCard";

function BurgersBlock({ items }: { items: MenuItem[] }) {
  const featured = items.find((item) => item.featured) ?? items[0];
  const rest = featured ? items.filter((item) => item.id !== featured.id) : items;

  type Run = { type: "photo" | "list"; items: MenuItem[] };
  const runs: Run[] = [];
  for (const item of rest) {
    const type = item.image ? "photo" : "list";
    const last = runs[runs.length - 1];
    if (last && last.type === type) last.items.push(item);
    else runs.push({ type, items: [item] });
  }

  return (
    <>
      {featured ? (
        <div className="mb-10 md:mb-14">
          <MenuDishCard item={featured} featured />
        </div>
      ) : null}
      {runs.map((run, index) =>
        run.type === "photo" ? (
          <div
            key={`photo-${run.items[0]?.id ?? index}`}
            className={`grid grid-cols-1 gap-6 md:gap-8 mb-6 md:mb-10 ${
              run.items.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {run.items.map((item) => (
              <MenuDishCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <ul key={`list-${run.items[0]?.id ?? index}`} className="mb-6 md:mb-10 last:mb-0">
            {run.items.map((item) => (
              <MenuDishRow key={item.id} item={item} />
            ))}
          </ul>
        ),
      )}
    </>
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

                {category.id === "bar" ? (
                  <div className="relative aspect-[16/9] min-h-[180px] md:min-h-[240px] mb-10 md:mb-12 border border-gold/14 bg-soot">
                    <SmartImage
                      src={images.bar}
                      alt="Carte du bar — softs et bières chez Mr Gaston à Mons"
                      fill
                      sizes="(max-width: 1024px) 100vw, 88vw"
                      className="object-contain p-3 md:p-6"
                    />
                  </div>
                ) : null}

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
