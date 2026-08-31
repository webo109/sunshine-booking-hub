import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/site";
import {
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Mountain,
  PlayCircle,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getTourBySlug, type Tour } from "@/data/tours";
import { formatOMR } from "@/lib/format";
import { approxAllShort } from "@/lib/currency";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }): { tour: Tour } => {
    const tour = getTourBySlug(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.tour.name} · Sunshine Tours Oman` },
          { name: "description", content: loaderData.tour.tagline },
          { property: "og:title", content: loaderData.tour.name },
          { property: "og:description", content: loaderData.tour.tagline },
          { property: "og:image", content: absoluteUrl(loaderData.tour.image) },
          { name: "twitter:image", content: absoluteUrl(loaderData.tour.image) },
        ]
      : [{ title: "Tour · Sunshine Tours Oman" }],
  }),
  component: TourDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 pt-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Tour not found</h1>
        <Link
          to="/tours"
          className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          Back to all tours
        </Link>
      </div>
    </div>
  ),
});

function TourDetail() {
  const { tour } = Route.useLoaderData();
  const galleryImages = useMemo(() => {
    const all = [tour.image, ...(tour.gallery ?? [])];
    return Array.from(new Set(all));
  }, [tour.image, tour.gallery]);
  const [activeImage, setActiveImage] = useState<string>(tour.image);
  const [videoOpen, setVideoOpen] = useState(false);

  // Close the video modal on Escape + lock background scroll while open.
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  return (
    <article className="pb-24 pt-20 md:pt-24 lg:pb-0">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 pt-6 md:px-8"
      >
        <ol className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <Link to="/tours" className="hover:text-foreground">
              Tours
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="font-semibold text-foreground truncate max-w-[200px] md:max-w-none">
            {tour.shortName}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* LEFT: Hero image + content */}
          <div className="min-w-0">
            {/* Hero image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-obsidian sm:aspect-[16/10] md:rounded-3xl">
              <img
                key={activeImage}
                src={activeImage}
                alt={tour.name}
                className="animate-fade-up h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {tour.categories.map((c: string) => (
                  <span
                    key={c}
                    className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian backdrop-blur"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery thumbnail strip: only when 2+ unique photos */}
            {galleryImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={`View photo ${i + 1} of ${galleryImages.length}`}
                    aria-pressed={img === activeImage}
                    className={cn(
                      "ring-focus relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                      img === activeImage
                        ? "border-brand shadow-md shadow-brand/30"
                        : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title block */}
            <header className="mt-6">
              <h1 className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-5xl">
                {tour.name}
              </h1>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand" /> {tour.durationLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-brand" /> Max {tour.maxGroup} guests
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand" /> {tour.region}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mountain className="h-4 w-4 text-brand" /> {tour.difficulty}
                </span>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/85">
                {tour.description}
              </p>
            </header>

            {/* Highlights */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Highlights
              </h2>
              <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span className="text-sm text-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Video card: only when this tour has a youtubeId set */}
            {tour.youtubeId && (
              <section className="mt-10">
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Watch ${tour.shortName} tour video`}
                  className="ring-focus group relative block aspect-video w-full overflow-hidden rounded-3xl bg-obsidian shadow-xl shadow-black/10 transition-transform hover:scale-[1.01]"
                >
                  <img
                    /* hqdefault, not maxresdefault: YouTube serves a 120x90 grey
                       placeholder with HTTP 200 when maxres is missing, so onError
                       never fires and the card renders a stretched grey box. */
                    src={`https://i.ytimg.com/vi/${tour.youtubeId}/hqdefault.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-obsidian/30" />

                  {/* Top-left label */}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-red-600/30">
                    <PlayCircle className="h-3 w-3" /> Watch the tour
                  </span>

                  {/* Centered play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600/95 text-white shadow-2xl shadow-red-600/40 transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                      <PlayCircle className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Bottom-left caption */}
                  <div className="absolute inset-x-4 bottom-4 text-left text-white md:inset-x-5 md:bottom-5">
                    <p className="font-display text-base font-bold leading-tight md:text-2xl">
                      {tour.shortName}, see it in motion.
                    </p>
                    <p className="mt-1 text-[11px] text-white/70 md:text-xs">
                      Filmed by Sunshine Tours · plays in-page · no leaving the site
                    </p>
                  </div>
                </button>
              </section>
            )}

            {/* Itinerary */}
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Itinerary
              </h2>
              <ol className="mt-6 space-y-1">
                {tour.itinerary.map((stop, i) => (
                  <li key={i} className="relative flex gap-4 pb-5 pl-2">
                    <div className="relative flex flex-col items-center">
                      <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground shadow-sm shadow-brand/30">
                        {i + 1}
                      </span>
                      {i < tour.itinerary.length - 1 && (
                        <span className="absolute top-8 h-full w-0.5 bg-border" />
                      )}
                    </div>
                    <div className="-mt-0.5 flex-1 pb-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand">
                        {stop.time}
                      </div>
                      <div className="mt-1 font-display text-base font-bold text-foreground">
                        {stop.title}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{stop.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Inclusions / exclusions */}
            <section className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold text-brand">What's Included</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.inclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-base font-bold text-destructive">Not Included</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.exclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Logistics */}
            <section className="mt-12 rounded-2xl bg-muted/40 p-6">
              <h3 className="font-display text-base font-bold">Logistics</h3>
              <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Pickup
                  </dt>
                  <dd className="mt-1 text-foreground">{tour.pickup}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Meeting Point
                  </dt>
                  <dd className="mt-1 text-foreground">{tour.meetingPoint}</dd>
                </div>
              </dl>
            </section>
          </div>

          {/* RIGHT: Sticky booking sidebar */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tour.priceOnRequest ? "Custom quote" : "From"}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                {tour.priceOnRequest ? (
                  <span className="font-display text-3xl font-black text-brand">On request</span>
                ) : (
                  <>
                    <span className="font-display text-4xl font-black text-brand">
                      {formatOMR(tour.adultPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground">/ adult</span>
                  </>
                )}
              </div>
              {tour.priceOnRequest ? (
                <div className="mt-1 text-xs text-muted-foreground">
                  Tailored to your dates and group size.
                </div>
              ) : (
                <>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Children (3–12): {formatOMR(tour.childPrice)}
                  </div>
                  <div className="mt-1.5 text-[11px] text-muted-foreground">
                    {approxAllShort(tour.adultPrice)}
                  </div>
                </>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-muted/40 p-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="mt-0.5 font-semibold text-foreground">
                    {tour.durationLabel.split(" · ")[0]}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Group</div>
                  <div className="mt-0.5 font-semibold text-foreground">
                    {tour.groupType} · {tour.maxGroup}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Difficulty</div>
                  <div className="mt-0.5 font-semibold text-foreground">{tour.difficulty}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Region</div>
                  <div className="mt-0.5 font-semibold text-foreground">{tour.region}</div>
                </div>
              </div>

              {tour.priceOnRequest ? (
                <a
                  href={`https://api.whatsapp.com/send?phone=96896964811&text=${encodeURIComponent(`Hi Sunshine Tours, I'd like a quote for the ${tour.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ring-focus mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02]"
                >
                  Inquire on WhatsApp
                </a>
              ) : (
                <Link
                  to="/book/$slug"
                  params={{ slug: tour.slug }}
                  className="ring-focus mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02]"
                >
                  Request to book
                </Link>
              )}

              <ul className="mt-5 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand" /> Free cancellation up to 48h
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" /> Licensed Omani guide
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" /> We reply within 24 hours
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border glass p-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {tour.priceOnRequest ? "Quote" : "From"}
            </div>
            <div className="font-display text-base font-bold text-brand">
              {tour.priceOnRequest ? "On request" : formatOMR(tour.adultPrice)}
            </div>
          </div>
          {tour.priceOnRequest ? (
            <a
              href={`https://api.whatsapp.com/send?phone=96896964811&text=${encodeURIComponent(`Hi Sunshine Tours, I'd like a quote for the ${tour.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus rounded-full bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30"
            >
              Inquire
            </a>
          ) : (
            <Link
              to="/book/$slug"
              params={{ slug: tour.slug }}
              className="ring-focus rounded-full bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30"
            >
              Request
            </Link>
          )}
        </div>
      </div>

      {/* Video modal */}
      {videoOpen && tour.youtubeId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${tour.shortName} video`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur"
          onClick={() => setVideoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            className="ring-focus absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${tour.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${tour.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs text-white/60">
              Press Esc or click outside to close · video served from YouTube
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
