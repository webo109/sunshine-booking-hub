import {
  createFileRoute,
  Outlet,
  useChildMatches,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Check, MessageCircle, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { tours, categories, type Tour } from "@/data/tours";
import { TourListCard } from "@/components/TourListCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { formatOMR } from "@/lib/format";
import { cn } from "@/lib/utils";

type SortValue = "popular" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price · Low to high" },
  { value: "price-desc", label: "Price · High to low" },
  { value: "duration-asc", label: "Duration · Short to long" },
  { value: "duration-desc", label: "Duration · Long to short" },
];

// Price slider bounds, informed by the actual tour data
// (real prices range OMR 45 – 1180; rounded out for slider headroom).
const PRICE_MIN = 0;
const PRICE_MAX = 1200;
const PRICE_STEP = 10;

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "All").default("All"),
  duration: fallback(z.enum(["All", "Short", "Day", "Multi"]), "All").default("All"),
  region: fallback(z.string(), "All").default("All"),
  difficulty: fallback(z.enum(["All", "Easy", "Moderate", "Challenging"]), "All").default("All"),
  priceMax: fallback(z.coerce.number().int().min(0).max(PRICE_MAX), PRICE_MAX).default(PRICE_MAX),
  sort: fallback(
    z.enum(["popular", "price-asc", "price-desc", "duration-asc", "duration-desc"]),
    "popular",
  ).default("popular"),
});

export const Route = createFileRoute("/tours")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "All Tours · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Browse private guided tours across Oman: day trips, overnight desert camps, multi-day round trips and city tours.",
      },
    ],
  }),
  component: ToursPage,
});

const durations = ["All", "Short", "Day", "Multi"] as const;

const regions = [
  "All",
  "Muscat",
  "Ad Dakhiliyah",
  "Ash Sharqiyah",
  "Al Batinah",
  "Dhofar",
  "Musandam",
] as const;

const difficulties = ["All", "Easy", "Moderate", "Challenging"] as const;

// ─── Filter predicates ──────────────────────────────────────────────────────
// Uniform signature (selectedValue) -> (tour) -> boolean. Reused in main filter
// chain AND per-filter count computation so "(N)" labels never drift from the
// actual catalog state.

// Spelled-out numbers people actually type ("two days" -> "2 days"), so word
// and numeral forms both hit the same tours.
const NUMBER_WORDS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
};

export const normalizeQuery = (q: string) =>
  q
    .toLowerCase()
    .trim()
    .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g, (w) => NUMBER_WORDS[w]);

/**
 * Duration text a tour should be findable by. Multi-day tours already print
 * "3 days · 2 nights", but single-day tours print "Full day"/"Half day"/"Long
 * day" — nobody searches that way, so synthesise the phrasings they do use.
 */
const durationSearchText = (t: Tour) =>
  t.durationHours <= 24 ? `${t.durationLabel} 1 day single day day trip daytrip` : t.durationLabel;

