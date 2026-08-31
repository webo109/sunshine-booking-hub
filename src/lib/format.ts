import { addDays, format, isSameMonth, isSameYear } from "date-fns";

const omrFormatter = new Intl.NumberFormat("en-OM", {
  style: "currency",
  currency: "OMR",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export function formatOMR(value: number): string {
  return omrFormatter.format(value);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd MMM yyyy");
}

/**
 * How many calendar days a tour occupies.
 *
 * `durationLabel` is the authoritative source because it is what the customer
 * already sees on the card ("2 days · 1 night", "Full day · 10 hrs"). We parse
 * the leading day count from it and fall back to `durationHours` only when the
 * label is not in the "N days" form — single-day tours ("Full day", "Half day",
 * "Long day") all occupy exactly one calendar day regardless of hours.
 */
export function tripDays(tour: { durationLabel: string; durationHours: number }): number {
  const fromLabel = /^(\d+)\s*days?\b/i.exec(tour.durationLabel.trim());
  if (fromLabel) return Math.max(1, parseInt(fromLabel[1], 10));
  // No "N days" prefix: anything that still runs past ~16h spans nights.
  if (tour.durationHours > 16) return Math.max(1, Math.ceil(tour.durationHours / 24));
  return 1;
}

/** Last calendar day of a trip that starts on `start` and runs `days` days. */
export function tripEndDate(start: Date | string, days: number): Date {
  const d = typeof start === "string" ? new Date(start) : start;
  return addDays(d, Math.max(1, days) - 1);
}

/**
 * Human-readable trip span, collapsing repeated month/year:
 *   same day    -> "09 Aug 2026"
 *   same month  -> "09 – 12 Aug 2026"
 *   same year   -> "28 Aug – 03 Sep 2026"
 *   spans years -> "28 Dec 2026 – 03 Jan 2027"
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const s = typeof start === "string" ? new Date(start) : start;
  const e = typeof end === "string" ? new Date(end) : end;

  if (format(s, "yyyy-MM-dd") === format(e, "yyyy-MM-dd")) return format(s, "dd MMM yyyy");
  if (isSameMonth(s, e) && isSameYear(s, e)) {
    return `${format(s, "dd")} – ${format(e, "dd MMM yyyy")}`;
  }
  if (isSameYear(s, e)) return `${format(s, "dd MMM")} – ${format(e, "dd MMM yyyy")}`;
  return `${format(s, "dd MMM yyyy")} – ${format(e, "dd MMM yyyy")}`;
}

export function isFridayOrPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return true;
  return date.getDay() === 5; // Friday
}
