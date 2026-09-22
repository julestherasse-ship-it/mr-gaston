export type AnalyticsEvent =
  | "click_phone"
  | "click_directions"
  | "click_order"
  | "click_menu"
  | "click_social"
  | "click_location"
  | "click_email"
  | "form_submit";

export type AnalyticsCta = "primary" | "secondary";

export type AnalyticsNetwork = "instagram" | "facebook";

export type AnalyticsParams = {
  placement?: string;
  cta?: AnalyticsCta;
  network?: AnalyticsNetwork;
  path?: string;
};

const PLACEMENT_BY_ID: Record<string, string> = {
  accueil: "hero",
  carte: "menu",
  histoire: "heritage",
  galerie: "gallery",
  avis: "reviews",
  contact: "location",
  faq: "location",
  fin: "finale",
  "quick-actions": "mobile_bar",
  "mobile-menu": "mobile_menu",
  "skip-link": "skip",
};

const PARAM_KEYS = ["placement", "cta", "network", "path"] as const;

function isCta(value: string | undefined): value is AnalyticsCta {
  return value === "primary" || value === "secondary";
}

function isNetwork(value: string | undefined): value is AnalyticsNetwork {
  return value === "instagram" || value === "facebook";
}

export function inferAnalyticsEvent(
  href: string,
  base = "https://mrgaston.be"
): { event: AnalyticsEvent; network?: AnalyticsNetwork } | undefined {
  const trimmed = href.trim();
  if (!trimmed || trimmed === "#" || trimmed.startsWith("javascript:")) return undefined;

  if (trimmed.startsWith("tel:")) return { event: "click_phone" };
  if (trimmed.startsWith("mailto:")) return { event: "click_email" };

  let url: URL;
  try {
    url = new URL(trimmed, base);
  } catch {
    return undefined;
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "foodbooking.com" || host.endsWith(".foodbooking.com")) {
    return { event: "click_order" };
  }
  if (host === "google.com" && url.pathname.startsWith("/maps")) {
    return { event: "click_directions" };
  }
  if (host === "maps.google.com") return { event: "click_directions" };
  if (host === "instagram.com" || host.endsWith(".instagram.com")) {
    return { event: "click_social", network: "instagram" };
  }
  if (host === "facebook.com" || host.endsWith(".facebook.com")) {
    return { event: "click_social", network: "facebook" };
  }

  if (url.hash === "#carte") return { event: "click_menu" };
  if (url.hash === "#contact") return { event: "click_location" };

  return undefined;
}

export function inferPlacement(node: Element | null): string | undefined {
  if (!node) return undefined;
  if (node.closest("#quick-actions")) return "mobile_bar";
  if (node.closest("#mobile-menu")) return "mobile_menu";
  if (node.closest("header")) return "header";
  if (node.closest("footer")) return "footer";
  const section = node.closest("section[id]");
  const id = section?.id;
  if (id && PLACEMENT_BY_ID[id]) return PLACEMENT_BY_ID[id];
  return undefined;
}

export function readCta(node: Element | null): AnalyticsCta | undefined {
  const tagged = node?.closest("[data-cta]");
  const value = tagged instanceof HTMLElement ? tagged.dataset.cta : undefined;
  return isCta(value) ? value : undefined;
}

function cleanParams(input?: AnalyticsParams): AnalyticsParams {
  const next: AnalyticsParams = {};
  if (!input) return next;
  for (const key of PARAM_KEYS) {
    const value = input[key];
    if (typeof value !== "string" || !value) continue;
    if (key === "cta" && !isCta(value)) continue;
    if (key === "network" && !isNetwork(value)) continue;
    if (key === "path" && (value.includes("?") || value.includes("@"))) continue;
    next[key] = value as never;
  }
  return next;
}

export function trackEvent(event: AnalyticsEvent, extra?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  const params = cleanParams({
    ...extra,
    path: extra?.path ?? window.location.pathname,
  });
  const payload = { event, ...params };

  const w = window as Window & {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
  w.gtag?.("event", event, params);
  window.dispatchEvent(new CustomEvent("gaston:analytics", { detail: payload }));
}
