import { siteConfig } from "@/data/site";

export function getSiteOrigin() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = fromEnv || siteConfig.website;
  try {
    return new URL(candidate).origin;
  } catch {
    return new URL(siteConfig.website).origin;
  }
}

export function isIndexableDeployment() {
  if (process.env.NODE_ENV !== "production") return false;
  const env = process.env.VERCEL_ENV;
  return env !== "preview" && env !== "development";
}
