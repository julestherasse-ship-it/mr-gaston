"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { headerNav, siteConfig } from "@/data/site";
import { images } from "@/data/images";
import PremiumButton, { NewWindowText } from "@/components/ui/PremiumButton";

function sectionId(href: string) {
  return href.replace("/#", "");
}

function setInert(node: Element | null, value: boolean) {
  if (!node) return;
  if (value) node.setAttribute("inert", "");
  else node.removeAttribute("inert");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const hamRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      if (y < 48) {
        setActive(null);
        ticking = false;
        return;
      }

      const marker = Math.round(window.innerHeight * 0.22);
      let current: string | null = null;
      for (const link of headerNav) {
        const node = document.getElementById(sectionId(link.href));
        if (!node) continue;
        if (node.getBoundingClientRect().top <= marker) current = sectionId(link.href);
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
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  useEffect(() => {
    const skip = document.getElementById("skip-link");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    document.body.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(new Event(open ? "gaston:lock-scroll" : "gaston:unlock-scroll"));
    setInert(skip, open);
    setInert(main, open);
    setInert(footer, open);

    if (open) {
      menuRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("gaston:unlock-scroll"));
      setInert(skip, false);
      setInert(main, false);
      setInert(footer, false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        hamRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = [
        document.getElementById("site-logo"),
        hamRef.current,
        ...(menuRef.current
          ? Array.from(menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
          : []),
      ].filter((el): el is HTMLElement => Boolean(el));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const setHeight = () => {
      const height = Math.round(node.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty("--header-h", `${height}px`);
      }
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [scrolled, open]);

  const elevated = scrolled || open;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-[var(--duration)] ease-[var(--ease-out)] ${
          elevated
            ? "bg-night/94 backdrop-blur-md border-gold/14 shadow-[0_12px_40px_rgba(0,0,0,0.28)] pb-2.5 lg:py-3"
            : "bg-transparent border-transparent shadow-none pb-3.5 lg:py-5"
        }`}
        style={{ paddingTop: `calc(${elevated ? "0.55rem" : "0.85rem"} + env(safe-area-inset-top, 0px))` }}
      >
        <nav aria-label="Navigation principale" className="relative z-50 page-shell flex items-center justify-between gap-4 min-w-0">
          <Link
            id="site-logo"
            href="/#accueil"
            className="relative z-10 flex items-center min-h-11 min-w-11 shrink-0 transition-opacity duration-[var(--duration)] ease-[var(--ease-out)] hover:opacity-80"
            aria-label="Mr Gaston — accueil"
            onClick={close}
          >
            <Image
              src={images.logo}
              alt=""
              width={148}
              height={169}
              sizes="80px"
              quality={75}
              loading="eager"
              fetchPriority="low"
              decoding="async"
              className={`object-contain w-auto origin-left transition-[height] duration-[var(--duration)] ease-[var(--ease-out)] ${
                elevated ? "h-10 md:h-11" : "h-11 md:h-12"
              }`}
            />
          </Link>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:gap-10">
            {headerNav.map((link) => {
              const id = sectionId(link.href);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <PremiumButton href={siteConfig.orderUrl} external size="sm" cta="primary">
                Commander
              </PremiumButton>
            </div>
            <button
              ref={hamRef}
              type="button"
              className="lg:hidden relative z-[60] flex h-12 w-12 items-center justify-center text-cream icon-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
              aria-expanded={open}
              aria-controls={open ? "mobile-menu" : undefined}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="flex flex-col items-end gap-[7px]" aria-hidden>
                <span
                  className={`block h-px w-5 bg-current origin-center transition-transform duration-[var(--duration)] ease-[var(--ease-out)] ${
                    open ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-current origin-center transition-transform duration-[var(--duration)] ease-[var(--ease-out)] ${
                    open ? "-translate-y-[4px] -rotate-45" : "scale-x-[0.72] origin-right"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="mobile-menu lg:hidden fixed inset-0 z-40 bg-night"
        >
          <div className="mobile-menu__inner flex flex-col min-h-dvh overflow-y-auto overscroll-contain page-shell pt-[calc(var(--header-h,5.25rem)+0.35rem)] pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <div className="mt-auto flex min-h-0 flex-col">
              <ul className="flex flex-col">
                {headerNav.map((link) => {
                  const id = sectionId(link.href);
                  const isActive = active === id;
                  return (
                    <li key={link.href} className="mobile-menu__item">
                      <a
                        href={link.href}
                        onClick={close}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-center min-h-12 sm:min-h-14 border-b title text-[1.6rem] sm:text-[1.85rem] leading-none transition-colors duration-[var(--duration)] ease-[var(--ease-out)] ${
                          isActive ? "text-cream border-gold/40" : "text-cream/72 border-cream/12 hover:text-cream"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid grid-cols-1 gap-2.5">
                <PremiumButton href={siteConfig.orderUrl} external className="w-full" size="lg" onClick={close} cta="primary">
                  Commander
                </PremiumButton>
                <PremiumButton
                  href={`tel:${siteConfig.phoneHref}`}
                  variant="outlineOnDark"
                  className="w-full"
                  size="lg"
                  arrow={false}
                  onClick={close}
                >
                  Appeler
                </PremiumButton>
                <address className="not-italic mt-4 space-y-0.5 text-sm text-cream/72">
                  <p>
                    <a
                      href={siteConfig.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)]"
                      onClick={close}
                    >
                      {siteConfig.address}, {siteConfig.postalCode} {siteConfig.city}
                      <NewWindowText />
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${siteConfig.phoneHref}`}
                      className="inline-flex min-h-11 items-center hover:text-cream transition-colors duration-[var(--duration)] ease-[var(--ease-out)]"
                    >
                      {siteConfig.phone}
                    </a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
