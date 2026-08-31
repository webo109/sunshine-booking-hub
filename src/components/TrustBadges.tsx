import { ExternalLink, Star } from "lucide-react";

interface Badge {
  platform: string;
  rating: string;
  scale: string;
  label: string;
  href: string;
  accent: string;
}

const badges: Badge[] = [
  {
    platform: "Tripadvisor",
    rating: "4.9",
    scale: "/ 5",
    label: "Travellers' Choice",
    href: "https://www.tripadvisor.com/Attraction_Review-g1940497-d8617192-Reviews-Sunshine_Tours_Oman-Muscat_Muscat_Governorate.html",
    accent: "text-emerald-600",
  },
  {
    platform: "Trustpilot",
    rating: "Excellent",
    scale: "",
    label: "Trustpilot rated",
    href: "https://www.trustpilot.com/review/sunshinetoursoman.com",
    accent: "text-emerald-700",
  },
  {
    platform: "TourHQ",
    rating: "5.0",
    scale: "/ 5",
    label: "Verified guide",
    href: "https://www.tourhq.com/guide/om58954/sunshine-tours-oman",
    accent: "text-orange-600",
  },
];

export function TrustBadges() {
  return (
    <section aria-label="Independent ratings" className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
              Independently rated
            </span>
            <p className="mt-1 font-display text-base font-semibold text-foreground md:text-lg">
              4,200+ travellers · 3 review platforms · zero paid placements.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:items-stretch md:gap-4">
            {badges.map((b) => (
              <li key={b.platform} className="flex">
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ring-focus group flex w-full items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted ${b.accent}`}
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {b.platform}
                    </div>
                    <div className="font-display text-sm font-bold text-foreground">
                      {b.rating}
                      {b.scale && (
                        <span className="ml-0.5 text-xs font-medium text-muted-foreground">
                          {b.scale}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
