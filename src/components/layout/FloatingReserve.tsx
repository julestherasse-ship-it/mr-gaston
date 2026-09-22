"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import PremiumButton from "@/components/ui/PremiumButton";

export default function FloatingReserve() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let locked = document.getElementById("intro-gate")?.dataset.state === "play";

    const update = () => {
      if (locked) {
        setVisible(false);
        ticking = false;
        return;
      }

      const hero = document.getElementById("accueil");
      const contact = document.getElementById("contact");
      const finale = document.getElementById("fin");
      const footer = document.querySelector("footer");
      const bottomGuard = 72;

      const pastHero = Boolean(hero && hero.getBoundingClientRect().bottom < 88);
      const overContact = Boolean(
        contact && contact.getBoundingClientRect().top < window.innerHeight - bottomGuard
      );
      const overFinale = Boolean(
        finale && finale.getBoundingClientRect().top < window.innerHeight - bottomGuard
      );
      const overFooter = Boolean(
        footer && footer.getBoundingClientRect().top < window.innerHeight - 56
      );

      setVisible(pastHero && !overContact && !overFinale && !overFooter);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onLock = () => {
      locked = true;
      update();
    };
    const onUnlock = () => {
      locked = false;
      update();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("gaston:lock-scroll", onLock);
    window.addEventListener("gaston:unlock-scroll", onUnlock);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("gaston:lock-scroll", onLock);
      window.removeEventListener("gaston:unlock-scroll", onUnlock);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[35] lg:hidden transition-transform duration-[var(--duration)] ease-[var(--ease-out)] ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      id="quick-actions"
      aria-hidden={!visible}
      inert={!visible || undefined}
    >
      <nav
        aria-label="Actions rapides"
        className="bg-night/96 backdrop-blur-md border-t border-gold/14"
      >
        <div className="page-shell flex items-center gap-3 pt-2.5 pb-[calc(0.55rem+env(safe-area-inset-bottom,0px))]">
          <PremiumButton
            href={`tel:${siteConfig.phoneHref}`}
            variant="outlineOnDark"
            size="md"
            className="flex-1 min-h-12 px-3"
            arrow={false}
          >
            Appeler
          </PremiumButton>
          <PremiumButton
            href={siteConfig.orderUrl}
            external
            size="md"
            className="flex-[1.45] min-h-12 px-3"
            cta="primary"
          >
            Commander
          </PremiumButton>
        </div>
      </nav>
    </div>
  );
}
