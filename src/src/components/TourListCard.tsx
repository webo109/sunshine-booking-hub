import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, MapPin, Users } from "lucide-react";
import type { Tour } from "@/data/tours";
import { approxOne } from "@/lib/currency";
import { formatOMR } from "@/lib/format";

type VariantProps = {
  tour: Tour;
  onRequest: boolean;
  usdApprox: string;
};

export function TourListCard({ tour }: { tour: Tour }) {
  const onRequest = Boolean(tour.priceOnRequest);
  const usdApprox = onRequest ? "" : approxOne(tour.adultPrice, "USD");

  return (
    <article
      data-testid="tour-list-card"
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-obsidian/5"
    >
      {/* Desktop comes first in the DOM so existing keyboard and automated
          navigation consistently reaches the visible desktop link first. */}
      <DesktopTourListCard tour={tour} onRequest={onRequest} usdApprox={usdApprox} />
      <MobileTourListCard tour={tour} onRequest={onRequest} usdApprox={usdApprox} />
    </article>
  );
}

function DesktopTourListCard({ tour, onRequest, usdApprox }: VariantProps) {
  return (
    <div className="hidden sm:grid sm:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_220px]">
      <Link
        to="/tours/$slug"
        params={{ slug: tour.slug }}
        aria-label={`View ${tour.name}`}
        className="ring-focus relative block aspect-[16/9] overflow-hidden sm:row-span-2 sm:aspect-auto sm:min-h-[310px] xl:row-span-1 xl:min-h-[260px]"
      >
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/35 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian shadow-sm backdrop-blur-sm">
          <MapPin className="h-3 w-3 text-brand" />
          {tour.region}
        </span>
      </Link>

      <div className="min-w-0 p-4 sm:p-5 xl:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
            {tour.groupType} tour
          </span>
          {tour.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>

        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="ring-focus mt-3 inline-block rounded-sm font-display text-xl font-black leading-tight text-foreground transition-colors hover:text-brand sm:text-2xl"
        >
          {tour.name}
        </Link>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.tagline}</p>

        <ul className="mt-4 hidden gap-2 text-xs font-medium text-foreground/85 sm:grid lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {tour.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight} className="flex min-w-0 items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="line-clamp-2">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand" />
            {tour.durationLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-brand" />
            Up to {tour.maxGroup} guests
          </span>
          <span className="font-semibold text-foreground/75">{tour.difficulty}</span>
        </div>
      </div>

      <aside className="flex items-end justify-between gap-4 border-t border-border bg-muted/20 p-4 sm:col-start-2 sm:p-5 xl:col-start-auto xl:flex-col xl:items-stretch xl:justify-end xl:border-l xl:border-t-0 xl:bg-transparent xl:p-6 xl:text-right">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {onRequest ? "Tailored price" : "From"}
          </div>
          <div className="mt-1 font-display text-xl font-black leading-none text-foreground sm:text-2xl">
            {onRequest ? "On request" : formatOMR(tour.adultPrice)}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {onRequest ? "Built around your group" : "per adult"}
          </div>
          {usdApprox && <div className="mt-1 text-[10px] text-muted-foreground">{usdApprox}</div>}
        </div>

        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="ring-focus inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-xl xl:w-full"
        >
          View tour
          <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  );
}

function MobileTourListCard({ tour, onRequest, usdApprox }: VariantProps) {
  return (
    <div className="sm:hidden">
      <Link
        to="/tours/$slug"
        params={{ slug: tour.slug }}
        aria-label={`View ${tour.name}`}
        className="ring-focus relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {tour.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-obsidian shadow-sm backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
          <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-foreground shadow-md shadow-brand/30">
            {tour.difficulty}
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-4 text-white">
          <div className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/75">
            <MapPin className="h-3 w-3" />
            {tour.region}
          </div>
          <h2 className="font-display text-2xl font-black leading-none">{tour.shortName}</h2>
          <p className="mt-2 max-w-[95%] text-xs leading-snug text-white/80 line-clamp-2">
            {tour.tagline}
          </p>
        </div>
      </Link>

      <div className="grid min-h-[92px] grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)_44px] items-center gap-2 p-4">
        <div className="flex min-w-0 flex-col gap-2 text-xs text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{tour.durationLabel.split("·")[0].trim()}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0" />
            Max {tour.maxGroup}
          </span>
        </div>

        <div className="min-w-0 text-right">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
            {onRequest ? "Tailored price" : "From"}
          </div>
          <div className="mt-0.5 font-display whitespace-nowrap text-base font-black leading-none text-foreground">
            {onRequest ? "On request" : formatOMR(tour.adultPrice)}
          </div>
          <div className="mt-1 truncate text-[9px] text-muted-foreground">
            {onRequest ? "For your group" : usdApprox}
          </div>
        </div>

        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          aria-label={`View ${tour.name}`}
          className="ring-focus flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/25 transition-transform hover:translate-x-0.5"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
