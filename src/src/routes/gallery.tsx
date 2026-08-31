import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, ChevronLeft, ChevronRight, Film, PlayCircle, X } from "lucide-react";
import { tours } from "@/data/tours";
import wadiShab from "@/assets/dest-wadi-shab.jpg";
import jebelShams from "@/assets/dest-jebel-shams.jpg";
import muscat from "@/assets/dest-muscat.jpg";
import nizwa from "@/assets/dest-nizwa.jpg";
import salalah from "@/assets/dest-salalah.jpg";
import misfat from "@/assets/dest-misfat.jpg";
import heroDesert from "@/assets/hero-desert.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Photo gallery of our private tours across Oman: wadis, deserts, mountains, heritage villages, and the dramatic Dhofar coast.",
      },
    ],
  }),
  component: GalleryPage,
});

interface Photo {
  src: string;
  caption: string;
  region: string;
  category: GalleryCategory;
  span?: "tall" | "wide" | "square";
  tourSlug?: string;
}

type GalleryCategory = "All" | "Desert" | "Mountain" | "Wadi" | "City" | "Coast" | "Heritage";

const photos: Photo[] = [
  {
    src: heroDesert,
    caption: "The last 20 minutes of light, looking east from the highest dune in the Wahiba.",
    region: "Ash Sharqiyah",
    category: "Desert",
    span: "wide",
    tourSlug: "wahiba-sands-overnight",
  },
  {
    src: wadiShab,
    caption: "The first turquoise pool you reach after the boat ride into the wadi mouth.",
    region: "Ash Sharqiyah",
    category: "Wadi",
    span: "tall",
    tourSlug: "wadi-shab-emerald-pools",
  },
  {
    src: jebelShams,
    caption: "Standing at the rim of Arabia's deepest canyon at 2,000 m, no railing in sight.",
    region: "Ad Dakhiliyah",
    category: "Mountain",
    tourSlug: "jebel-shams-grand-canyon",
  },
  {
    src: muscat,
    caption:
      "The main prayer hall of the Sultan Qaboos Grand Mosque, in Omani sandstone and Italian marble.",
    region: "Muscat",
    category: "City",
    span: "square",
    tourSlug: "muscat-city-private",
  },
  {
    src: nizwa,
    caption: "Nizwa Fort's defensive tower at golden hour, just before the muezzin's evening call.",
    region: "Ad Dakhiliyah",
    category: "Heritage",
    tourSlug: "nizwa-friday-souq",
  },
  {
    src: salalah,
    caption:
      "Dhofar's southern coast in late August, three months green from the Khareef monsoon mist.",
    region: "Dhofar",
    category: "Coast",
    span: "wide",
    tourSlug: "salalah-discovery",
  },
  {
    src: misfat,
    caption: "A 400-year-old village still farmed via the original falaj water system.",
    region: "Ad Dakhiliyah",
    category: "Heritage",
    span: "tall",
    tourSlug: "misfat-heritage",
  },
  {
    src: jebelShams,
    caption:
      "The Balcony Walk traces the canyon rim for three hours, past abandoned cliffside villages.",
    region: "Ad Dakhiliyah",
    category: "Mountain",
    span: "square",
    tourSlug: "jebel-shams-grand-canyon",
  },
  {
    src: wadiShab,
    caption: "The hidden waterfall inside the cave you swim into at the end of the wadi.",
    region: "Ash Sharqiyah",
    category: "Wadi",
    span: "wide",
    tourSlug: "wadi-shab-emerald-pools",
  },
  {
    src: heroDesert,
    caption: "The Milky Way overhead at the Bedouin camp, with no light pollution for 100 km.",
    region: "Ash Sharqiyah",
    category: "Desert",
    span: "wide",
    tourSlug: "wahiba-sands-overnight",
  },
  {
    src: salalah,
    caption:
      "A wild Boswellia tree near Wadi Dawkah, the source of the world's most sought-after frankincense.",
    region: "Dhofar",
    category: "Heritage",
    span: "wide",
    tourSlug: "al-luban-frankincense-trail",
  },
];

// Pull all tours that have a youtubeId set, used by the Videos tab below.
const videoTours = tours.filter((t) => t.youtubeId);

