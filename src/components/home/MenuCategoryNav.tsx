"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory, MenuCategoryData } from "@/data/menu";

export default function MenuCategoryNav({ categories }: { categories: MenuCategoryData[] }) {
  const [active, setActive] = useState<MenuCategory>(categories[0]?.id ?? "burgers");
  const [pinned, setPinned] = useState(false);
  const [navH, setNavH] = useState(48);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!categories.length) return;

    let ticking = false;
    const update = () => {
      const marker = Math.round(window.innerHeight * 0.32);
      let current = categories[0]?.id ?? "burgers";
      for (const category of categories) {
        const node = document.getElementById(`cat-${category.id}`);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= marker) current = category.id;
      }
      setActive(current);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavH(navRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const headerH = document.querySelector("header")?.getBoundingClientRect().height || 68;
      const sentinel = document.getElementById("menu-nav-sentinel");
      const carte = document.getElementById("carte");
      if (!sentinel || !carte) {
        ticking = false;
        return;
      }
      const shouldPin =
        sentinel.getBoundingClientRect().top <= headerH &&
        carte.getBoundingClientRect().bottom > headerH + navH + 16;
      setPinned(shouldPin);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navH]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const chip = scroller?.querySelector<HTMLElement>(`[data-menu-cat="${active}"]`);
    if (!scroller || !chip) return;

    const chipRect = chip.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const delta = chipRect.left - scrollerRect.left - (scrollerRect.width - chipRect.width) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <div className="mb-12 md:mb-16">
      <div id="menu-nav-sentinel" />
      {pinned ? <div style={{ height: navH }} aria-hidden /> : null}
      <nav
        ref={navRef}
        aria-label="Catégories de la carte"
        className={`relative z-30 bg-night ${
          pinned
            ? "fixed top-[var(--header-h,4.35rem)] inset-x-0 border-t-0 border-b border-gold/14 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
            : "border-y border-gold/14"
        }`}
      >
        <ul
          ref={scrollerRef}
          className="page-shell flex gap-0 overflow-x-auto overscroll-x-contain no-scrollbar snap-x snap-mandatory scroll-px-4 touch-pan-x [-webkit-overflow-scrolling:touch] max-lg:pr-12"
        >
          {categories.map((category) => {
            const isActive = active === category.id;
            return (
              <li key={category.id} className="shrink-0 snap-start">
                <a
                  href={`#cat-${category.id}`}
                  data-menu-cat={category.id}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(category.id)}
                  className={`chip-link eyebrow inline-flex min-h-12 items-center px-4 sm:px-5 whitespace-nowrap ${
                    isActive ? "text-cream" : "text-cream/62 hover:text-cream"
                  }`}
                >
                  {category.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-night to-transparent lg:hidden"
        />
      </nav>
    </div>
  );
}
