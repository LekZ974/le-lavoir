/**
 * Canonical public origin for URLs (canonical, OG, JSON-LD, sitemap fallbacks).
 * Production uses www — override anytime with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_ORIGIN_DEFAULT = "https://www.lelavoir.re";

export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, "");
  }
  return SITE_ORIGIN_DEFAULT;
}

/** E.164 or local format for JSON-LD / UI — set NEXT_PUBLIC_BUSINESS_PHONE */
export function getBusinessPhone(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim();
  return raw || undefined;
}
