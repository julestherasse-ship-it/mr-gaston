"use client";

import { useEffect } from "react";
import {
  inferAnalyticsEvent,
  inferPlacement,
  readCta,
  trackEvent,
  type AnalyticsParams,
} from "@/lib/analytics";

function trackFromAnchor(anchor: HTMLAnchorElement) {
  if (anchor.id === "skip-link") return;
  const inferred = inferAnalyticsEvent(anchor.href);
  if (!inferred) return;

  const params: AnalyticsParams = {};
  const placement = inferPlacement(anchor);
  const cta = readCta(anchor);
  if (placement) params.placement = placement;
  if (cta) params.cta = cta;
  if (inferred.network) params.network = inferred.network;
  trackEvent(inferred.event, params);
}

export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 && event.button !== 1) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor?.href) return;
      trackFromAnchor(anchor);
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      trackEvent("form_submit", { placement: inferPlacement(form) });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
