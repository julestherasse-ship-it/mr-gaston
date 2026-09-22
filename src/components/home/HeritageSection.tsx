import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionIndex from "@/components/ui/SectionIndex";
import SmartImage from "@/components/ui/SmartImage";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";

export default function HeritageSection() {
  return (
    <section id="histoire" aria-labelledby="heritage-heading" className="relative bg-soot text-cream section-y scroll-mt-28 max-lg:pb-28">
      <div className="page-shell">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start">
          <AnimatedSection className="md:col-span-5">
            <SectionIndex index="02" label="La maison" light />
            <h2 id="heritage-heading" className="font-display section-display max-w-[11ch] mb-7 md:mb-9">
              Back to
              <br />
              <span className="font-italic">the Friture.</span>
            </h2>
            <div className="space-y-5 body-copy text-cream/72 max-w-md">
              <p>{siteConfig.aboutBody}</p>
              <p>{siteConfig.aboutClose}</p>
            </div>
            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 eyebrow text-cream/62 tracking-[0.14em]">
              {siteConfig.hashtags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>
          </AnimatedSection>

          <AnimatedSection className="md:col-span-7">
            <div className="photo-frame group relative aspect-[5/4] lg:aspect-[5/6]">
              <SmartImage
                src={images.slider}
                alt="Mascotte Mr Gaston et burger maison, à Mons"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center img-zoom"
              />
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-20 md:mt-28">
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {siteConfig.whyChoose.map((item, i) => (
              <li key={item.title}>
                <p className="eyebrow text-gold/80 mb-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="title text-[1.55rem] md:text-[1.75rem] mb-3">{item.title}</h3>
                <p className="text-sm md:text-[0.95rem] leading-relaxed text-cream/72 max-w-[20rem]">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
