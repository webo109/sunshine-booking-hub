import { formatDate, formatDateRange } from "@/lib/format";

/**
 * Shared pieces of the booking-flow recap panel.
 *
 * The trip span is shown twice in the flow — beside the calendar on the Date
 * step, and beside the form on the Details step — so it lives here rather than
 * being duplicated in the route.
 */

const dayOfWeekShort = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short" });

/**
 * Shows the customer exactly which days the tour occupies, so a multi-day
 * booking can't be read as a single-day one.
 */
export function TripSpanCard({
  date,
  endDate,
  isMultiDay,
  durationLabel,
}: {
  date: Date;
  endDate: Date;
  isMultiDay: boolean;
  durationLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-brand/25 bg-brand/[0.06] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-brand">
        Your trip
      </div>
      <div className="mt-1.5 font-display text-lg font-bold leading-tight text-foreground">
        {formatDateRange(date, endDate)}
      </div>
      {isMultiDay ? (
        <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between gap-3">
            <dt>Departs</dt>
            <dd className="font-medium text-foreground">
              {dayOfWeekShort(date)} · {formatDate(date)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Returns</dt>
            <dd className="font-medium text-foreground">
              {dayOfWeekShort(endDate)} · {formatDate(endDate)}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-1.5 text-xs text-muted-foreground">Starts and ends the same day.</p>
      )}
      <div className="mt-3 text-[11px] font-medium text-muted-foreground">
        {durationLabel}
      </div>
    </div>
  );
}

/** A label/value row in the recap panel, matching the trip card's type scale. */
export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt>{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
