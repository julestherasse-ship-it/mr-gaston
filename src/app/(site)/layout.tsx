import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingReserve from "@/components/layout/FloatingReserve";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <a
        id="skip-link"
        href="#contenu"
        className="sr-only focus:not-sr-only focus-visible:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-cream focus:text-night focus:px-4 focus:py-2 focus:rounded-none"
      >
        Aller au contenu
      </a>
      <div className="brand-intro" aria-hidden="true">
        <div className="brand-intro__inner">
          <div className="brand-intro__mark" />
          <span className="brand-intro__rule" />
        </div>
      </div>
      <Navbar />
      <main id="contenu">
        {children}
      </main>
      <Footer />
      <FloatingReserve />
    </SmoothScroll>
  );
}
