import { useMemo } from "react";
import { ExternalLink, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

// Sunshine Tours' real Tripadvisor location ID (from public audit of their site).
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g1940497-d8617192-Reviews-Sunshine_Tours_Oman-Muscat_Muscat_Governorate.html";

export function TripAdvisorReviews() {
  const filled = useMemo(
    () => testimonials.filter((t) => t.quote.trim().length > 0).slice(0, 3),
    [],
  );

  // The quote cards need real review text pasted into src/data/testimonials.ts.
  // Until that happens we still show the rating summary and the link out — the
  // credential is the point, and hiding the whole section (as this used to do)
  // meant the widget rendered nowhere at all.
  const hasQuotes = filled.length > 0;

  return (
    <section
      aria-label="Tripadvisor reviews"
      className="border-y border-border bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Reviews on Tripadvisor
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              {hasQuotes ? (
                <>
                  What our travellers
                  <br />
                  actually said.
                </>
              ) : (
                <>
                  Rated by travellers,
                  <br />
                  year after year.
                </>
              )}
            </h2>
          </div>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
          >
            Read all reviews on Tripadvisor
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Link-out card. No rating shown until the real figures are supplied. */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              Independently reviewed
            </div>
            <div className="mt-3 flex items-center gap-1">
              <Star className="h-6 w-6 fill-emerald-500 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every review is public and independently hosted on Tripadvisor, where the full history
              can be read in full.
            </p>
          </div>

          {/* Review cards, or a link-out panel while quotes are unfilled */}
          {!hasQuotes ? (
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus group flex flex-col justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-8 text-center shadow-sm transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/[0.09] md:p-12"
            >
              <Star
                className="mx-auto h-8 w-8 fill-emerald-500 text-emerald-500"
                strokeWidth={1.5}
              />
              <p className="mt-4 font-display text-xl font-bold text-foreground md:text-2xl">
                Reviews from travellers who took these tours
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Every review is public and independently hosted on Tripadvisor.
              </p>
              <span className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-700 group-hover:underline dark:text-emerald-300">
                Read them on Tripadvisor
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filled.map((t) => (
                <a
                  key={t.id}
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ring-focus group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85 line-clamp-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {t.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {[t.country, t.date].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-600" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
