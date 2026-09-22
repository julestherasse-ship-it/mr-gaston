import { Fraunces, Figtree } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/site";
import { getSiteOrigin, isIndexableDeployment } from "@/lib/site-url";
import AnalyticsListener from "@/components/layout/AnalyticsListener";
import AnalyticsScripts from "@/components/layout/AnalyticsScripts";
import "./globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz", "WONK"],
  preload: true,
  adjustFontFallback: true,
});

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500"],
  preload: true,
  adjustFontFallback: true,
});

const canonical = getSiteOrigin();
const indexable = isIndexableDeployment();

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: siteConfig.ogImageAlt,
  type: "image/jpeg" as const,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141312" },
    { media: "(prefers-color-scheme: light)", color: "#141312" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: canonical }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "restaurant",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: siteConfig.name,
    title: siteConfig.ogTitle,
    description: siteConfig.description,
    url: canonical,
    emails: [siteConfig.email],
    phoneNumbers: [siteConfig.phoneHref],
    countryName: "Belgium",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.ogTitle,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: {
    canonical,
    languages: {
      "fr-BE": canonical,
      "x-default": canonical,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
    capable: false,
  },
  other: {
    "geo.region": "BE-WHT",
    "geo.placename": "Mons",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-BE" className={`${display.variable} ${sans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <AnalyticsScripts />
        <AnalyticsListener />
        <div id="intro-gate" hidden suppressHydrationWarning />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var g=document.getElementById("intro-gate");if(!g)return;var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;var slow=Boolean(conn&&(conn.saveData||conn.effectiveType==="slow-2g"||conn.effectiveType==="2g"||conn.effectiveType==="3g"));var bot=/Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Applebot|Bytespider/i.test(navigator.userAgent);var seen=false;try{seen=sessionStorage.getItem("gaston:intro")==="seen";}catch(e){}var skip=reduce||slow||bot||seen||window.location.pathname!=="/"||Boolean(window.location.hash);g.setAttribute("data-state",skip?"skip":"play");function done(){if(g.getAttribute("data-state")==="play")g.setAttribute("data-state","done");try{sessionStorage.setItem("gaston:intro","seen");}catch(e){}window.dispatchEvent(new Event("gaston:unlock-scroll"));}if(skip)return;window.dispatchEvent(new Event("gaston:lock-scroll"));window.setTimeout(done,1600);}catch(e){var x=document.getElementById("intro-gate");if(x)x.setAttribute("data-state","skip");}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
