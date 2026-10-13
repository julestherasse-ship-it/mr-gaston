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

  // Vercel injects VERCEL_ENV; Netlify injects CONTEXT.
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "preview" || vercelEnv === "development") return false;

  const netlifyContext = process.env.CONTEXT;
  if (
    netlifyContext === "deploy-preview" ||
    netlifyContext === "branch-deploy" ||
    netlifyContext === "dev"
  ) {
    return false;
  }

  return true;
}
