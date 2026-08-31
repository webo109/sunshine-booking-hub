import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const exploreLinks = [
  { to: "/tours", label: "All Tours" },
  { to: "/transfers", label: "Transfers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
] as const;

const helpLinks = [
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
  { to: "/booking-lookup", label: "Find My Booking" },
  { to: "/admin", label: "Operator Login" },
] as const;

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
  </svg>
);

const socialLinks = [
  { href: "https://www.facebook.com/sunshinetoursoman/", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com/sunshinetoursoman/", label: "Instagram", icon: Instagram },
  { href: "https://www.tiktok.com/@sunshinetoursoman", label: "TikTok", icon: TikTokIcon },
  { href: "https://www.youtube.com/@sunshinetoursoman2543", label: "YouTube", icon: Youtube },
  { href: "https://x.com/sunshinetoursOM", label: "X / Twitter", icon: Twitter },
  {
    href: "https://www.linkedin.com/company/sunshine-tours-oman",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://api.whatsapp.com/send?phone=96896964811",
    label: "WhatsApp",
    icon: WhatsAppIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <span className="text-lg">☀</span>
            </div>
            <span className="font-display text-lg font-extrabold">Sunshine Tours</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Private guided journeys through the deserts, mountains and coastlines of the Sultanate
            of Oman. Trusted by travellers from over 40 countries since 2014.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="ring-focus flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {helpLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>Muscat · Sultanate of Oman</span>
            </div>
            <a href="tel:+96892830836" className="flex items-start gap-2 hover:text-foreground">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>+968 9283 0836</span>
            </a>
            <a
              href="mailto:info@sunshinetoursoman.com"
              className="flex items-start gap-2 hover:text-foreground"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span className="break-all sm:break-normal">info@sunshinetoursoman.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} Sunshine Tours Oman</span>
          <span>Crafted with ♥ in Muscat</span>
        </div>
      </div>
    </footer>
  );
}
