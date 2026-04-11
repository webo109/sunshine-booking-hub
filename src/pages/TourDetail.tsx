import { useParams, Link, useNavigate } from "react-router-dom";
import { getTourBySlug } from "@/data/tours";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Check, X, Minus, Plus } from "lucide-react";
import { useState } from "react";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tour = getTourBySlug(slug || "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Tour not found</h1>
          <Link to="/tours"><Button>Back to Tours</Button></Link>
        </div>
      </div>
    );
  }

  const availableSet = new Set(tour.availableDates);
  const total = adults * tour.price + children * tour.childPrice;

  const handleBook = () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    navigate(`/book/${tour.slug}?date=${dateStr}&adults=${adults}&children=${children}`);
  };

  return (
    <div className="min-h-screen py-6 md:py-10">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/tours" className="hover:text-accent">Tours</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{tour.shortName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <div className="rounded-xl overflow-hidden aspect-[16/9] border border-border/50">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" width={800} height={600} />
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.categories.map((c) => (
                  <Badge key={c} variant="secondary" className="bg-secondary text-secondary-foreground">{c}</Badge>
                ))}
                <Badge className="bg-accent text-accent-foreground">{tour.groupType}</Badge>
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-4">{tour.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-accent" /> {tour.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4 text-accent" /> Max {tour.maxGroupSize} people</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" /> {tour.pickup}</span>
              </div>
              <p className="text-foreground/80 leading-relaxed">{tour.description}</p>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-heading text-xl font-bold mb-4 text-foreground">Itinerary</h2>
              <div className="space-y-3">
                {tour.itinerary.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground/80 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="font-heading text-lg font-bold mb-3 text-accent">What's Included</h3>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="font-heading text-lg font-bold mb-3 text-destructive">Not Included</h3>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl border border-border/50 p-6 space-y-6">
              <div>
                <span className="text-sm text-muted-foreground">From</span>
                <p className="font-heading text-3xl font-bold text-accent">OMR {tour.price.toLocaleString()}</p>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>

              {/* Calendar */}
              <div>
                <h4 className="font-semibold text-sm mb-2 text-foreground">Select Date</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const ds = date.toISOString().split("T")[0];
                    return date < new Date() || !availableSet.has(ds);
                  }}
                  className="rounded-md border border-border/50 pointer-events-auto"
                />
              </div>

              {/* Guests */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Guests</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">Adults</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center font-medium text-foreground">{adults}</span>
                    <button onClick={() => setAdults(Math.min(tour.maxGroupSize, adults + 1))} className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/80">Children (3–12)</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center font-medium text-foreground">{children}</span>
                    <button onClick={() => setChildren(Math.min(4, children + 1))} className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              {/* Price summary */}
              <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-foreground/80">
                  <span>{adults} adult{adults > 1 ? "s" : ""} × OMR {tour.price}</span>
                  <span>OMR {(adults * tour.price).toLocaleString()}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between text-foreground/80">
                    <span>{children} child{children > 1 ? "ren" : ""} × OMR {tour.childPrice}</span>
                    <span>OMR {(children * tour.childPrice).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base border-t border-border/50 pt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">OMR {total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleBook}
                disabled={!selectedDate}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base h-12"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
