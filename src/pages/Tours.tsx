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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
