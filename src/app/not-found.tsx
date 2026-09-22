import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFoundView from "@/components/not-found/NotFoundView";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas. Retrouvez Mr Gaston, friterie artisanale à Mons.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <>
      <a
        id="skip-link"
        href="#contenu"
        className="sr-only focus:not-sr-only focus-visible:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-cream focus:text-night focus:px-4 focus:py-2 focus:rounded-none"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu">
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
