// Static FX rates from OMR. The OMR is pegged to USD at ~2.6, so the USD rate
// is rock-stable; EUR/GBP/AED move slightly month-to-month. Refresh quarterly
// or wire to a free FX API (exchangerate.host) post-sale.
//
// Rates approximated for 2026.

const FX_FROM_OMR = {
  USD: 2.6,
  EUR: 2.4,
  GBP: 2.05,
  AED: 9.55,
} as const;

export type Currency = keyof typeof FX_FROM_OMR;

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
};

export function approxFromOMR(omr: number, currency: Currency): string {
  const rate = FX_FROM_OMR[currency];
  const amount = Math.round(omr * rate);
  return `${SYMBOLS[currency]}${amount.toLocaleString("en-US")}`;
}

/**
 * Returns a compact "≈ $169 · €156 · £133" string for a given OMR price.
 * Skips zero / NaN inputs.
 */
export function approxAllShort(omr: number): string {
  if (!omr || omr <= 0) return "";
  const usd = approxFromOMR(omr, "USD");
  const eur = approxFromOMR(omr, "EUR");
  const gbp = approxFromOMR(omr, "GBP");
  return `≈ ${usd} · ${eur} · ${gbp}`;
}

/**
 * Single-currency display, e.g. "≈ $169 USD".
 * Useful when space is tight (mobile cards, sticky sidebars).
 */
export function approxOne(omr: number, currency: Currency = "USD"): string {
  if (!omr || omr <= 0) return "";
  return `≈ ${approxFromOMR(omr, currency)} ${currency}`;
}
