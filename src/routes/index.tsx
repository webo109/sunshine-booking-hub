import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Globe2,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Compass,
  HeartHandshake,
  Calendar,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { Testimonials } from "@/components/Testimonials";
import { TripAdvisorReviews } from "@/components/TripAdvisorReviews";
import { Newsletter } from "@/components/Newsletter";
import { tours } from "@/data/tours";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sunshine Tours Oman | Private Guided Desert, Wadi & Mountain Tours" },
      {
        name: "description",
        content:
          "Award-winning private tours across the Sultanate of Oman. Wadi Shab, Jebel Shams, Wahiba Sands, Salalah and more, booked in OMR.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: ShieldCheck, label: "Licensed Guides", desc: "Government-certified Omani guides." },
  { icon: Star, label: "Private Tours", desc: "Your group only, never shared." },
  { icon: Globe2, label: "5 Languages", desc: "EN · IT · FR · DE · ES" },
  { icon: Award, label: "Local Experts", desc: "Muscat-based, Oman-wide." },
];

const promises = [
  {
    icon: Compass,
    title: "Crafted itineraries",
    body: "Every tour is built around the season, the light, and what locals know, not just the popular guidebook stops.",
  },
  {
    icon: HeartHandshake,
    title: "Family-run since 2014",
    body: "Owned and operated by the Aulad Thani family. You'll meet at least one of us at some point on your trip.",
  },
  {
    icon: Calendar,
    title: "Free 48h cancellation",
    body: "Plans change. Cancel any day tour up to 48 hours before departure for a full refund, no questions asked.",
  },
];

function HomePage() {
  const featured = tours.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-border bg-muted/60 py-12 dark:bg-muted/30 md:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md md:p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[15px] font-bold leading-tight text-foreground">
                  {f.label}
                </div>
                <div className="mt-1 text-[13px] leading-snug text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured tours */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                <Sparkles className="h-3 w-3" /> Signature Tours
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
                The journeys our
                <br />
                travellers never forget.
              </h2>
            </div>
            <Link
              to="/tours"
              className="ring-focus group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Browse all tours
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="border-y border-border bg-muted/30 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Why Sunshine
            </span>
            <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Three promises we keep.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promises.map((p) => (
              <div
                key={p.title}
                className="group rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Tripadvisor reviews */}
      <TripAdvisorReviews />

      {/* Newsletter card */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Newsletter variant="card" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-obsidian p-10 text-white md:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-display text-3xl font-black uppercase leading-tight md:text-5xl">
                Ready to plan
                <br />
                your Oman story?
              </h3>
              <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
                Tell us your dates and we'll craft a private itinerary in under 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Link
                to="/tours"
                className="ring-focus rounded-full bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:scale-105 transition-transform"
              >
                Browse tours
              </Link>
              <Link
                to="/transfers"
                className="ring-focus rounded-full border border-white/30 px-7 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white/10"
              >
                Private transfers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
