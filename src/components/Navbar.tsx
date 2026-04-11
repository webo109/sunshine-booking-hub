import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { SunshineLogo } from "./SunshineLogo";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-18">
        <Link to="/" className="flex-shrink-0">
          <SunshineLogo className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+96892830836" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
            <Phone className="h-4 w-4" />
            +968 9283 0836
          </a>
          <Link to="/tours">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-md">
              Book Now
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border/50 animate-fade-in">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+96892830836" className="flex items-center gap-2 py-2 text-base text-muted-foreground">
              <Phone className="h-4 w-4" /> +968 9283 0836
            </a>
            <Link to="/tours" onClick={() => setOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground font-semibold">Book Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
