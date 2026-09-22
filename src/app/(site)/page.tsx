import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HeritageSection from "@/components/home/HeritageSection";
import ServicesSection from "@/components/home/ServicesSection";
import GallerySection from "@/components/home/GallerySection";
import ReviewsSection from "@/components/home/ReviewsSection";
import LocationSection from "@/components/home/LocationSection";
import FinalCTA from "@/components/home/FinalCTA";
import { restaurantJsonLdScript } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: restaurantJsonLdScript }}
      />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <HeritageSection />
      <GallerySection />
      <ReviewsSection />
      <LocationSection />
      <FinalCTA />
    </>
  );
}