// Hero stats and decorative imagery are derived from the gallery data so the
// presentation stays accurate as new photos are added.
const regionCount = new Set(photos.map((p) => p.region)).size;
const mosaicColumns = [
  [wadiShab, nizwa, misfat],
  [jebelShams, salalah, muscat],
];

const categories: GalleryCategory[] = [
  "All",
  "Desert",
  "Mountain",
  "Wadi",
  "City",
  "Coast",
  "Heritage",
];

type Tab = "photos" | "videos";

function GalleryPage() {
  const [tab, setTab] = useState<Tab>("photos");
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Featured hero is the first photo with a wide span (the headline image of the gallery).
  const featured = photos.find((p) => p.span === "wide") ?? photos[0];
  const filtered = photos
    .filter((p) => active === "All" || p.category === active)
    // The featured photo is only pulled out of the grid when the hero above is
    // actually rendering it ("All"). In a category view there's no hero, so it
    // stays in the grid — otherwise it'd vanish from its own category.
    .filter((p) => active !== "All" || p !== featured);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          {mosaicColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={cn(
                "absolute -top-28 w-32 sm:w-40 md:w-56 lg:w-64",
                columnIndex === 0
                  ? "-left-12 rotate-[-5deg] md:-left-8"
                  : "-right-12 rotate-[5deg] md:-right-8",
              )}
            >
              <div
                className={cn(
                  "space-y-4 md:space-y-6",
                  columnIndex === 0 ? "animate-mosaic-drift" : "animate-mosaic-drift-slow",
                )}
              >
                {column.map((src, tileIndex) => (
                  <div
                    key={`${columnIndex}-${tileIndex}`}
                    className="aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-obsidian/70"
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="hero-mosaic-scrim pointer-events-none absolute inset-0"
        />

        <div className="animate-fade-up relative z-10 mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
            <Camera className="h-3 w-3" /> Captured on tour
          </span>
          <h1 className="font-display mb-6 text-5xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-8xl">
            Oman in <span className="text-primary">Pictures</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            Real moments from real tours: the dunes, the wadis, the souqs, and the smiles that we
            love to share.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 md:mt-10 md:gap-x-6">
            <span>
              <span className="text-white">{photos.length}</span> photos
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <span>
              <span className="text-white">{regionCount}</span> regions
            </span>
            {videoTours.length > 0 && (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                <span>
                  <span className="text-white">{videoTours.length}</span> films
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tabs (Photos | Videos) */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-5 md:px-8">
          <button
            type="button"
            onClick={() => setTab("photos")}
            className={cn(
              "ring-focus relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition-colors",
              tab === "photos" ? "text-brand" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Camera className="h-4 w-4" /> Photos
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              {photos.length}
            </span>
            {tab === "photos" && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand" />}
          </button>
          <button
            type="button"
            onClick={() => setTab("videos")}
            className={cn(
              "ring-focus relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition-colors",
              tab === "videos" ? "text-brand" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Film className="h-4 w-4" /> Videos
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              {videoTours.length}
            </span>
            {tab === "videos" && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand" />}
          </button>
        </div>
      </section>

      {tab === "photos" && (
        <>
          {/* Filters (only on Photos tab) */}
          <section className="border-b border-border bg-background py-6">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="-mx-5 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={cn(
                      "ring-focus min-h-11 shrink-0 snap-start rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      active === c
                        ? "bg-brand text-brand-foreground shadow-sm shadow-brand/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/70",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured hero photo */}
          {active === "All" && (
            <section className="bg-background pt-10 md:pt-14">
              <div className="mx-auto max-w-7xl px-5 md:px-8">
                <button
                  type="button"
                  onClick={() => setLightbox(-1)}
                  aria-label={`View featured: ${featured.caption}`}
                  className="ring-focus group relative block min-h-[360px] w-full overflow-hidden rounded-3xl bg-obsidian sm:aspect-[16/9] sm:min-h-0 lg:aspect-[21/9]"
                >
                  <img
                    src={featured.src}
                    alt={featured.caption}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-left text-white md:inset-x-10 md:bottom-10">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                      <Camera className="h-3 w-3" /> Featured · {featured.region}
                    </span>
                    <p className="mt-3 font-display text-2xl font-bold leading-tight md:max-w-2xl md:text-4xl">
                      {featured.caption}
                    </p>
                    {featured.tourSlug && (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                        Explore the tour <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* Masonry grid */}
          <section className="bg-background py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="grid auto-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 md:gap-5 lg:auto-rows-[260px] lg:grid-cols-4">
                {filtered.map((p, i) => (
                  <button
                    key={`${p.src}-${i}`}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className={cn(
                      "ring-focus group relative block overflow-hidden rounded-2xl bg-obsidian transition-transform duration-500 hover:scale-[1.02]",
                      p.span === "tall" && "lg:row-span-2",
                      p.span === "wide" && "lg:col-span-2",
                      p.span === "square" && "lg:col-span-1 lg:row-span-1",
                    )}
                    aria-label={`View ${p.caption}`}
                  >
                    <img
                      src={p.src}
                      alt={p.caption}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-x-3 bottom-3 text-left text-white sm:inset-x-4 sm:bottom-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                        {p.region}
                      </span>
                      <p className="mt-0.5 line-clamp-3 font-display text-xs font-bold leading-tight sm:text-sm md:text-base">
                        {p.caption}
                      </p>
                      {p.tourSlug && (
                        <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                          View tour <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {tab === "videos" && (
        <section className="bg-background py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {videoTours.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center md:p-16">
                <Film className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 font-display text-lg font-bold">No tour videos linked yet</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Add a <span className="font-mono">youtubeId</span> field to a tour in{" "}
                  <span className="font-mono">src/data/tours.ts</span> and it will appear here
                  automatically. The same ID also surfaces a &ldquo;Watch this tour&rdquo; badge on
                  the tour&apos;s detail page.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {videoTours.map((t) => (
                  <a
                    key={t.id}
                    href={`https://www.youtube.com/watch?v=${t.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ring-focus group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-obsidian">
                      <img
                        src={`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`}
                        alt={t.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-80 transition-opacity group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/95 text-white shadow-2xl transition-transform group-hover:scale-110">
                          <PlayCircle className="h-8 w-8" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {t.region}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold text-foreground">
                        {t.name}
                      </h3>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
                        Watch on YouTube <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-obsidian p-8 text-white md:p-14">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-black uppercase leading-tight md:text-5xl">
                  Make your
                  <br />
                  own memories.
                </h3>
                <p className="mt-3 max-w-md text-sm text-white/70 md:text-base">
                  Browse {tours.length} curated tours and book the moments you'll carry home.
                </p>
              </div>
              <Link
                to="/tours"
                className="ring-focus group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/40 transition-transform hover:scale-[1.04]"
              >
                Browse tours
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (lightbox === -1 ? featured : filtered[lightbox]) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-obsidian/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(4rem,env(safe-area-inset-top))] backdrop-blur sm:p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="ring-focus absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          {lightbox !== -1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length);
                }}
                aria-label="Previous"
                className="ring-focus absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => ((i ?? 0) + 1) % filtered.length);
                }}
                aria-label="Next"
                className="ring-focus absolute right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          {(() => {
            const photo = lightbox === -1 ? featured : filtered[lightbox];
            return (
              <figure
                className="relative flex max-h-full max-w-5xl flex-col items-center pb-14 sm:pb-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="animate-slow-zoom max-h-[52dvh] w-auto max-w-full object-contain sm:max-h-[72vh]"
                  />
                </div>
                <figcaption className="mt-4 text-center text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                    {photo.region}
                  </span>
                  <p className="mt-1 max-w-3xl font-display text-base font-bold sm:text-lg">
                    {photo.caption}
                  </p>
                  {lightbox !== -1 && (
                    <p className="mt-1 text-xs text-white/60">
                      {lightbox + 1} of {filtered.length}
                    </p>
                  )}
                  {photo.tourSlug && (
                    <Link
                      to="/tours/$slug"
                      params={{ slug: photo.tourSlug }}
                      onClick={(e) => e.stopPropagation()}
                      className="ring-focus mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-105 sm:w-auto"
                    >
                      View tour <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </figcaption>
              </figure>
            );
          })()}
        </div>
      )}
    </div>
  );
}
