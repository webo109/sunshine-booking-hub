import { Link } from "react-router-dom";
import { SunshineLogo } from "./SunshineLogo";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => (
  <footer id="contact" className="bg-primary text-primary-foreground">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <SunshineLogo className="h-12 w-auto brightness-200 mb-4" />
          <p className="text-sm opacity-80 leading-relaxed">
            Explore the Wonders of Oman with the Best Tour Guides. 19+ years of experience.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "All Tours", href: "/tours" },
              { label: "Day Trips", href: "/tours" },
              { label: "Multi-Day Tours", href: "/tours" },
            ].map((l) => (
              <Link key={l.label} to={l.href} className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <a href="tel:+96892830836" className="flex items-center gap-2 opacity-80 hover:opacity-100">
              <Phone className="h-4 w-4 flex-shrink-0" /> +968 9283 0836
            </a>
            <a href="mailto:info@sunshinetoursoman.com" className="flex items-center gap-2 opacity-80 hover:opacity-100">
              <Mail className="h-4 w-4 flex-shrink-0" /> info@sunshinetoursoman.com
            </a>
            <div className="flex items-start gap-2 opacity-80">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> Muscat, Sultanate of Oman
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Our Team</h4>
          <div className="space-y-2 text-sm opacity-80">
            <p><strong>Owner:</strong> Mohammed Salim Aulad Thani</p>
            <p><strong>Coordinator:</strong> Maymona Alsukaty</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Sunshine Tours Oman. All rights reserved.
      </div>
    </div>
  </footer>
);
