import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { useRef } from "react";
import { Tour } from "@/data/tours";
import { Badge } from "@/components/ui/badge";
import { getTourVideo } from "@/data/tourVideos";

export const TourCard = ({ tour }: { tour: Tour }) => {
  const videoUrl = getTourVideo(tour.slug);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <Link
      to={`/tours/${tour.slug}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      className="group block bg-card rounded-lg overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground font-semibold">
          {tour.groupType}
        </Badge>
        {tour.durationDays && (
          <Badge className="absolute top-3 right-3 bg-card/80 backdrop-blur text-foreground border border-border/50">
            {tour.durationDays} Days
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
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
        <div className="flex items-end justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-xl font-heading font-bold text-accent">
              OMR {tour.price.toLocaleString()}
            </p>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
          <span className="text-sm font-medium text-accent-foreground bg-accent px-3 py-1.5 rounded-md group-hover:brightness-110 transition-all">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};
