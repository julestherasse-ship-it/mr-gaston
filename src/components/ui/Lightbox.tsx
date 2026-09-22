"use client";

import { useCallback, useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import SmartImage from "@/components/ui/SmartImage";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const subscribe = () => () => {};

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const open = index !== null;
  const current = open ? images[index] : null;
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const trap = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(nodes);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!mounted || !open) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const inertNodes = [
      document.getElementById("skip-link"),
      document.querySelector("header"),
      document.querySelector("main"),
      document.querySelector("footer"),
      document.getElementById("quick-actions"),
    ];
    for (const node of inertNodes) node?.setAttribute("inert", "");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
      trap(event);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("gaston:lock-scroll"));
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("gaston:unlock-scroll"));
      for (const node of inertNodes) node?.removeAttribute("inert");
      returnFocus.current?.focus();
    };
  }, [mounted, open, onClose, onPrev, onNext, trap]);

  if (!mounted || !open || !current) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="lightbox-overlay fixed inset-0 z-[200] bg-night flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="icon-press absolute top-[max(0.75rem,env(safe-area-inset-top,0px))] right-3 md:top-6 md:right-6 text-cream/72 hover:text-cream min-h-12 min-w-12 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
        aria-label="Fermer la galerie"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            className="icon-press absolute left-2 md:left-6 max-lg:bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] max-lg:top-auto text-cream/72 hover:text-cream min-h-12 min-w-12 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
            aria-label="Photo précédente"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="icon-press absolute right-2 md:right-6 max-lg:bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] max-lg:top-auto text-cream/72 hover:text-cream min-h-12 min-w-12 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold"
            aria-label="Photo suivante"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </>
      )}
      <div className="relative w-full max-w-6xl h-[78vh]" onClick={(event) => event.stopPropagation()}>
        <SmartImage src={current.src} alt="" fill sizes="92vw" className="object-contain" />
      </div>
      <p
        id={titleId}
        className="absolute bottom-24 lg:bottom-5 left-1/2 -translate-x-1/2 text-cream/72 text-sm text-center px-4 sm:px-8 max-w-[min(36rem,calc(100%-5.5rem))]"
      >
        {current.alt}
      </p>
    </div>,
    document.body
  );
}
