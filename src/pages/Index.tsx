import { Link } from "react-router-dom";
import { Search, Star, Shield, Globe, Clock, Award, ChevronRight, ChevronDown, Mountain, Waves, Sun, Building, Map, Compass } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-oman.jpg";
import heroVideo from "@/assets/hero-oman.mp4.asset.json";
import tourMuscat from "@/assets/tour-muscat.jpg";
import tourWadiShab from "@/assets/tour-wadi-shab.jpg";
import tourWahiba from "@/assets/tour-wahiba.jpg";
import tourJebelShams from "@/assets/tour-jebel-shams.jpg";
import tourJebelAkhdar from "@/assets/tour-jebel-akhdar.jpg";
import tourNizwa from "@/assets/tour-nizwa.jpg";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/TourCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SunshineLogo } from "@/components/SunshineLogo";
import catDayTrips from "@/assets/cat-day-trips.mp4.asset.json";
import catWadi from "@/assets/cat-wadi.mp4.asset.json";
import catDesert from "@/assets/cat-desert.mp4.asset.json";
import catMountain from "@/assets/cat-mountain.mp4.asset.json";
import catCity from "@/assets/cat-city.mp4.asset.json";
import catMultiday from "@/assets/cat-multiday.mp4.asset.json";

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

const tourCategories = [
  { label: "Day Trips", icon: Sun, image: tourMuscat, video: catDayTrips.url, href: "/tours", rotation: "-rotate-3" },
  { label: "Wadi Adventures", icon: Waves, image: tourWadiShab, video: catWadi.url, href: "/tours", rotation: "rotate-2" },
  { label: "Desert Tours", icon: Compass, image: tourWahiba, video: catDesert.url, href: "/tours", rotation: "-rotate-2" },
  { label: "Mountain Trips", icon: Mountain, image: tourJebelShams, video: catMountain.url, href: "/tours", rotation: "rotate-3" },
  { label: "City Tours", icon: Building, image: tourNizwa, video: catCity.url, href: "/tours", rotation: "-rotate-1" },
  { label: "Multi-Day", icon: Map, image: tourJebelAkhdar, video: catMultiday.url, href: "/tours", rotation: "rotate-1" },
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
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo.url} type="video/mp4" />
          <img src={heroImage} alt="Oman desert landscape" className="absolute inset-0 w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="relative z-10 container text-center text-foreground px-4">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 text-accent font-body font-medium">
            Sunshine Tours Oman
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
            Discover where your
          </h1>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight italic">
            Adventure Begins
          </h1>

          {/* Search */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tours by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-base bg-card/90 backdrop-blur text-foreground rounded-full border-border/50 shadow-xl focus:border-accent"
            />
            {search && filteredTours.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card rounded-lg shadow-xl overflow-hidden z-20 border border-border/50">
                {filteredTours.map((t) => (
                  <Link
                    key={t.id}
                    to={`/tours/${t.slug}`}
                    className="block px-4 py-3 hover:bg-muted text-foreground text-left text-sm border-b border-border/30 last:border-0"
                  >
                    <span className="font-medium">{t.name}</span>
                    <span className="ml-2 text-accent">OMR {t.price}</span>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center cursor-pointer">
            <ChevronDown className="h-5 w-5 text-accent-foreground" />
          </div>
        </div>
      </section>

      {/* Category Cards - Polaroid Style */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-2">Explore By Category</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Choose Your Adventure</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {tourCategories.map((cat) => (
              <CategoryCard
                key={cat.label}
                label={cat.label}
                image={cat.image}
                videoUrl={cat.video}
                href={cat.href}
                rotation={cat.rotation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-2">Our Popular Tours</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Featured Experiences</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/tours">
              <Button variant="outline" size="lg" className="rounded-full border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground">
                View All Tours <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 19+ Years Badge */}
      <section className="py-8">
        <div className="container flex justify-center">
          <div className="flex items-center gap-4 bg-card border border-accent/30 rounded-full px-8 py-4">
            <SunshineLogo className="h-12 w-auto" />
            <div className="border-l border-border/50 pl-4">
              <p className="text-2xl font-heading font-bold text-accent">19+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Why Choose Sunshine Tours?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "19+ Years Experience", desc: "Trusted by thousands of travelers from around the world since 2006." },
              { icon: Shield, title: "Private & Group Tours", desc: "Flexible options for solo travelers, couples, families, and large groups." },
              { icon: Globe, title: "Multi-Language Guides", desc: "Professional guides speaking English, Arabic, and more." },
              { icon: Clock, title: "Flexible Scheduling", desc: "Choose your dates. Hotel pickup & drop-off included on every tour." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-card rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-2">Traveler Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
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
