"use client";

import { useEffect, type ReactNode } from "react";
import type Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const useLenis = !prefersReduced && !coarse;

    let cancelled = false;
    let lenis: Lenis | null = null;

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;
      const headerH = document.querySelector("header")?.getBoundingClientRect().height || 72;
      const cssMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop);
      const margin = Number.isFinite(cssMargin) && cssMargin > 0 ? cssMargin : headerH;
      const current = lenis ? lenis.scroll : window.scrollY;
      const top = Math.max(0, target.getBoundingClientRect().top + current - margin);
      if (lenis) {
        lenis.scrollTo(top, {
          immediate,
          duration: immediate ? 0 : 0.9,
        });
        return;
      }
      window.scrollTo({ top, behavior: prefersReduced || immediate ? "auto" : "smooth" });
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a[href^='#'], a[href^='/#']");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || href === "/#") return;
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      event.preventDefault();
      history.pushState(null, "", hash);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(hash));
      });
    };

    const lock = () => lenis?.stop();
    const unlock = () => lenis?.start();
    window.addEventListener("gaston:lock-scroll", lock);
    window.addEventListener("gaston:unlock-scroll", unlock);
    document.addEventListener("click", onClick);

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, true));
    }

    if (useLenis) {
      void import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({
          duration: 0.7,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          autoRaf: true,
          anchors: false,
        });
        document.documentElement.classList.add("lenis", "lenis-smooth");
        if (document.getElementById("intro-gate")?.dataset.state === "play") {
          lenis.stop();
        }
        if (window.location.hash) {
          scrollToHash(window.location.hash, true);
        }
      });
    }

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      window.removeEventListener("gaston:lock-scroll", lock);
      window.removeEventListener("gaston:unlock-scroll", unlock);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
