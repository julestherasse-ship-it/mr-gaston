import Script from "next/script";
import { isIndexableDeployment } from "@/lib/site-url";

function gtmId() {
  const value = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
  return /^GTM-[A-Z0-9]+$/i.test(value) ? value : "";
}

function gaId() {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
  return /^G-[A-Z0-9]+$/i.test(value) ? value : "";
}

export default function AnalyticsScripts() {
  if (!isIndexableDeployment()) return null;

  const gtm = gtmId();
  const ga = gtm ? "" : gaId();

  return (
    <>
      {gtm ? (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':Date.now(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
      ) : null}
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script>
        </>
      ) : null}
    </>
  );
}
