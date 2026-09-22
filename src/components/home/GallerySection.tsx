import SectionIndex from "@/components/ui/SectionIndex";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryGrid from "@/components/home/GalleryGrid";

export default function GallerySection() {
  return (
    <section id="galerie" aria-labelledby="galerie-heading" className="bg-paper text-ink section-y scroll-mt-28 max-lg:pb-28">
      <div className="page-shell">
        <AnimatedSection>
          <SectionIndex index="03" label="Galerie" />
          <h2 id="galerie-heading" className="font-display section-display mb-14 md:mb-24 max-w-3xl">
            Le pain.
            <br />
            Les frites.
            <br />
            <span className="font-italic">Le détail.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <GalleryGrid />
        </AnimatedSection>
      </div>
    </section>
  );
}
