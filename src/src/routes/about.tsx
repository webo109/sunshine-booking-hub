import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Phone, Mail, MapPin, Users, Globe, Star, Compass, ArrowRight } from "lucide-react";
import { TripAdvisorReviews } from "@/components/TripAdvisorReviews";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Sunshine Tours is a family-run, fully licensed Omani tour operator based in Muscat. Multilingual guides, award-winning service since 2014.",
      },
    ],
  }),
  component: AboutPage,
});

const teamMembers = [
  { name: "Mohammed Salim Aulad Thani", role: "Owner", initials: "MS" },
  { name: "Maymona Alsukaty", role: "Coordinator", initials: "MA" },
  { name: "Ahmed Mohammed Salim Aulad Thani", role: "Tour Guide", initials: "AM" },
  { name: "Roda Valdez", role: "Marketing", initials: "RV" },
];

const awards = [
  { title: "Certificate of Excellence", year: "2017" },
  { title: "Certificate of Excellence", year: "2018" },
  { title: "Certificate of Excellence", year: "2019" },
  { title: "Travellers' Choice", year: "2020" },
  { title: "Travellers' Choice", year: "2021" },
  { title: "Travellers' Choice", year: "2022" },
  { title: "Travellers' Choice", year: "2023" },
];

// Hero proof row. Every figure traces to data already on the site: the awards
// array below, the "Since 2014" story card, the languages our guides speak, and
// the Tripadvisor summary in TrustBadges/TripAdvisorReviews.
const stats = [
  { value: "2014", label: "Founded", detail: "Muscat, Oman" },
  { value: String(awards.length), label: "Tripadvisor awards", detail: "2017 – 2023" },
  { value: "5", label: "Languages", detail: "EN · IT · FR · DE · ES" },
  { value: "4.9", label: "Tripadvisor rating", detail: "Travellers' Choice", star: true },
];

const steps = [
  {
    title: "Choose Your Tour",
    description:
      "Browse our curated collection of tours across Oman, from desert safaris to coastal adventures.",
    rotate: "-rotate-3",
    bg: "bg-primary",
  },
  {
    title: "Expert Local Guides",
    description:
      "Our multilingual Omani & European guides bring deep cultural knowledge and passion to every journey.",
    rotate: "rotate-2",
    bg: "bg-accent",
  },
  {
    title: "Unique Experiences",
    description:
      "We constantly explore new routes and hidden gems so every visit feels fresh and unforgettable.",
    rotate: "-rotate-1",
    bg: "bg-primary/80",
  },
  {
    title: "Memories for Life",
    description:
      "From stunning sunsets to ancient wadis, take home stories and photos you'll treasure forever.",
    rotate: "rotate-3",
    bg: "bg-accent/80",
  },
];

