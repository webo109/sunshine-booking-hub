import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Tours" },
  { to: "/transfers", label: "Transfers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
] as const;

const helpLinks = [
  { to: "/faq", label: "FAQs", description: "Common questions answered" },
  { to: "/contact", label: "Contact", description: "Talk to our team" },
  { to: "/booking-lookup", label: "Find Booking", description: "Look up by reference" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHelpOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!helpOpen) return;
    const onClick = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [helpOpen]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        transparent
          ? "border-transparent bg-transparent"
          : "glass border-border/40 shadow-[0_8px_30px_-12px_oklch(0.1_0.02_250/0.2)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5 ring-focus rounded-md">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 transition-transform group-hover:rotate-[18deg]">
            <Sun className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div className={cn("flex flex-col leading-none", transparent && "text-white")}>
            <span className="font-display text-base font-extrabold tracking-tight">Sunshine</span>
            <span className="text-[10px] uppercase tracking-[0.22em] opacity-70">Tours · Oman</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors ring-focus",
                transparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted",
              )}
              activeProps={{
                className: cn(
                  "rounded-full px-4 py-2 text-sm font-semibold",
                  transparent ? "text-white bg-white/15" : "text-foreground bg-muted",
                ),
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Help dropdown */}
          <div ref={helpRef} className="relative">
            <button
              type="button"
              onClick={() => setHelpOpen((p) => !p)}
              aria-haspopup="menu"
              aria-expanded={helpOpen}
              className={cn(
                "ring-focus inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                transparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted",
              )}
            >
              Help
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", helpOpen && "rotate-180")}
              />
            </button>
            {helpOpen && (
              <div
                role="menu"
                className="animate-fade-up absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-black/10"
              >
                {helpLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    role="menuitem"
                    className="ring-focus block rounded-xl px-4 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <div className="font-display text-sm font-semibold text-foreground">
                      {l.label}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{l.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggle}
            className={cn(
              "ring-focus flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              transparent
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-muted text-foreground hover:bg-muted/70",
            )}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/tours"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.04] ring-focus lg:inline-flex"
          >
            Book Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "ring-focus flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              transparent ? "bg-white/10 text-white" : "bg-muted text-foreground",
            )}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-navigation"
          className="glass max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/40 animate-fade-up lg:hidden"
        >
          <nav className="flex flex-col gap-1 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-8">
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted ring-focus"
                activeProps={{
                  className: "rounded-xl px-4 py-3 text-sm font-semibold text-foreground bg-muted",
                }}
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {helpLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted ring-focus"
                activeProps={{
                  className: "rounded-xl px-4 py-3 text-sm font-semibold text-foreground bg-muted",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tours"
              className="mt-2 rounded-xl bg-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
