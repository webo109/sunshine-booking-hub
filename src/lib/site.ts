/**
 * Public origin of the deployed site.
 *
 * Social scrapers (WhatsApp, Facebook, X, LinkedIn) will not resolve a
 * root-relative og:image, so every share image must be absolutised through
 * `absoluteUrl` before it reaches a meta tag.
 */
export const SITE_ORIGIN = "https://sunshine-booking-hub.vercel.app";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