const filterByQuery = (q: string) => (t: Tour) => {
  if (!q) return true;
  return [
    t.name,
    t.shortName,
    t.region,
    t.tagline,
    t.description,
    durationSearchText(t),
    t.categories.join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
};
const filterByCategory = (v: string) => (t: Tour) =>
  v === "All" || t.categories.includes(v as never);
const filterByDuration = (v: string) => (t: Tour) => {
  if (v === "All") return true;
  if (v === "Short") return t.durationHours <= 6;
  if (v === "Day") return t.durationHours > 6 && t.durationHours <= 14;
  return t.durationHours > 14;
};
const filterByRegion = (v: string) => (t: Tour) => v === "All" || t.region.includes(v);
const filterByDifficulty = (v: string) => (t: Tour) => v === "All" || t.difficulty === v;
const filterByPrice = (max: number) => (t: Tour) => {
  // Default (max = PRICE_MAX) = no filtering, include priceOnRequest tours.
  if (max >= PRICE_MAX) return true;
  // Narrowed = only priced tours under the cap (priceOnRequest excluded).
  if (t.priceOnRequest) return false;
  return t.adultPrice <= max;
};

function ToursPage() {
  // /tours/$slug is a nested child of /tours in the file-based routing tree.
  // When a child route matches, render its Outlet instead of the catalog UI.
  // (Early return after all hooks, per the Rules of Hooks.)
  const hasChildRoute = useChildMatches().length > 0;

  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/tours" });
  const location = useLocation();
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (location.hash === "filters") {
      const el = document.getElementById("filters");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const onScroll = () => setShowFloatingButton(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const update = (patch: Partial<z.infer<typeof searchSchema>>) =>
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });

  const query = normalizeQuery(search.q);

  // ─── Per-filter result counts ────────────────────────────────────────────
  const counts = useMemo(() => {
    const q = filterByQuery(query);
    const c = filterByCategory(search.category);
    const d = filterByDuration(search.duration);
    const r = filterByRegion(search.region);
    const diff = filterByDifficulty(search.difficulty);
    const p = filterByPrice(search.priceMax);

    const compute = (
      options: readonly string[],
      buildFilter: (v: string) => (t: Tour) => boolean,
      otherFilters: ((t: Tour) => boolean)[],
    ): Record<string, number> => {
      const base = tours.filter((t) => otherFilters.every((f) => f(t)));
      return Object.fromEntries(options.map((o) => [o, base.filter(buildFilter(o)).length]));
    };

    return {
      category: compute(categories as readonly string[], filterByCategory, [q, d, r, diff, p]),
      duration: compute(durations as readonly string[], filterByDuration, [q, c, r, diff, p]),
      region: compute(regions as readonly string[], filterByRegion, [q, c, d, diff, p]),
      difficulty: compute(difficulties as readonly string[], filterByDifficulty, [q, c, d, r, p]),
    };
  }, [query, search.category, search.duration, search.region, search.difficulty, search.priceMax]);

  // ─── Active filter chips ─────────────────────────────────────────────────
  const activeFilters: Array<{ key: string; label: string; reset: () => void }> = [];
  if (search.q.trim()) {
    activeFilters.push({
      key: "q",
      label: `"${search.q.trim()}"`,
      reset: () => update({ q: "" }),
    });
  }
  if (search.category !== "All") {
    activeFilters.push({
      key: "category",
      label: search.category,
      reset: () => update({ category: "All" }),
    });
  }
  if (search.duration !== "All") {
    activeFilters.push({
      key: "duration",
      label: search.duration,
      reset: () => update({ duration: "All" }),
    });
  }
  if (search.region !== "All") {
    activeFilters.push({
      key: "region",
      label: search.region,
      reset: () => update({ region: "All" }),
    });
  }
  if (search.difficulty !== "All") {
    activeFilters.push({
      key: "difficulty",
      label: search.difficulty,
      reset: () => update({ difficulty: "All" }),
    });
  }
  if (search.priceMax < PRICE_MAX) {
    activeFilters.push({
      key: "price",
      label: `Up to OMR ${search.priceMax}`,
      reset: () => update({ priceMax: PRICE_MAX }),
    });
  }

  const clearAll = () =>
    update({
      q: "",
      category: "All",
      duration: "All",
      region: "All",
      difficulty: "All",
      priceMax: PRICE_MAX,
    });

  // ─── Filtered + sorted tours ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    return tours
      .filter(filterByQuery(query))
      .filter(filterByCategory(search.category))
      .filter(filterByDuration(search.duration))
      .filter(filterByRegion(search.region))
      .filter(filterByDifficulty(search.difficulty))
      .filter(filterByPrice(search.priceMax))
      .sort((a, b) => {
        const ap = a.priceOnRequest ? Number.MAX_SAFE_INTEGER : a.adultPrice;
        const bp = b.priceOnRequest ? Number.MAX_SAFE_INTEGER : b.adultPrice;
        if (search.sort === "price-asc") return ap - bp;
        if (search.sort === "price-desc") {
          if (a.priceOnRequest && !b.priceOnRequest) return 1;
          if (!a.priceOnRequest && b.priceOnRequest) return -1;
          return b.adultPrice - a.adultPrice;
        }
        if (search.sort === "duration-asc") return a.durationHours - b.durationHours;
        if (search.sort === "duration-desc") return b.durationHours - a.durationHours;
        return 0;
      });
  }, [
    query,
    search.category,
    search.duration,
    search.region,
    search.difficulty,
    search.priceMax,
    search.sort,
  ]);

  if (hasChildRoute) return <Outlet />;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Curated catalog
          </span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-7xl">
            Find your tour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            {filtered.length} tour{filtered.length === 1 ? "" : "s"}
            {query ? ` matching "${search.q}"` : " matching your filters"}.
          </p>
        </header>

        {/* Filter bar: one row — search, Filters panel trigger, sort */}
        <div
          id="filters"
          className="my-8 scroll-mt-28 rounded-3xl border border-border glass p-3 shadow-sm md:p-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search tours by name, region, or activity…"
                spellCheck={false}
                className="ring-focus w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
              {search.q && (
                <button
                  type="button"
                  onClick={() => update({ q: "" })}
                  aria-label="Clear search"
                  className="ring-focus absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open filters"
                className="ring-focus inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/40"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold tabular-nums text-brand-foreground">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              <Select value={search.sort} onValueChange={(v) => update({ sort: v as SortValue })}>
                <SelectTrigger
                  aria-label="Sort tours by"
                  className="ring-focus h-auto w-auto justify-start gap-1.5 rounded-full border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-none data-[placeholder]:text-foreground"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sort:
                  </span>
                  <SelectValue placeholder="Popular" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-2xl border-border bg-card p-1 shadow-xl"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer rounded-xl py-2.5 text-sm font-medium focus:bg-brand/10 focus:text-foreground data-[state=checked]:bg-brand/15 data-[state=checked]:font-semibold data-[state=checked]:text-brand"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active filter chips + result count */}
        {activeFilters.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Active:
            </span>
            {activeFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={f.reset}
                className="ring-focus group inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground shadow-sm shadow-brand/20 transition-colors hover:bg-brand/90"
                aria-label={`Remove filter: ${f.label}`}
              >
                <span>{f.label}</span>
                <X className="h-3 w-3 opacity-80 group-hover:opacity-100" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="ring-focus ml-1 text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">
              {filtered.length} tour{filtered.length === 1 ? "" : "s"} found
            </span>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No tours match these filters.</p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ring-focus mt-4 rounded-full bg-brand px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-foreground"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:gap-5">
            {filtered.map((t) => (
              <TourListCard key={t.id} tour={t} />
            ))}
          </div>
        )}
      </div>

      {/* Once the full filter panel scrolls away, phones get one restrained
          toolbar below the navbar instead of three bubbles over the cards. */}
      {showFloatingButton && (
        <>
          <div className="fixed inset-x-0 top-0 z-30 border-y border-border bg-background/95 px-5 py-2 shadow-sm backdrop-blur-md sm:hidden">
            <div className="mx-auto flex max-w-md items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="ring-focus inline-flex min-h-10 items-center gap-2 rounded-full bg-brand px-4 text-xs font-bold uppercase tracking-wider text-brand-foreground shadow-sm"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-bold tabular-nums">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              <Select value={search.sort} onValueChange={(v) => update({ sort: v as SortValue })}>
                <SelectTrigger
                  aria-label="Sort tours from mobile toolbar"
                  className="ring-focus h-10 min-w-0 flex-1 justify-center gap-1 rounded-full border-border bg-card px-3 text-xs font-bold text-foreground shadow-sm"
                >
                  <span className="font-bold uppercase tracking-wider">Sort</span>
                </SelectTrigger>
                <SelectContent
                  align="center"
                  className="rounded-2xl border-border bg-card p-1 shadow-xl"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer rounded-xl py-2.5 text-sm font-medium focus:bg-brand/10 focus:text-foreground data-[state=checked]:bg-brand/15 data-[state=checked]:font-semibold data-[state=checked]:text-brand"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("sunshine:open-chat"))}
                className="ring-focus inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-bold uppercase tracking-wider text-foreground shadow-sm"
                aria-label="Open tour help"
              >
                <MessageCircle className="h-4 w-4 text-brand" />
                Help
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="ring-focus fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-105 sm:inline-flex"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-bold tabular-nums">
                {activeFilters.length}
              </span>
            )}
          </button>
        </>
      )}

      {/* More Filters drawer */}
      <MoreFiltersDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        search={search}
        counts={counts}
        update={update}
        clearAll={clearAll}
        resultCount={filtered.length}
      />
    </div>
  );
}

