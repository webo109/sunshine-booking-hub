import { useState } from "react";
import { tours, categories } from "@/data/tours";
import { TourCard } from "@/components/TourCard";

const Tours = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? tours : tours.filter((t) => t.categories.includes(active));

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-2">Explore Oman</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">Our Tours</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover Oman's most stunning destinations with our private guided tours.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground border border-border/50 hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No tours found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Tours;
