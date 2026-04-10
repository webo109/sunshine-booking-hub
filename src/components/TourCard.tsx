import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Tour } from "@/data/tours";
import { Badge } from "@/components/ui/badge";

export const TourCard = ({ tour }: { tour: Tour }) => (
  <Link
    to={`/tours/${tour.slug}`}
    className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={tour.image}
        alt={tour.name}
        loading="lazy"
        width={800}
        height={600}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold">
        {tour.groupType}
      </Badge>
      {tour.durationDays && (
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {tour.durationDays} Days
        </Badge>
      )}
    </div>
    <div className="p-4 space-y-2">
      <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {tour.name}
      </h3>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {tour.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" /> Up to {tour.maxGroupSize}
        </span>
      </div>
      <div className="flex items-end justify-between pt-2 border-t">
        <div>
          <span className="text-xs text-muted-foreground">From</span>
          <p className="text-xl font-heading font-bold text-primary">
            OMR {tour.price.toLocaleString()}
          </p>
          <span className="text-xs text-muted-foreground">per person</span>
        </div>
        <span className="text-sm font-medium text-accent-foreground bg-accent px-3 py-1.5 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          View Details
        </span>
      </div>
    </div>
  </Link>
);
