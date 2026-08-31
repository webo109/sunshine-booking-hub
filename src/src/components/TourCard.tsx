import { Link } from "@tanstack/react-router";
import { Clock, Users, MapPin, ArrowUpRight } from "lucide-react";
import type { Tour } from "@/data/tours";
import { formatOMR } from "@/lib/format";
import { approxOne } from "@/lib/currency";

export function TourCard({ tour }: { tour: Tour }) {
  const onRequest = tour.priceOnRequest;
  const usdApprox = onRequest ? "" : approxOne(tour.adultPrice, "USD");
  return (
    <Link
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="ring-focus group block hover-lift rounded-2xl bg-card overflow-hidden border border-border"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent" />
        {/* One nowrap row, sized so even the worst case (Round Trip +
            Overnight + Challenging) stays on a single line at 4-up card width.
            Every card then reads identically instead of some wrapping. */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-1.5">
          <div className="flex min-w-0 gap-1">
            {tour.categories.slice(0, 2).map((c) => (
              <span
                key={c}
                className="whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-obsidian"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="shrink-0 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-foreground shadow-md shadow-brand/30">
            {tour.difficulty}
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-5 text-white">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider opacity-80">
            <MapPin className="h-3 w-3" /> {tour.region}
          </div>
          <h3 className="font-display text-xl font-bold leading-tight">{tour.shortName}</h3>
          <p className="mt-1 text-xs text-white/80 line-clamp-2">{tour.tagline}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {tour.durationLabel.split(" · ")[0]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Max {tour.maxGroup}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
          <div className="text-left sm:text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {onRequest ? "Quote" : "From"}
            </div>
            {/* nowrap: "On request" is narrower than the widest real price
                (OMR 1,380.000), so it never needs to wrap — without this it
                broke onto two lines and collided with the arrow button. */}
            <div className="font-display whitespace-nowrap text-base font-bold text-foreground">
              {onRequest ? "On request" : formatOMR(tour.adultPrice)}
            </div>
            {usdApprox && <div className="text-[10px] text-muted-foreground">{usdApprox}</div>}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
