import { Link } from "react-router-dom";
import { useRef } from "react";

interface CategoryCardProps {
  label: string;
  image: string;
  videoUrl: string;
  href: string;
  rotation: string;
}

export const CategoryCard = ({ label, image, videoUrl, href, rotation }: CategoryCardProps) => {
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
      to={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      className={`group relative bg-card border-2 border-border/50 rounded-xl p-3 pb-4 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 ${rotation}`}
    >
      <div className="aspect-square rounded-lg overflow-hidden mb-3 shadow-inner relative">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      <p className="text-center font-heading font-bold text-sm text-foreground uppercase tracking-wider">
        {label}
      </p>
    </Link>
  );
};
