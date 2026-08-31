import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { tours } from "@/data/tours";
import heroDesert from "@/assets/hero-desert.jpg";
import { cn } from "@/lib/utils";

const slideBadges = [
  "Rated #1 Tour Operator in Oman",
  "Mountain Canyon Escape",
  "Capital Highlights Tour",
  "Desert Overnight Favorite",
  "Seasonal Dhofar Escape",
] as const;

const slides = tours.slice(0, 5).map((t) => ({
  slug: t.slug,
  title: t.shortName.toUpperCase(),
  caption: `${t.shortName}, ${t.region}`,
  description: t.description,
  image: t.image,
})).map((slide, i) => ({
  ...slide,
  badge: slideBadges[i] ?? "Featured Oman Tour",
}));

export function Hero() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<number | null>(null);

  const go = (dir: 1 | -1) => {
    setActive((prev) => (prev + dir + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    timer.current = window.setInterval(() => go(1), 7000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const current = slides[active];

  return (
    <section className="relative min-h-[760px] w-full overflow-hidden bg-obsidian text-white md:h-screen md:min-h-[680px]">
      {/* Background full-bleed image with slow zoom + crossfade */}
      {slides.map((s, i) => (
        <img
          key={s.slug}
          src={s.image}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms]",
            i === active ? "opacity-100 animate-slow-zoom" : "opacity-0",
          )}
        />
      ))}
      {/* Fallback hero photo behind everything */}
      <img
        src={heroDesert}
        alt="Oman desert at sunset"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      <div className="absolute inset-0 gradient-bottom" />

      {/* Floating watermark text behind */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-0 flex justify-center overflow-hidden">
        <span className="text-stroke-thin font-display text-[18vw] font-black uppercase leading-none opacity-30">
          {current.title}
        </span>
      </div>

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 items-start gap-7 px-5 pb-10 pt-24 md:h-full md:min-h-0 md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:pb-10 md:pt-28">
        {/* Left: copy */}
        <div key={`copy-${animKey}`} className="md:col-span-6 lg:col-span-7">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {current.badge}
            </span>
          </div>
          <h1
            className="mt-5 font-display text-[13vw] font-black uppercase leading-[0.9] tracking-tight text-balance sm:text-[4.4rem] md:mt-6 md:text-7xl md:leading-[0.88] lg:text-[8.5rem] xl:text-[10rem]"
            style={{ animation: "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {current.title}
          </h1>
          <p
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 md:text-base"
            style={{ animation: "fade-up 0.9s 0.15s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {current.description}
          </p>
          <div
            className="mt-7 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4"
            style={{ animation: "fade-up 0.9s 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <Link
              to="/tours/$slug"
              params={{ slug: current.slug }}
              className="ring-focus group inline-flex items-center gap-3 rounded-full bg-brand px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground shadow-2xl shadow-brand/40 transition-transform hover:scale-[1.04] sm:px-7 sm:py-4 sm:text-sm"
            >
              Explore
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-foreground/20 transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              to="/tours"
              className="ring-focus rounded-full border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 sm:px-6 sm:py-4 sm:text-sm"
            >
              All Tours
            </Link>
          </div>
        </div>

        {/* Right: vertical destination card carousel */}
        <div className="relative md:col-span-6 lg:col-span-5">
          <div className="relative h-[260px] md:h-[520px]">
            {slides.map((s, i) => {
              const offset = (i - active + slides.length) % slides.length;
              if (offset > 2) return null;
              const z = 30 - offset;
              const translateX = offset * 88;
              const translateY = offset * 14;
              const scale = 1 - offset * 0.08;
              const opacity = offset === 0 ? 1 : 0.78;
              return (
                <Link
                  key={s.slug}
                  to="/tours/$slug"
                  params={{ slug: s.slug }}
                  className={cn(
                    "ring-focus absolute inset-x-0 top-0 block h-[260px] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 transition-all duration-700 ease-out md:left-auto md:right-0 md:h-[520px] md:w-[320px]",
                    offset > 0 && "hidden md:block",
                  )}
                  style={{
                    transform: `translateX(${-translateX}px) translateY(${translateY}px) scale(${scale})`,
                    zIndex: z,
                    opacity,
                  }}
                  aria-label={`View ${s.caption}`}
                >
                  <img
                    src={s.image}
                    alt={s.caption}
                    width={640}
                    height={1040}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute inset-x-4 top-4 flex items-center gap-1.5">
                    {Array.from({ length: 4 }).map((_, k) => (
                      <span key={k} className="h-1 w-1 rounded-full bg-white/80" />
                    ))}
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="font-display text-base font-bold text-white drop-shadow-md">
                      {s.caption}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Carousel controls */}
          <div className="mt-5 flex items-center justify-between md:mt-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => go(-1)}
                className="ring-focus flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => go(1)}
                className="ring-focus flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-white/70">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              <div className="h-px w-12 bg-white/30" />
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
