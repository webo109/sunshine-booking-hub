import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const filled = useMemo(() => testimonials.filter((t) => t.quote.trim().length > 0), []);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (filled.length < 2) return;
    const id = window.setInterval(() => setActive((p) => (p + 1) % filled.length), 9000);
    return () => window.clearInterval(id);
  }, [filled.length]);

  if (filled.length === 0) return null;

  const go = (dir: 1 | -1) => setActive((p) => (p + dir + filled.length) % filled.length);

  const current = filled[active];

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              <Star className="h-3 w-3 fill-current" /> Real travellers
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
              Stories from
              <br />
              the Sultanate.
            </h2>
          </div>
          {filled.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="ring-focus flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next review"
                className="ring-focus flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className={cn("grid gap-6", filled.length >= 3 && "lg:grid-cols-[1.4fr_1fr]")}>
          {/* Featured review */}
          <article className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            <Quote
              className="absolute -top-3 -left-2 h-32 w-32 text-brand/10"
              strokeWidth={1.2}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p
                key={current.id}
                className="mt-6 font-display text-xl leading-relaxed text-foreground md:text-2xl"
              >
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-base font-bold text-brand-foreground">
                  {current.initials}
                </div>
                <div>
                  <p className="font-display text-base font-bold text-foreground">{current.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {[current.country, current.date, current.tourName].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
              {filled.length > 1 && (
                <div className="mt-7 flex items-center gap-1.5">
                  {filled.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={cn(
                        "ring-focus h-1.5 rounded-full transition-all duration-500",
                        i === active ? "w-8 bg-brand" : "w-1.5 bg-border hover:bg-brand/50",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Side reviews: only when we have 3+ entries */}
          {filled.length >= 3 && (
            <div className="grid gap-4">
              {[1, 2].map((offset) => {
                const t = filled[(active + offset) % filled.length];
                return (
                  <article key={t.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-brand text-brand" />
                      ))}
                    </div>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/80">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {[t.country, t.tourName].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