// ─── MoreFiltersDrawer · full-panel expanded view ────────────────────────────
function MoreFiltersDrawer({
  open,
  onOpenChange,
  search,
  counts,
  update,
  clearAll,
  resultCount,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: z.infer<typeof searchSchema>;
  counts: {
    category: Record<string, number>;
    duration: Record<string, number>;
    region: Record<string, number>;
    difficulty: Record<string, number>;
  };
  update: (patch: Partial<z.infer<typeof searchSchema>>) => void;
  clearAll: () => void;
  resultCount: number;
}) {
  const anyActive =
    search.category !== "All" ||
    search.duration !== "All" ||
    search.region !== "All" ||
    search.difficulty !== "All" ||
    search.priceMax < PRICE_MAX ||
    search.q.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className={cn(
          // Compact floating panel: anchored below the navbar, height driven by
          // its own content (scrolls internally only if it outgrows the viewport)
          // rather than the full-height takeover this used to be.
          "bottom-auto right-4 top-24 h-auto max-h-[calc(100dvh-8rem)] w-[320px] max-w-[calc(100vw-2rem)]",
          "flex flex-col overflow-hidden rounded-3xl border border-border bg-background p-0 shadow-2xl",
          // Close affordance lives in the header row, matching the design
          "[&>button]:hidden",
          // Tailwind 4 + tailwindcss-animate's `slide-in-from-right` doesn't
          // commit the final transform on this project. Force the open state
          // to translateX(0) with !important so we override the animation's
          // ending state.
          "data-[state=open]:!transform-none",
        )}
        style={{ transition: "transform 300ms ease-in-out" }}
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 px-5 pb-1 pt-5">
          <SheetTitle className="font-display text-base font-black uppercase tracking-wider">
            Filters
          </SheetTitle>
          <button
            type="button"
            onClick={clearAll}
            disabled={!anyActive}
            className={cn(
              "ring-focus rounded-md text-xs font-medium transition-colors",
              anyActive
                ? "text-muted-foreground hover:text-brand"
                : "cursor-not-allowed text-muted-foreground/40",
            )}
          >
            Clear all
          </button>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-6 pt-4">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search tours…"
              spellCheck={false}
              className="ring-focus w-full rounded-full border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Category */}
          <PanelSection title="Category">
            <CheckList
              options={(categories as readonly string[]).filter((c) => c !== "All")}
              value={search.category}
              counts={counts.category}
              onChange={(v) => update({ category: v })}
            />
          </PanelSection>

          {/* Duration */}
          <PanelSection title="Duration">
            <PillRow
              options={durations as readonly string[]}
              value={search.duration}
              labels={{ All: "Any" }}
              onChange={(v) => update({ duration: v as typeof search.duration })}
            />
          </PanelSection>

          {/* Region */}
          <PanelSection title="Region">
            <CheckList
              options={(regions as readonly string[]).filter((r) => r !== "All")}
              value={search.region}
              counts={counts.region}
              onChange={(v) => update({ region: v })}
            />
          </PanelSection>

          {/* Difficulty */}
          <PanelSection title="Difficulty">
            <PillRow
              options={difficulties as readonly string[]}
              value={search.difficulty}
              labels={{ All: "Any" }}
              onChange={(v) => update({ difficulty: v as typeof search.difficulty })}
            />
          </PanelSection>

          {/* Price */}
          <PanelSection title="Price">
            <PanelPriceSlider max={search.priceMax} onChange={(m) => update({ priceMax: m })} />
          </PanelSection>
        </div>

        <SheetFooter className="border-t border-border/60 px-5 py-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="ring-focus inline-flex h-10 w-full items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground transition-transform hover:scale-[1.01]"
          >
            Show {resultCount} tour{resultCount === 1 ? "" : "s"}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

/** Small uppercase section label used throughout the compact filter panel. */
function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

/**
 * Vertical checkbox-style list. The underlying filter state is single-select,
 * so clicking the checked row unchecks it and falls back to "All".
 */
function CheckList({
  options,
  value,
  counts,
  onChange,
}: {
  options: readonly string[];
  value: string;
  counts?: Record<string, number>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-0.5">
      {options.map((o) => {
        const count = counts?.[o];
        const isZero = count === 0;
        const isSelected = value === o;
        return (
          <button
            key={o}
            type="button"
            disabled={isZero && !isSelected}
            onClick={() => onChange(isSelected ? "All" : o)}
            className={cn(
              "ring-focus flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left text-sm transition-colors",
              isZero && !isSelected
                ? "cursor-not-allowed text-muted-foreground/40"
                : "text-foreground hover:bg-muted/50",
            )}
          >
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                isSelected ? "border-brand bg-brand" : "border-border bg-card",
              )}
            >
              {isSelected && <Check className="h-3 w-3 text-brand-foreground" strokeWidth={3.5} />}
            </span>
            <span className={cn("min-w-0 flex-1 truncate", isSelected && "font-semibold")}>
              {o}
            </span>
            {count !== undefined && (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground/60">
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Compact price slider: "Up to OMR X" label above a single-handle track. */
function PanelPriceSlider({ max, onChange }: { max: number; onChange: (max: number) => void }) {
  const [draftMax, setDraftMax] = useState(max);

  useEffect(() => {
    setDraftMax(max);
  }, [max]);

  return (
    <div>
      <div className="mb-3 text-sm text-muted-foreground">
        Up to{" "}
        <span className="font-semibold text-brand tabular-nums">
          {draftMax >= PRICE_MAX ? `${formatOMR(PRICE_MAX)}+` : formatOMR(draftMax)}
        </span>
      </div>
      <Slider
        value={[draftMax]}
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        onValueChange={(v) => Array.isArray(v) && v.length === 1 && setDraftMax(v[0])}
        onValueCommit={(v) => Array.isArray(v) && v.length === 1 && onChange(v[0])}
      />
    </div>
  );
}

function PillRow({
  options,
  value,
  counts,
  labels,
  onChange,
}: {
  options: readonly string[];
  value: string;
  counts?: Record<string, number>;
  /** Optional display overrides, e.g. render the "All" option as "Any". */
  labels?: Record<string, string>;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const count = counts?.[o];
        const isZero = count === 0 && o !== "All";
        const isSelected = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => !isZero && onChange(o)}
            disabled={isZero}
            className={cn(
              "ring-focus rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
              isSelected
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/30"
                : isZero
                  ? "cursor-not-allowed bg-muted/40 text-muted-foreground/40"
                  : "border border-border/70 bg-card text-foreground hover:bg-muted/40",
            )}
          >
            {labels?.[o] ?? o}
            {count !== undefined && (
              <span
                className={cn(
                  "ml-1 text-[10px] tabular-nums",
                  isSelected
                    ? "text-brand-foreground/75"
                    : isZero
                      ? "text-muted-foreground/40"
                      : "text-muted-foreground/60",
                )}
              >
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
