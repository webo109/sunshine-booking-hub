import catDayTrips from "@/assets/cat-day-trips.mp4.asset.json";
import catWadi from "@/assets/cat-wadi.mp4.asset.json";
import catDesert from "@/assets/cat-desert.mp4.asset.json";
import catMountain from "@/assets/cat-mountain.mp4.asset.json";
import catCity from "@/assets/cat-city.mp4.asset.json";
import catMultiday from "@/assets/cat-multiday.mp4.asset.json";

// Map tour slug → preview video URL (reusing category videos)
export const tourVideos: Record<string, string> = {
  "muscat-city-tour": catDayTrips.url,
  "wadi-shab-bimmah-sinkhole": catWadi.url,
  "wadi-bani-khalid-wahiba-sands": catDesert.url,
  "nizwa-jebel-akhdar": catMultiday.url,
  "nizwa-jebel-shams": catMountain.url,
  "5-day-oman-highlights": catMultiday.url,
  "8-day-grand-oman": catCity.url,
};

export const getTourVideo = (slug: string): string | undefined => tourVideos[slug];
