import vidMuscat from "@/assets/tour-vid-muscat.mp4.asset.json";
import vidWadiShab from "@/assets/tour-vid-wadi-shab.mp4.asset.json";
import vidWahiba from "@/assets/tour-vid-wahiba.mp4.asset.json";
import vidJebelAkhdar from "@/assets/tour-vid-jebel-akhdar.mp4.asset.json";
import vidJebelShams from "@/assets/tour-vid-jebel-shams.mp4.asset.json";
import vid5Day from "@/assets/tour-vid-5day.mp4.asset.json";
import vid8Day from "@/assets/tour-vid-8day.mp4.asset.json";

// Map tour slug → unique preview video URL
export const tourVideos: Record<string, string> = {
  "muscat-city-tour": vidMuscat.url,
  "wadi-shab-bimmah-sinkhole": vidWadiShab.url,
  "wadi-bani-khalid-wahiba-sands": vidWahiba.url,
  "nizwa-jebel-akhdar": vidJebelAkhdar.url,
  "nizwa-jebel-shams": vidJebelShams.url,
  "5-day-oman-highlights": vid5Day.url,
  "8-day-grand-oman": vid8Day.url,
};

export const getTourVideo = (slug: string): string | undefined => tourVideos[slug];
