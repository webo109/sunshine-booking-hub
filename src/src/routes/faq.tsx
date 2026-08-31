import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { faqs, faqCategories, type FAQCategory } from "@/data/faqs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Frequently asked questions about booking tours in Oman, payment, cancellation, visas, weather, and what to bring.",
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | FAQCategory>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCategory = activeCategory === "All" || f.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    });
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian pt-32 pb-20 text-white md:pt-40">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-2 border-dashed border-primary/30 opacity-50" />
        <div className="absolute right-16 bottom-20 h-40 w-40 rounded-full border-2 border-dashed border-accent/40 opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
            <HelpCircle className="h-3 w-3" /> Help centre
          </span>
          <h1 className="font-display mb-6 text-5xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-8xl">
            Frequently <span className="text-primary">Asked</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            Everything you need to know about booking, paying, and travelling with Sunshine Tours.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-10 max-w-xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-12 pr-5 text-sm text-white placeholder:text-white/50 backdrop-blur ring-focus"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-background py-6">
        {/* Same max-width as the question list below so the filter chips line
            up with the cards they filter. */}
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "ring-focus rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeCategory === "All"
                  ? "bg-brand text-brand-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              All ({faqs.length})
            </button>
            {faqCategories.map((c) => {
              const count = faqs.filter((f) => f.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "ring-focus rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    activeCategory === c
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70",
                  )}
                >
                  {c} <span className="ml-1 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* List */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                No questions match your search. Try a different keyword or contact us directly.
              </p>
            </div>
          ) : (
            /* items-start is what makes the accordion survive a grid: without
               it the row stretches to the open card's height and its two
               neighbours become tall empty boxes, undoing the height we came
               here to save. With it, a card grows on its own. */
            <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {filtered.map((f) => {
                const open = openId === f.id;
                return (
                  <article
                    key={f.id}
                    className={cn(
                      "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                      open ? "border-brand/50 shadow-md" : "border-border hover:border-brand/30",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : f.id)}
                      className="ring-focus flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <div className="flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                          {f.category}
                        </span>
                        <h3 className="mt-1 font-display text-base font-bold text-foreground md:text-lg">
                          {f.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                          open && "rotate-180 text-brand",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 text-primary-foreground md:p-12">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border-2 border-dashed border-white/25" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full border-2 border-dashed border-white/20" />
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-black tracking-tight md:text-4xl">
                  Still have a question?
                </h3>
                <p className="mt-3 max-w-md text-sm opacity-90 md:text-base">
                  Our team replies on WhatsApp within an hour. Or send us a message and we'll be in
                  touch.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=96896964811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ring-focus inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-obsidian shadow-lg transition-transform hover:scale-[1.04]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp us
                </a>
                <Link
                  to="/contact"
                  className="ring-focus inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Contact form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