const highlights = [
  { icon: MapPin, label: "Desert Safari", desc: "Wahiba Sands & beyond" },
  { icon: Globe, label: "Wadi Adventures", desc: "Crystal-clear pools" },
  { icon: Users, label: "Cultural Tours", desc: "Authentic Omani heritage" },
  { icon: Star, label: "Coastal Escapes", desc: "Pristine beaches & fjords" },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero: wavy bottom edge */}
      <section className="relative overflow-hidden bg-obsidian pt-32 pb-32 text-white md:pt-40 md:pb-40">
        {/* Warm glow behind the headline so the band reads as lit, not flat black */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
          style={{
            background:
              "radial-gradient(55% 65% at 50% 38%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 72%)",
          }}
        />

        {/* Decorative dashed circles, bled off the top corners so the crop reads
            as deliberate and neither one collides with the wave below. */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full border-2 border-dashed border-primary/25" />
        <div className="pointer-events-none absolute -top-10 -right-24 h-64 w-64 rounded-full border-2 border-dashed border-accent/25" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white/80 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Family-run · Muscat · Since 2014
          </span>
          <h1 className="font-display mb-6 text-5xl leading-[0.95] font-black tracking-tight text-balance md:text-7xl lg:text-8xl">
            Who We <span className="text-primary">Are</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-balance text-white/60 md:text-xl">
            A family-run Omani operator based in Muscat, showing travellers the country we grew up
            in since 2014.
          </p>

          <div className="mx-auto mt-12 max-w-3xl border-t border-white/10 pt-8 md:mt-14">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 sm:px-4">
                  <p className="font-display flex items-center justify-center gap-1.5 text-3xl font-black md:text-4xl">
                    {stat.value}
                    {stat.star && (
                      <Star className="h-5 w-5 fill-primary text-primary md:h-6 md:w-6" />
                    )}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs text-white/35">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wavy SVG divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" className="h-20 w-full md:h-28" preserveAspectRatio="none">
            <path
              d="M0,40 C360,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Sunshine Tours is one of the leading tour brands based in Muscat, Oman. Our team is
                built strong with Omani and European staff alike who know local tourism like no
                other.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Our guides are fluent in several languages and aware of the common needs of tourists
                and what they are looking for. We are constantly exploring new activities, routes,
                and adventures to make every visit the most unique and exciting yet.
              </p>
            </div>

            {/* Stacked tilted cards */}
            <div className="relative flex min-h-[340px] items-center justify-center">
              <div className="absolute h-72 w-56 -rotate-6 rounded-2xl border-2 border-primary/30 bg-primary/15 shadow-lg" />
              <div className="absolute h-72 w-56 translate-x-6 -translate-y-4 rotate-3 rounded-2xl border-2 border-accent/30 bg-accent/15 shadow-lg" />
              <div className="relative flex h-72 w-56 translate-x-2 translate-y-2 rotate-1 items-center justify-center rounded-2xl border-2 border-border bg-card shadow-xl">
                <div className="text-center">
                  <Globe className="mx-auto mb-3 h-12 w-12 text-primary" />
                  <p className="font-display text-xl font-bold">Since 2014</p>
                  <p className="text-sm text-muted-foreground">Exploring Oman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Adventure: tilted cards */}
      <section className="relative overflow-hidden bg-obsidian py-16 text-white md:py-24">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M100,50 C300,200 500,0 700,150 C900,300 1100,50 1300,200"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeDasharray="8 8"
            opacity="0.25"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display mb-16 text-center text-4xl font-black tracking-tight uppercase md:text-6xl">
            Plan Your <span className="text-primary">Adventure</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`${step.rotate} ${step.bg} rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:rotate-0 md:p-8`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Text steps through grades of white: faint numeral, solid
                    title, softened body copy. */}
                <span className="font-display mb-2 block text-5xl font-black text-white/30">
                  0{i + 1}
                </span>
                <h3 className="font-display mb-3 text-xl font-bold tracking-wider text-white uppercase md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 md:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Tour CTA */}
      <section className="relative overflow-hidden bg-background pt-16 pb-10 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-accent p-8 shadow-2xl md:p-14">
            {/* Decorative dashed circles */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full border-2 border-dashed border-white/25" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full border-2 border-dashed border-white/20" />

            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
              {/* Text steps through grades of white against the brand gradient */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-white/90 uppercase backdrop-blur">
                  <Compass className="h-3.5 w-3.5" /> Ready when you are
                </span>
                <h2 className="font-display mt-5 text-4xl leading-[0.95] font-black tracking-tight text-white md:text-6xl">
                  Plan Your <span className="text-white/75 italic">Tour</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
                  Pick your category, duration, and pace. Our filters help you find the perfect
                  Omani adventure in seconds.
                </p>
              </div>

              <Link
                to="/tours"
                hash="filters"
                className="ring-focus group inline-flex items-center justify-center gap-3 rounded-full bg-background px-7 py-4 text-base font-bold text-foreground shadow-xl transition-transform hover:scale-[1.04] md:text-lg"
              >
                Plan Your Tour
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-background pt-10 pb-10 md:pt-12 md:pb-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display mb-12 text-center text-3xl font-black tracking-tight md:text-5xl">
            What <span className="text-primary">Awaits</span> You
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <h.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold">{h.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-background pt-10 pb-16 md:pt-12 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display mb-12 text-center text-3xl font-black tracking-tight md:text-5xl">
            Awards & <span className="text-primary">Recognition</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {awards.map((award, i) => (
              <div
                key={award.year}
                className={`rounded-xl border border-border bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 ${
                  i % 2 === 0 ? "-rotate-1" : "rotate-1"
                } hover:rotate-0`}
              >
                <Award className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-xs text-muted-foreground">Tripadvisor</p>
                <p className="text-sm font-semibold text-primary">{award.title}</p>
                <p className="font-display mt-1 text-2xl font-black">{award.year}</p>
                <p className="mt-1 text-xs text-muted-foreground">Sunshine Tours Oman</p>
                <div className="mt-1 flex justify-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-xs text-primary">
                      ●
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Tripadvisor reviews — the awards row above is historical, this is
          the current rating and what travellers said most recently. */}
      <TripAdvisorReviews />

      {/* Team */}
      <section className="relative overflow-hidden bg-obsidian py-16 text-white md:py-24">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full border-2 border-dashed border-primary/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display mb-12 text-center text-3xl font-black tracking-tight md:text-5xl">
            Meet The <span className="text-primary">Team</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className={`group text-center ${i % 2 === 0 ? "-rotate-2" : "rotate-2"} transition-transform duration-300 hover:rotate-0`}
              >
                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-primary/30 bg-white/5 shadow-lg transition-colors group-hover:border-primary/60 md:h-36 md:w-36">
                  <span className="font-display text-2xl font-black text-primary md:text-3xl">
                    {member.initials}
                  </span>
                </div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-white/70">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl space-y-4 px-5 text-center md:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="tel:+96892830836"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" /> +968 9283 0836
            </a>
            <a
              href="tel:+96896964811"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4" /> +968 9696 4811
            </a>
            <a
              href="mailto:info@sunshinetoursoman.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" /> info@sunshinetoursoman.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
