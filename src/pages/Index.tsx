import { Link } from "react-router-dom";
import { Search, Star, Shield, Globe, Clock, Award, ChevronRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-oman.jpg";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const testimonials = [
  {
    name: "Sarah M.",
    country: "United Kingdom",
    text: "Absolutely incredible experience! Mohammed and his team made our Wadi Shab trip unforgettable. The guide was knowledgeable, friendly, and went above and beyond. Best tour company in Oman!",
    rating: 5,
  },
  {
    name: "Hans & Petra K.",
    country: "Germany",
    text: "We booked the 5-day tour and it exceeded all expectations. Every detail was perfectly planned. The desert camp under the stars was magical. Highly recommend Sunshine Tours!",
    rating: 5,
  },
  {
    name: "James T.",
    country: "Australia",
    text: "Our private Muscat city tour was fantastic. Our guide shared so much history and culture. The Grand Mosque visit was breathtaking. Will definitely book again when we return to Oman.",
    rating: 5,
  },
  {
    name: "Marie L.",
    country: "France",
    text: "The Jebel Shams Grand Canyon tour was the highlight of our trip to Oman. Stunning views, professional guide, and a very comfortable vehicle. Maymona was so helpful with the booking!",
    rating: 5,
  },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const featuredTours = tours.slice(0, 4);

  const filteredTours = search
    ? tours.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Oman desert landscape" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 container text-center text-white px-4">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 opacity-90 font-body">
            Sunshine Tours Oman
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Explore the Wonders<br />of Oman
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto font-body">
            With the Best Tour Guides · 19+ Years of Experience
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tours by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-base bg-white/95 text-foreground rounded-full border-0 shadow-xl"
            />
            {search && filteredTours.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card rounded-lg shadow-xl overflow-hidden z-20">
                {filteredTours.map((t) => (
                  <Link
                    key={t.id}
                    to={`/tours/${t.slug}`}
                    className="block px-4 py-3 hover:bg-muted text-foreground text-left text-sm border-b last:border-0"
                  >
                    <span className="font-medium">{t.name}</span>
                    <span className="ml-2 text-muted-foreground">OMR {t.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/tours">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold px-8 rounded-full shadow-lg">
              Book Your Adventure Today
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-foreground font-semibold mb-2">Our Popular Tours</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Featured Experiences</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/tours">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Tours <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Why Choose Sunshine Tours?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "19+ Years Experience", desc: "Trusted by thousands of travelers from around the world since 2006." },
              { icon: Shield, title: "Private & Group Tours", desc: "Flexible options for solo travelers, couples, families, and large groups." },
              { icon: Globe, title: "Multi-Language Guides", desc: "Professional guides speaking English, Arabic, and more." },
              { icon: Clock, title: "Flexible Scheduling", desc: "Choose your dates. Hotel pickup & drop-off included on every tour." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-foreground font-semibold mb-2">Traveler Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card p-6 rounded-lg shadow-md border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
