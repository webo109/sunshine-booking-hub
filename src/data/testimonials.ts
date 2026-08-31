// ============================================================================
// REVIEWS WALL: placeholders for the homepage Testimonials section.
// ============================================================================
//
// HOW TO FILL THESE BEFORE THE PITCH (≈10 min):
//
// 1. Open Sunshine Tours' TripAdvisor page in a browser:
//    https://www.tripadvisor.com/Attraction_Review-g1940497-d8617192-Reviews-Sunshine_Tours_Oman-Muscat_Muscat_Governorate.html
//
// 2. Pick 3 or 4 reviews that:
//    - Show a first name + country (e.g. "Sarah, United Kingdom")
//    - Mention a tour by name if possible (Wadi Shab, Wahiba, etc.)
//    - Are 2–4 sentences long (don't paste full essays)
//    - Are 5-star ratings
//
// 3. For each review, replace ONE entry below by filling in:
//    - name, country, initials (first letters of name), date
//    - tourSlug + tourName if the review mentions a specific tour
//    - quote (the review text, paraphrase if it's very long)
//
// 4. Save the file. The Testimonials component automatically hides any entry
//    where `quote` is empty, so unused slots disappear cleanly. No broken UI
//    if you only fill in 2, the section adapts to whatever you supply.
//
// 5. Optional: drop the file count to fewer entries if you only have 2 quotes.
//
// ============================================================================

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  initials: string;
  rating: number;
  date: string;
  tourSlug?: string;
  tourName?: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "rev-001",
    name: "REPLACE: first name + country from TripAdvisor",
    country: "",
    initials: "??",
    rating: 5,
    date: "",
    tourSlug: undefined,
    tourName: undefined,
    quote: "", // ← paste the real review text here, then save
  },
  {
    id: "rev-002",
    name: "REPLACE: first name + country from TripAdvisor",
    country: "",
    initials: "??",
    rating: 5,
    date: "",
    tourSlug: undefined,
    tourName: undefined,
    quote: "",
  },
  {
    id: "rev-003",
    name: "REPLACE: first name + country from TripAdvisor",
    country: "",
    initials: "??",
    rating: 5,
    date: "",
    tourSlug: undefined,
    tourName: undefined,
    quote: "",
  },
  {
    id: "rev-004",
    name: "REPLACE: first name + country from TripAdvisor",
    country: "",
    initials: "??",
    rating: 5,
    date: "",
    tourSlug: undefined,
    tourName: undefined,
    quote: "",
  },
];
