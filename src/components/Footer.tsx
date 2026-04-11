import { Link } from "react-router-dom";
import { SunshineLogo } from "./SunshineLogo";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => (
  <footer id="contact" className="bg-card border-t border-border/50">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <SunshineLogo className="h-12 w-auto mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Explore the Wonders of Oman with the Best Tour Guides. 19+ years of experience.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
          <nav className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "All Tours", href: "/tours" },
              { label: "Day Trips", href: "/tours" },
              { label: "Multi-Day Tours", href: "/tours" },
            ].map((l) => (
              <Link key={l.label} to={l.href} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <a href="tel:+96892830836" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Phone className="h-4 w-4 flex-shrink-0" /> +968 9283 0836
            </a>
            <a href="mailto:info@sunshinetoursoman.com" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
              <Mail className="h-4 w-4 flex-shrink-0" /> info@sunshinetoursoman.com
            </a>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> Muscat, Sultanate of Oman
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Our Team</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Owner:</strong> Mohammed Salim Aulad Thani</p>
            <p><strong className="text-foreground">Coordinator:</strong> Maymona Alsukaty</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 mt-10 pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sunshine Tours Oman. All rights reserved.
      </div>
    </div>
  </footer>
);
