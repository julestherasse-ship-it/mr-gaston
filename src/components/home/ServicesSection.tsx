import { displayDescription, menuCategories, type MenuItem } from "@/data/menu";
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

function splitItems(items: MenuItem[]) {
  return {
    photographed: items.filter((item) => item.image),
    listed: items.filter((item) => !item.image),
  };
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
            const { photographed, listed } = splitItems(category.items);
            const frites = category.id === "frites" ? listed.filter((item) => item.id.startsWith("f-")) : [];
            const sauces = category.id === "frites" ? listed.filter((item) => item.id.startsWith("sa-")) : [];
            const maisonSauces = sauces.filter((item) => Boolean(displayDescription(item.description) || item.tag));
            const otherSauces = sauces.filter((item) => !displayDescription(item.description) && !item.tag);
            const rows = category.id === "frites" ? [] : listed;
            const burgerPhotos = category.id === "burgers";

            return (
              <div key={category.id} id={`cat-${category.id}`}>
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

                {photographed.length > 0 ? (
                  <div
                    className={`grid grid-cols-1 gap-6 md:gap-8 mb-6 md:mb-10 ${
                      burgerPhotos
                        ? "lg:grid-cols-12 lg:items-stretch"
                        : photographed.length > 1
                          ? "md:grid-cols-2"
                          : ""
                    }`}
                  >
                    {photographed.map((item, index) => (
                      <div
                        key={item.id}
                        className={burgerPhotos ? (index === 0 ? "lg:col-span-7" : "lg:col-span-5") : ""}
                      >
                        <MenuDishCard
                          item={item}
                          featured={burgerPhotos && index === 0}
                          pair={burgerPhotos && index === 1}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {rows.length > 0 ? (
                  <ul>{rows.map((item) => <MenuDishRow key={item.id} item={item} />)}</ul>
                ) : null}

                {frites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
                    {frites.map((item) => (
                      <MenuPortionCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : null}

                {maisonSauces.length > 0 ? (
                  <div className="mb-4">
                    <p className="eyebrow text-cream/62 mb-4">Sauces</p>
                    <ul>{maisonSauces.map((item) => <MenuDishRow key={item.id} item={item} />)}</ul>
                  </div>
                ) : null}

                {otherSauces.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                    {otherSauces.map((item) => (
                      <MenuDishRow key={item.id} item={item} compact />
                    ))}
                  </ul>
                ) : null}
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
