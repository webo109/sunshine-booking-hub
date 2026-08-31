import wadiShab from "@/assets/dest-wadi-shab.jpg";
import jebelShams from "@/assets/dest-jebel-shams.jpg";
import muscat from "@/assets/dest-muscat.jpg";
import nizwa from "@/assets/dest-nizwa.jpg";
import salalah from "@/assets/dest-salalah.jpg";
import misfat from "@/assets/dest-misfat.jpg";

export type Difficulty = "Easy" | "Moderate" | "Challenging";
export type TourCategory = "Day Trips" | "Overnight" | "Round Trip" | "City Tour" | "Adventure";

export interface ItineraryStop {
  time: string;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  durationHours: number;
  durationLabel: string;
  difficulty: Difficulty;
  groupType: "Private" | "Shared";
  maxGroup: number;
  categories: TourCategory[];
  adultPrice: number;
  childPrice: number;
  priceOnRequest?: boolean;
  youtubeId?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryStop[];
  pickup: string;
  meetingPoint: string;
}

export const categories: ("All" | TourCategory)[] = [
  "All",
  "Day Trips",
  "Overnight",
  "Round Trip",
  "City Tour",
  "Adventure",
];

export const difficulties: ("All" | Difficulty)[] = ["All", "Easy", "Moderate", "Challenging"];

export const tours: Tour[] = [
  {
    id: "t-001",
    slug: "wadi-shab-emerald-pools",
    name: "Wadi Shab Emerald Pools Adventure",
    shortName: "Wadi Shab",
    region: "Ash Sharqiyah",
    tagline: "Swim through carved canyons to a hidden waterfall cave.",
    description:
      "Hike, wade and swim through one of Oman's most photogenic wadis. Crystal turquoise pools, towering cliffs and a secret cave waterfall await.",
    image: wadiShab,
    gallery: [wadiShab, jebelShams, muscat],
    durationHours: 10,
    durationLabel: "Full day · 10 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 65,
    childPrice: 38,
    // "Wadi Shab Adventure with Sunshine Tours Oman", pulled from his channel.
    youtubeId: "o1sHNYDWBa0",
    highlights: [
      "Boat ride into the wadi entrance",
      "Swim to the hidden waterfall cave",
      "Stop at the dramatic Bimmah Sinkhole",
      "Lunch with sea views",
    ],
    inclusions: [
      "Private 4WD with English-speaking guide",
      "Hotel pickup & drop-off",
      "Bottled water & light refreshments",
      "Boat ticket inside the wadi",
    ],
    exclusions: ["Personal expenses", "Travel insurance", "Tips"],
    itinerary: [
      {
        time: "07:30",
        title: "Hotel Pickup",
        description: "Comfortable 4WD pickup from your Muscat hotel.",
      },
      {
        time: "09:00",
        title: "Bimmah Sinkhole",
        description: "Photo stop at the famous turquoise sinkhole.",
      },
      {
        time: "10:30",
        title: "Wadi Shab Entry",
        description: "Short boat ride and 45-min hike along the canyon.",
      },
      {
        time: "12:30",
        title: "Cave Swim",
        description: "Swim to the hidden waterfall inside the cave.",
      },
      { time: "14:00", title: "Local Lunch", description: "Omani lunch by the coast." },
      { time: "17:30", title: "Return", description: "Drop-off at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-002",
    slug: "jebel-shams-grand-canyon",
    name: "Jebel Shams Grand Canyon Trek",
    shortName: "Jebel Shams",
    region: "Ad Dakhiliyah",
    tagline: "Stand at the rim of Arabia's Grand Canyon.",
    description:
      "Drive to the Sun Mountain, Oman's highest peak, and walk the legendary balcony trail with vertigo-inducing views over deep gorges.",
    image: jebelShams,
    gallery: [jebelShams, nizwa, misfat],
    durationHours: 11,
    durationLabel: "Full day · 11 hrs",
    difficulty: "Challenging",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 85,
    childPrice: 50,
    highlights: [
      "Balcony Walk along the canyon rim",
      "Visit Nizwa Fort & souq",
      "Misfat Al Abriyeen heritage village",
      "Mountain photography stops",
    ],
    inclusions: [
      "Private 4WD with mountain-licensed guide",
      "Hotel pickup & drop-off",
      "Bottled water",
      "Fort entrance tickets",
    ],
    exclusions: ["Lunch", "Personal expenses", "Tips"],
    itinerary: [
      { time: "07:00", title: "Pickup", description: "Depart Muscat for the interior region." },
      {
        time: "09:00",
        title: "Nizwa Fort",
        description: "Explore the 17th-century fort and traditional souq.",
      },
      {
        time: "11:30",
        title: "Misfat Al Abriyeen",
        description: "Walk the falaj-irrigated mountain village.",
      },
      {
        time: "13:30",
        title: "Jebel Shams Summit",
        description: "Drive to 2,000 m and the canyon viewpoint.",
      },
      {
        time: "14:30",
        title: "Balcony Walk",
        description: "2-3 hour rim trail with dramatic views.",
      },
      { time: "18:00", title: "Return", description: "Drop-off at hotel by 18:00." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-003",
    slug: "muscat-city-private",
    name: "Muscat City Highlights",
    shortName: "Muscat City",
    region: "Muscat",
    tagline: "The capital's grand mosque, opera and seafront markets.",
    description:
      "A relaxed, fully guided introduction to Oman's capital, from the radiant Sultan Qaboos Grand Mosque to the lively Mutrah Corniche.",
    image: muscat,
    gallery: [muscat, nizwa, salalah],
    durationHours: 6,
    durationLabel: "Half day · 6 hrs",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 12,
    categories: ["City Tour", "Day Trips"],
    adultPrice: 45,
    childPrice: 25,
    // "Must Visit Place in Muscat with Sunshine Tours Oman"
    youtubeId: "tE36GXoulDg",
    highlights: [
      "Sultan Qaboos Grand Mosque",
      "Royal Opera House (exterior)",
      "Mutrah Souq & Corniche",
      "Al Alam Palace & forts",
    ],
    inclusions: [
      "Private vehicle & licensed city guide",
      "Hotel pickup & drop-off",
      "Bottled water",
    ],
    exclusions: ["Mosque dress code items", "Lunch", "Tips"],
    itinerary: [
      { time: "08:30", title: "Pickup", description: "Hotel pickup in central Muscat." },
      {
        time: "09:00",
        title: "Grand Mosque",
        description: "Visit the country's most iconic mosque.",
      },
      {
        time: "10:30",
        title: "Opera House",
        description: "Architectural stop at the Royal Opera.",
      },
      { time: "11:30", title: "Old Muscat", description: "Al Alam Palace & flanking forts." },
      { time: "12:30", title: "Mutrah Souq", description: "Wander the spice & silver market." },
      { time: "14:30", title: "Drop-off", description: "Return to your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-004",
    slug: "wahiba-sands-overnight",
    name: "Wahiba Sands Desert Overnight",
    shortName: "Wahiba Sands",
    region: "Ash Sharqiyah",
    tagline: "Sleep beneath the Milky Way in a Bedouin desert camp.",
    description:
      "Dune bash through the burning red Wahiba Sands, watch sunset from the highest dune and dine under the stars at a traditional camp.",
    image: nizwa,
    gallery: [nizwa, wadiShab, jebelShams],
    durationHours: 30,
    durationLabel: "2 days · 1 night",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Overnight", "Adventure"],
    adultPrice: 195,
    childPrice: 110,
    // "Wahiba Sands Desert with Sunshine Tours Oman"
    youtubeId: "mmumoL0cViQ",
    highlights: [
      "Sunset dune bashing",
      "Traditional Bedouin dinner",
      "Stargazing in the dunes",
      "Sunrise camel ride",
    ],
    inclusions: [
      "Private 4WD with desert-trained driver",
      "1 night camp accommodation",
      "Dinner & breakfast",
      "Camel ride",
    ],
    exclusions: ["Lunch on day 1", "Soft drinks", "Tips"],
    itinerary: [
      { time: "Day 1 · 09:00", title: "Pickup", description: "Depart Muscat for the desert." },
      {
        time: "13:00",
        title: "Wadi Bani Khalid",
        description: "Lunch and a swim in the wadi pools.",
      },
      {
        time: "15:30",
        title: "Enter Wahiba",
        description: "Dune bashing & sunset on the highest ridge.",
      },
      {
        time: "19:00",
        title: "Bedouin Dinner",
        description: "Traditional camp dinner and stargazing.",
      },
      {
        time: "Day 2 · 06:00",
        title: "Sunrise Camels",
        description: "Sunrise camel ride and breakfast.",
      },
      { time: "12:00", title: "Return", description: "Drive back to Muscat." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-005",
    slug: "salalah-discovery",
    name: "Salalah Green South Discovery",
    shortName: "Salalah",
    region: "Dhofar",
    tagline: "Waterfalls, frankincense souqs and tropical coves.",
    description:
      "A multi-day journey through Oman's tropical south: Mughsail blowholes, frankincense trails and the lush Khareef monsoon valleys.",
    image: salalah,
    gallery: [salalah, wadiShab, muscat],
    durationHours: 72,
    durationLabel: "3 days · 2 nights",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Round Trip", "Overnight"],
    adultPrice: 420,
    childPrice: 240,
    highlights: [
      "Mughsail blowholes & beach",
      "Frankincense Land Museum",
      "Wadi Darbat waterfalls",
      "Sumhuram archaeological site",
    ],
    inclusions: [
      "Private 4WD & guide",
      "2 nights 4-star hotel",
      "Daily breakfast",
      "Domestic flight Muscat-Salalah",
    ],
    exclusions: ["Lunch & dinner", "Insurance", "Tips"],
    itinerary: [
      {
        time: "Day 1",
        title: "Fly to Salalah",
        description: "Morning flight, afternoon city orientation.",
      },
      {
        time: "Day 2",
        title: "West Coast",
        description: "Mughsail beach, blowholes & frankincense trees.",
      },
      { time: "Day 3", title: "East Coast", description: "Wadi Darbat, Sumhuram & return flight." },
    ],
    pickup: "Muscat airport included",
    meetingPoint: "Muscat International Airport",
  },
  {
    id: "t-006",
    slug: "misfat-heritage",
    name: "Misfat Al Abriyeen Heritage Walk",
    shortName: "Misfat Village",
    region: "Ad Dakhiliyah",
    tagline: "A 400-year-old mountain village frozen in time.",
    description:
      "Wander the falaj-irrigated terraces and stone houses of one of Oman's most preserved villages, with a stop at the historic Bahla Fort.",
    image: misfat,
    gallery: [misfat, nizwa, jebelShams],
    durationHours: 8,
    durationLabel: "Full day · 8 hrs",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 10,
    categories: ["Day Trips", "City Tour"],
    adultPrice: 55,
    childPrice: 32,
    highlights: [
      "Walk the ancient falaj system",
      "UNESCO Bahla Fort",
      "Local Omani coffee with dates",
      "Pottery village of Bahla",
    ],
    inclusions: ["Private 4WD & guide", "Hotel pickup", "Water"],
    exclusions: ["Lunch", "Tips"],
    itinerary: [
      { time: "08:00", title: "Pickup", description: "Depart Muscat westwards." },
      { time: "10:00", title: "Bahla Fort", description: "UNESCO site visit." },
      {
        time: "12:00",
        title: "Misfat Walk",
        description: "Guided heritage walk through the village.",
      },
      { time: "16:00", title: "Return", description: "Drive back to Muscat." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-007",
    slug: "nizwa-friday-souq",
    name: "Nizwa Friday Goat Souq & Fort",
    shortName: "Nizwa Souq",
    region: "Ad Dakhiliyah",
    tagline: "The famous Friday morning livestock auction in old Oman.",
    description:
      "Wake before dawn for one of Oman's most authentic spectacles: the bustling Friday goat market in Nizwa, followed by the towering Nizwa Fort and a tasting at a date farm.",
    image: nizwa,
    gallery: [nizwa, jebelShams, misfat],
    durationHours: 9,
    durationLabel: "Full day · 9 hrs",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "City Tour"],
    adultPrice: 60,
    childPrice: 35,
    // "Nizwa Fort – Oman's Mighty Stronghold with Sunshine Tours Oman"
    youtubeId: "9nDQvtwKxWw",
    highlights: [
      "The Friday morning goat & cattle auction",
      "Climb Nizwa Fort's defensive tower",
      "Silver dagger souq of Nizwa",
      "Date farm tasting & coffee",
    ],
    inclusions: ["Private 4WD & guide", "Hotel pickup", "Bottled water", "Fort entrance fees"],
    exclusions: ["Lunch", "Personal expenses", "Tips"],
    itinerary: [
      {
        time: "06:00",
        title: "Early Pickup",
        description: "Depart Muscat before sunrise to catch the souq.",
      },
      {
        time: "07:30",
        title: "Goat Souq",
        description: "Live auction in the round livestock courtyard.",
      },
      {
        time: "09:30",
        title: "Nizwa Fort",
        description: "Defensive tower, falaj system and museum.",
      },
      { time: "11:30", title: "Souq Wander", description: "Silver, daggers, dates and pottery." },
      { time: "13:00", title: "Date Farm", description: "Lunch and tasting at a working farm." },
      { time: "16:30", title: "Return", description: "Drop-off at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-008",
    slug: "musandam-fjord-cruise",
    name: "Musandam Fjords Dhow Cruise",
    shortName: "Musandam",
    region: "Musandam",
    tagline: "The Norway of Arabia, with turquoise fjords and dolphins.",
    description:
      "A traditional dhow cruise through the dramatic limestone fjords of the Musandam peninsula, with snorkelling stops, dolphin sightings and a fresh Omani buffet on board.",
    image: muscat,
    gallery: [muscat, salalah, wadiShab],
    durationHours: 12,
    durationLabel: "Full day · 12 hrs",
    difficulty: "Easy",
    groupType: "Shared",
    maxGroup: 20,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 95,
    childPrice: 55,
    highlights: [
      "Wooden dhow through the fjords",
      "Dolphin spotting",
      "Snorkelling at Telegraph Island",
      "Onboard Omani buffet lunch",
    ],
    inclusions: [
      "Dhow cruise (4 hrs)",
      "Snorkelling gear",
      "Buffet lunch & soft drinks",
      "Khasab hotel pickup",
    ],
    exclusions: ["Flight to Khasab", "Personal items", "Tips"],
    itinerary: [
      {
        time: "08:00",
        title: "Khasab Pickup",
        description: "Pickup from your Khasab hotel or harbour.",
      },
      {
        time: "09:00",
        title: "Board Dhow",
        description: "Set sail aboard a traditional Omani dhow.",
      },
      {
        time: "10:30",
        title: "Telegraph Island",
        description: "Anchor for swimming and snorkelling.",
      },
      { time: "12:30", title: "Buffet Lunch", description: "Fresh Omani buffet served on deck." },
      { time: "14:00", title: "Dolphin Bay", description: "Spot pods of spinner dolphins." },
      { time: "16:00", title: "Return to Khasab", description: "Drop-off at your hotel." },
    ],
    pickup: "Khasab hotels (free)",
    meetingPoint: "Khasab harbour",
  },
  {
    id: "t-009",
    slug: "ras-al-jinz-turtle",
    name: "Ras Al Jinz Turtle Beach Overnight",
    shortName: "Turtle Beach",
    region: "Ash Sharqiyah",
    tagline: "Watch endangered green turtles nest under starlight.",
    description:
      "An ethically guided night visit to the Ras Al Jinz Turtle Reserve, one of the most important nesting sites for green turtles in the Indian Ocean. Sleep at the reserve eco-lodge.",
    image: salalah,
    gallery: [salalah, wadiShab, nizwa],
    durationHours: 28,
    durationLabel: "2 days · 1 night",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Overnight", "Adventure"],
    adultPrice: 230,
    childPrice: 130,
    highlights: [
      "Guided turtle nesting tour",
      "Stay at the Ras Al Jinz Eco-Lodge",
      "Bimmah Sinkhole en route",
      "Wadi Shab swim stop",
    ],
    inclusions: [
      "Private 4WD with guide",
      "Eco-lodge accommodation",
      "Dinner & breakfast",
      "Reserve entry & ranger guide",
    ],
    exclusions: ["Lunch on day 1", "Personal expenses", "Tips"],
    itinerary: [
      {
        time: "Day 1 · 09:00",
        title: "Pickup",
        description: "Drive south along the Coastal Road.",
      },
      {
        time: "11:30",
        title: "Bimmah Sinkhole",
        description: "Swim and lunch at the natural pool.",
      },
      { time: "14:00", title: "Wadi Shab Walk", description: "Optional short canyon hike." },
      {
        time: "17:30",
        title: "Eco-Lodge",
        description: "Check in and dinner overlooking the bay.",
      },
      {
        time: "21:00",
        title: "Turtle Tour",
        description: "Guided night walk on the nesting beach.",
      },
      {
        time: "Day 2 · 09:00",
        title: "Return",
        description: "Breakfast and drive back to Muscat.",
      },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-010",
    slug: "grand-tour-7days",
    name: "Grand Oman Round Trip · 7 Days",
    shortName: "Grand Tour",
    region: "All Oman",
    tagline: "The complete Sultanate, from Muscat to Wahiba to Jebel Shams.",
    description:
      "Our most comprehensive itinerary: seven curated days covering Muscat, the Hajar mountains, Jebel Shams, the Wahiba desert, the wadis of the east coast and the turtle beaches. Hotels and most meals included.",
    image: jebelShams,
    gallery: [jebelShams, nizwa, salalah, wadiShab, muscat, misfat],
    durationHours: 168,
    durationLabel: "7 days · 6 nights",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Round Trip", "Overnight", "Adventure"],
    adultPrice: 1180,
    childPrice: 690,
    highlights: [
      "All major regions in one trip",
      "Mix of 4-star hotels and a desert camp",
      "Daily breakfast and most dinners",
      "Private guide for the full week",
    ],
    inclusions: [
      "Private 4WD & guide for 7 days",
      "6 nights accommodation (4-star + camp)",
      "Daily breakfast and 4 dinners",
      "All entrance fees & permits",
    ],
    exclusions: ["International flights", "Some lunches & dinners", "Personal items", "Tips"],
    itinerary: [
      { time: "Day 1", title: "Muscat City", description: "Mosque, opera, Mutrah souq." },
      {
        time: "Day 2",
        title: "Nizwa & Misfat",
        description: "Fort, souq and the heritage village.",
      },
      { time: "Day 3", title: "Jebel Shams", description: "Balcony Walk and mountain hotel." },
      { time: "Day 4", title: "Wahiba Sands", description: "Drive into the dunes for camp night." },
      { time: "Day 5", title: "Wadi Bani Khalid", description: "Pools, hike and coastal hotel." },
      { time: "Day 6", title: "Wadi Shab & Sinkhole", description: "Swim cave and turtle beach." },
      {
        time: "Day 7",
        title: "Return to Muscat",
        description: "Coastal drive back, drop-off at airport or hotel.",
      },
    ],
    pickup: "Muscat airport or hotels (free)",
    meetingPoint: "Muscat International Airport",
  },
  {
    id: "t-011",
    slug: "snorkel-daymaniyat",
    name: "Daymaniyat Islands Snorkel & Swim",
    shortName: "Daymaniyat Snorkel",
    region: "Muscat",
    tagline: "A protected marine reserve of coral gardens and reef sharks.",
    description:
      "A boat day to the protected Daymaniyat archipelago, with coral reefs, turtles, reef sharks and the chance to spot whale sharks in season. Includes snorkel gear and lunch.",
    image: salalah,
    gallery: [salalah, wadiShab, muscat],
    durationHours: 7,
    durationLabel: "Half day · 7 hrs",
    difficulty: "Easy",
    groupType: "Shared",
    maxGroup: 12,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 70,
    childPrice: 40,
    highlights: [
      "3 snorkel stops at coral gardens",
      "Sea turtles and reef sharks",
      "Whale sharks in season (Aug–Oct)",
      "Onboard lunch and refreshments",
    ],
    inclusions: [
      "Speedboat charter",
      "Snorkel gear & life vest",
      "Marine reserve permits",
      "Onboard lunch",
    ],
    exclusions: ["Hotel transfer to marina", "Wetsuit rental", "Tips"],
    itinerary: [
      { time: "08:00", title: "Marina Check-in", description: "Brief and safety on the dock." },
      { time: "09:00", title: "First Reef", description: "Snorkel the inner reef gardens." },
      { time: "11:00", title: "Second Reef", description: "Deeper reef with turtles and rays." },
      { time: "12:30", title: "Lunch on Board", description: "Buffet served as we cruise." },
      {
        time: "13:30",
        title: "Final Stop",
        description: "Last snorkel, with a chance for whale shark in season.",
      },
      { time: "15:00", title: "Return to Marina", description: "Disembark at Al Mouj marina." },
    ],
    pickup: "Marina meeting point (transfers extra)",
    meetingPoint: "Al Mouj Marina, Muscat",
  },
  {
    id: "t-013",
    slug: "jebel-akhdar-rose-mountain",
    name: "Jebel Akhdar Rose Mountain Day",
    shortName: "Jebel Akhdar",
    region: "Ad Dakhiliyah",
    tagline: "Terraced rose gardens at 2,000 metres in the Green Mountain.",
    description:
      "Climb to the cool Saiq plateau on Oman's Green Mountain: terraced villages, ancient rose-water distilleries, and dramatic valley viewpoints. In April the slopes turn pink with the famous Damask rose harvest.",
    image: jebelShams,
    gallery: [jebelShams, misfat, nizwa],
    durationHours: 10,
    durationLabel: "Full day · 10 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 80,
    childPrice: 45,
    // "At Jebel Akhdar with Sunshine Tours Oman"
    youtubeId: "9JlfGIEToyI",
    highlights: [
      "Saiq plateau viewpoints",
      "Damask rose terraces (Apr–May)",
      "Traditional rose-water distillation",
      "Stop at Birkat Al Mouz village",
    ],
    inclusions: [
      "Private 4WD with mountain-licensed guide",
      "Hotel pickup & drop-off",
      "Bottled water",
      "Police checkpoint clearance",
    ],
    exclusions: ["Lunch", "Personal expenses", "Tips"],
    itinerary: [
      { time: "07:30", title: "Pickup", description: "Depart Muscat for the interior region." },
      {
        time: "09:30",
        title: "Birkat Al Mouz",
        description: "Falaj system and abandoned mud village.",
      },
      {
        time: "11:00",
        title: "Saiq Plateau",
        description: "Drive up the 4WD-only switchback to 2,000 m.",
      },
      {
        time: "12:00",
        title: "Rose Villages",
        description: "Walk the terraces of Al Aqr, Al Ayn and Ash Sharayjah.",
      },
      {
        time: "14:00",
        title: "Diana's Point",
        description: "Cliff-edge viewpoint over the canyon.",
      },
      { time: "17:30", title: "Return", description: "Drop-off at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-014",
    slug: "nakhal-wakan-mountain-village",
    name: "Nakhal Fort & Wakan Mountain Village",
    shortName: "Nakhal & Wakan",
    region: "Al Batinah",
    tagline: "A 17th-century fort, hot springs and a stair-stepped grape village.",
    description:
      "Pair the dramatic, palm-encircled Nakhal Fort with the steep stone stairs of Wakan, a tiny mountain village famous for grapes, apricots and one of the most photogenic views in Oman.",
    image: misfat,
    gallery: [misfat, jebelShams, nizwa],
    durationHours: 9,
    durationLabel: "Full day · 9 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "City Tour"],
    adultPrice: 65,
    childPrice: 38,
    highlights: [
      "Nakhal Fort & rooftop views",
      "A'Thawarah hot springs",
      "Climb the Wakan village stairs",
      "Mountain-orchard photography",
    ],
    inclusions: [
      "Private 4WD with guide",
      "Hotel pickup & drop-off",
      "Fort entrance ticket",
      "Bottled water",
    ],
    exclusions: ["Lunch", "Personal expenses", "Tips"],
    itinerary: [
      {
        time: "08:00",
        title: "Pickup",
        description: "Depart Muscat westwards along the Batinah coast.",
      },
      {
        time: "09:30",
        title: "Nakhal Fort",
        description: "Tour the restored 17th-century fortress.",
      },
      {
        time: "10:30",
        title: "A'Thawarah Springs",
        description: "Quick stop at the date-shaded hot springs.",
      },
      {
        time: "12:30",
        title: "Wakan Village",
        description: "Climb the stone stairway through grape terraces.",
      },
      {
        time: "14:00",
        title: "Mountain Lunch",
        description: "Optional Omani lunch with valley views.",
      },
      { time: "17:00", title: "Return", description: "Drop-off at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-015",
    slug: "wadi-al-arbeieen-adventure",
    name: "Wadi Al Arbeieen Pools Adventure",
    shortName: "Wadi Al Arbeieen",
    region: "Muscat",
    tagline: "Forty natural pools tucked behind the Hajar foothills.",
    description:
      "A short, scenic 4WD trail leads to one of Muscat's best-kept wadis, a string of crystal pools shaded by date palms, perfect for a swim, a picnic and a quick rope-assisted scramble.",
    image: wadiShab,
    gallery: [wadiShab, salalah, muscat],
    durationHours: 8,
    durationLabel: "Full day · 8 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 60,
    childPrice: 35,
    highlights: [
      "Off-road wadi entry",
      "Swim in the deepest pool",
      "Date palm picnic spot",
      "Quiet alternative to Wadi Shab",
    ],
    inclusions: [
      "Private 4WD & guide",
      "Hotel pickup & drop-off",
      "Picnic lunch & water",
      "Snorkel masks",
    ],
    exclusions: ["Travel insurance", "Personal items", "Tips"],
    itinerary: [
      { time: "08:00", title: "Pickup", description: "Hotel pickup in Muscat." },
      { time: "09:30", title: "Quriyat Coast", description: "Coastal photo stop on the way." },
      { time: "10:30", title: "Wadi Trail", description: "Short off-road into the wadi mouth." },
      { time: "11:30", title: "Pools & Swim", description: "Walk between pools, swim, picnic." },
      { time: "15:00", title: "Return", description: "Drive back along the coastal road." },
      { time: "17:00", title: "Drop-off", description: "Back at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-012",
    slug: "wadi-bani-khalid-tiwi",
    name: "Wadi Bani Khalid & Tiwi Coast",
    shortName: "Bani Khalid",
    region: "Ash Sharqiyah",
    tagline: "Crystal pools, palm-lined wadi and the white beach of Tiwi.",
    description:
      "Spend a day swimming in the year-round emerald pools of Wadi Bani Khalid, then continue to the cliff-edge village of Tiwi for a quiet beach picnic before heading home.",
    image: wadiShab,
    gallery: [wadiShab, salalah, muscat],
    durationHours: 11,
    durationLabel: "Full day · 11 hrs",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 75,
    childPrice: 42,
    // "At Wadi Bani Khalid with Sunshine Tours Oman"
    youtubeId: "8fAZMZfWsQk",
    highlights: [
      "Year-round natural pools",
      "Palm-shaded picnic spots",
      "Quiet white sand at Tiwi",
      "Coastal scenic drive",
    ],
    inclusions: [
      "Private 4WD & guide",
      "Hotel pickup & drop-off",
      "Bottled water and snacks",
      "Picnic lunch",
    ],
    exclusions: ["Travel insurance", "Personal items", "Tips"],
    itinerary: [
      { time: "07:30", title: "Pickup", description: "Hotel pickup in Muscat." },
      { time: "09:30", title: "Bimmah Sinkhole", description: "Photo stop and quick swim." },
      { time: "11:00", title: "Wadi Bani Khalid", description: "Pools, picnic and short hike." },
      { time: "14:30", title: "Tiwi Beach", description: "Quiet beach time on the coast." },
      {
        time: "16:30",
        title: "Coastal Drive Home",
        description: "Scenic return along the cliffs.",
      },
      { time: "18:30", title: "Drop-off", description: "Back at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
];

// ---------------------------------------------------------------------------
// Round-trip signature tours, each named after the operator's catalogue.
// These are multi-day private journeys quoted on request after a short
// consultation about dates, group size and travel style.
// ---------------------------------------------------------------------------

const roundTripStub = (
  partial: Pick<
    Tour,
    | "id"
    | "slug"
    | "name"
    | "shortName"
    | "tagline"
    | "description"
    | "image"
    | "gallery"
    | "durationHours"
    | "durationLabel"
    | "difficulty"
    | "highlights"
    | "itinerary"
  > & { region?: string; categories?: TourCategory[] },
): Tour => ({
  region: partial.region ?? "All Oman",
  groupType: "Private",
  maxGroup: 8,
  categories: partial.categories ?? ["Round Trip", "Overnight"],
  adultPrice: 0,
  childPrice: 0,
  priceOnRequest: true,
  inclusions: [
    "Private 4WD with multilingual guide",
    "Hotel & camp accommodation as per itinerary",
    "Daily breakfast",
    "All entrance fees & permits",
  ],
  exclusions: [
    "International flights",
    "Most lunches & dinners",
    "Travel insurance",
    "Personal expenses & tips",
  ],
  pickup: "Muscat airport or hotels (free)",
  meetingPoint: "Muscat International Airport",
  ...partial,
});

const roundTrips: Tour[] = [
  roundTripStub({
    id: "rt-zahra",
    slug: "zahra-spring-blossom",
    name: "Zahra · Spring Blossom Round Trip",
    shortName: "Zahra Tour",
    region: "Ad Dakhiliyah & Muscat",
    tagline: "Catch the Damask rose harvest on Jebel Akhdar.",
    description:
      "A short, photogenic round trip timed for the April rose season: Muscat's grand mosque, the rose terraces of Saiq, the falaj villages of Misfat, and a mountain hotel night before returning along the coast.",
    image: jebelShams,
    gallery: [jebelShams, misfat, muscat],
    durationHours: 96,
    durationLabel: "4 days · 3 nights",
    difficulty: "Moderate",
    highlights: [
      "Sultan Qaboos Grand Mosque",
      "Rose harvest at Saiq plateau",
      "Misfat heritage walk",
      "Mountain hotel sunrise",
    ],
    itinerary: [
      {
        time: "Day 1",
        title: "Muscat",
        description: "City highlights and overnight in the capital.",
      },
      {
        time: "Day 2",
        title: "Nizwa & Misfat",
        description: "Fort, souq and the falaj-irrigated village.",
      },
      {
        time: "Day 3",
        title: "Jebel Akhdar",
        description: "Rose villages and a night at altitude.",
      },
      {
        time: "Day 4",
        title: "Coast & return",
        description: "Mountain descent and back to Muscat.",
      },
    ],
  }),
  roundTripStub({
    id: "rt-jamila",
    slug: "jamila-coast-fjords",
    name: "Jamila · Coast & Fjords Round Trip",
    shortName: "Jamila Tour",
    region: "Musandam & Muscat",
    tagline: "Beaches, dhow cruise and the limestone fjords of the north.",
    description:
      "Pair the capital with a flight north to Musandam for a traditional dhow cruise through the Strait of Hormuz fjords, dolphin spotting, snorkelling and a quiet beach hotel before flying south again.",
    image: muscat,
    gallery: [muscat, salalah, wadiShab],
    durationHours: 96,
    durationLabel: "4 days · 3 nights",
    difficulty: "Easy",
    highlights: [
      "Muscat Corniche walk",
      "Domestic flight to Khasab",
      "Half-day dhow & snorkel",
      "Quiet beach evening",
    ],
    itinerary: [
      {
        time: "Day 1",
        title: "Muscat",
        description: "Mosque, opera, Mutrah souq and Corniche dinner.",
      },
      {
        time: "Day 2",
        title: "Fly to Khasab",
        description: "Short flight and afternoon harbour walk.",
      },
      {
        time: "Day 3",
        title: "Fjord cruise",
        description: "Dhow day with snorkelling and lunch on board.",
      },
      { time: "Day 4", title: "Return", description: "Morning flight back to Muscat." },
    ],
  }),
  roundTripStub({
    id: "rt-asilah",
    slug: "asilah-heritage",
    name: "Asilah · Heritage Round Trip",
    shortName: "Asilah Tour",
    region: "Ad Dakhiliyah & Al Sharqiyah",
    tagline: "Forts, falaj, and the rhythm of old Oman.",
    description:
      "A heritage-first round trip for guests who want context with their views: Bahla, Nizwa, Jabreen, the Friday goat souq and a night in a restored heritage house.",
    image: nizwa,
    gallery: [nizwa, misfat, jebelShams],
    durationHours: 120,
    durationLabel: "5 days · 4 nights",
    difficulty: "Easy",
    highlights: [
      "UNESCO Bahla Fort",
      "Nizwa fort & Friday souq",
      "Jabreen Castle",
      "Night in a heritage house",
    ],
    itinerary: [
      { time: "Day 1", title: "Muscat", description: "Old Muscat and Mutrah." },
      { time: "Day 2", title: "Bahla & Jabreen", description: "Fort, castle and pottery village." },
      { time: "Day 3", title: "Misfat", description: "Falaj walk and heritage-house overnight." },
      {
        time: "Day 4",
        title: "Nizwa souq",
        description: "Friday goat market and silver shopping.",
      },
      { time: "Day 5", title: "Return", description: "Drive back to Muscat for departure." },
    ],
  }),
  roundTripStub({
    id: "rt-amira",
    slug: "amira-luxury",
    name: "Amira · Signature Luxury Round Trip",
    shortName: "Amira Tour",
    region: "All Oman",
    tagline: "Five-star hotels, private dining and a mountain helicopter option.",
    description:
      "Our most curated itinerary: five-star coastal, mountain and desert properties paired with private chefs, a sunset dhow charter and an optional helicopter transfer between Jebel Akhdar and the Wahiba camp.",
    image: jebelShams,
    gallery: [jebelShams, salalah, wadiShab, muscat],
    durationHours: 168,
    durationLabel: "7 days · 6 nights",
    difficulty: "Easy",
    highlights: [
      "5-star resorts throughout",
      "Sunset dhow with private chef",
      "Optional helicopter transfer",
      "Spa night in the desert",
    ],
    itinerary: [
      {
        time: "Day 1–2",
        title: "Muscat luxury",
        description: "Beach resort, private city tour, sunset dhow.",
      },
      {
        time: "Day 3–4",
        title: "Jebel Akhdar",
        description: "Cliff-edge resort, terraced gardens and spa.",
      },
      {
        time: "Day 5–6",
        title: "Wahiba",
        description: "Premium desert camp with private dune dinner.",
      },
      { time: "Day 7", title: "Return", description: "Coastal drive back to Muscat." },
    ],
  }),
  roundTripStub({
    id: "rt-maryam",
    slug: "maryam-cultural",
    name: "Maryam · Cultural & Spiritual Round Trip",
    shortName: "Maryam Tour",
    region: "Muscat & Ad Dakhiliyah",
    tagline: "Mosques, museums and the prophets' graves of Salalah.",
    description:
      "A spiritual circuit including the Sultan Qaboos and Sultan Qaboos Sport Mosques, the National Museum, the Bait Al Zubair private collection, and a southern leg to the historic shrines of Salalah.",
    image: muscat,
    gallery: [muscat, salalah, nizwa],
    durationHours: 144,
    durationLabel: "6 days · 5 nights",
    difficulty: "Easy",
    highlights: [
      "Sultan Qaboos Grand Mosque",
      "National Museum private guide",
      "Bait Al Zubair collection",
      "Salalah heritage day",
    ],
    itinerary: [
      { time: "Day 1", title: "Arrival", description: "Hotel rest after long-haul flight." },
      { time: "Day 2", title: "Muscat heritage", description: "Mosque, museum and old Muscat." },
      { time: "Day 3", title: "Nizwa & Bahla", description: "Fort tour and traditional crafts." },
      { time: "Day 4", title: "Fly to Salalah", description: "Tomb visits and old souq." },
      {
        time: "Day 5",
        title: "Coast & frankincense",
        description: "Mughsail and the frankincense trail.",
      },
      { time: "Day 6", title: "Return", description: "Morning flight back, evening departure." },
    ],
  }),
  roundTripStub({
    id: "rt-maymona",
    slug: "maymona-family",
    name: "Maymona · Family-Friendly Round Trip",
    shortName: "Maymona Tour",
    region: "All Oman",
    tagline: "Easy pace, kid-friendly stops, room for every appetite.",
    description:
      "A relaxed, child-paced loop with shorter driving days, swimmable wadis, a desert camp with private tent, and a coastal hotel finale. Halal options on every menu.",
    image: wadiShab,
    gallery: [wadiShab, nizwa, salalah, muscat],
    durationHours: 120,
    durationLabel: "5 days · 4 nights",
    difficulty: "Easy",
    highlights: [
      "Wadi Bani Khalid pools",
      "Private desert tent",
      "Beach picnic at Tiwi",
      "Family-friendly mosque visit",
    ],
    itinerary: [
      {
        time: "Day 1",
        title: "Muscat",
        description: "Easy half-day city tour, hotel pool afternoon.",
      },
      {
        time: "Day 2",
        title: "Wadi Bani Khalid",
        description: "Swim and picnic, then on to the desert.",
      },
      { time: "Day 3", title: "Wahiba", description: "Camel ride, dune sunset and camp night." },
      { time: "Day 4", title: "Coast", description: "Beach time and a quiet seaside hotel." },
      { time: "Day 5", title: "Return", description: "Coastal drive back to Muscat." },
    ],
  }),
  roundTripStub({
    id: "rt-jasim",
    slug: "jasim-adventure",
    name: "Jasim · Mountain & Desert Adventure",
    shortName: "Jasim Tour",
    region: "Ad Dakhiliyah & Al Sharqiyah",
    tagline: "Canyon trekking, dune bashing and a wadi swim every day.",
    description:
      "An active circuit for guests who want to earn the view: the Balcony Walk on Jebel Shams, off-road desert tracks across the Wahiba, swims in Wadi Shab and a final coastal hike.",
    image: jebelShams,
    gallery: [jebelShams, wadiShab, nizwa],
    durationHours: 144,
    durationLabel: "6 days · 5 nights",
    difficulty: "Challenging",
    highlights: [
      "Jebel Shams Balcony Walk",
      "Wahiba dune crossing",
      "Wadi Shab cave swim",
      "Coastal cliff hike",
    ],
    itinerary: [
      {
        time: "Day 1",
        title: "Muscat to Nizwa",
        description: "Quick city tour and on to the interior.",
      },
      { time: "Day 2", title: "Jebel Shams", description: "Full-day Balcony Walk." },
      {
        time: "Day 3",
        title: "Misfat to Wahiba",
        description: "Mountain village walk, then desert camp.",
      },
      { time: "Day 4", title: "Desert crossing", description: "Off-road dune day, camp swap." },
      { time: "Day 5", title: "Wadi Shab", description: "Hike and cave swim." },
      { time: "Day 6", title: "Return", description: "Coastal hike and drive back to Muscat." },
    ],
  }),
  roundTripStub({
    id: "rt-mohammed",
    slug: "mohammed-classic",
    name: "Mohammed · Classic Oman Round Trip",
    shortName: "Mohammed Tour",
    region: "All Oman",
    tagline: "The greatest hits: capital, mountain, desert, wadi, coast.",
    description:
      "Our flagship classic: the must-see capital, the heritage interior, the Wahiba dunes, the Eastern wadis and the turtle beach in a single, well-paced loop.",
    image: nizwa,
    gallery: [nizwa, jebelShams, salalah, wadiShab, muscat, misfat],
    durationHours: 168,
    durationLabel: "7 days · 6 nights",
    difficulty: "Moderate",
    highlights: [
      "Muscat city",
      "Nizwa fort & souq",
      "Jebel Shams Balcony Walk",
      "Wahiba camp & turtle beach",
    ],
    itinerary: [
      { time: "Day 1", title: "Muscat", description: "Capital highlights." },
      { time: "Day 2", title: "Nizwa", description: "Fort, souq and overnight in the interior." },
      { time: "Day 3", title: "Jebel Shams", description: "Canyon rim walk." },
      { time: "Day 4", title: "Wahiba", description: "Desert camp." },
      { time: "Day 5", title: "Wadi Shab", description: "Hike and swim." },
      { time: "Day 6", title: "Turtle beach", description: "Ras Al Jinz nesting visit." },
      { time: "Day 7", title: "Return", description: "Coastal drive back to Muscat." },
    ],
  }),
  roundTripStub({
    id: "rt-mazoon",
    slug: "mazoon-grand-discovery",
    name: "Mazoon · Grand Discovery Round Trip",
    shortName: "Mazoon Tour",
    region: "All Oman",
    tagline: "The longest journey, Muscat to Salalah and everything between.",
    description:
      "Our deepest itinerary, named after the historical Persian name for Oman. It covers every region from the northern fjords to the southern monsoon coast, with a bias toward archaeology, frankincense routes and the working harbours.",
    image: salalah,
    gallery: [salalah, jebelShams, nizwa, muscat, wadiShab, misfat],
    durationHours: 240,
    durationLabel: "10 days · 9 nights",
    difficulty: "Moderate",
    highlights: [
      "Musandam fjord cruise",
      "Frankincense Land Museum",
      "Sumhuram archaeological site",
      "Empty Quarter edge",
    ],
    itinerary: [
      { time: "Day 1–2", title: "Muscat & Musandam", description: "Capital and northern fjord." },
      { time: "Day 3–4", title: "Interior", description: "Nizwa, Bahla, Jebel Shams." },
      { time: "Day 5–6", title: "Wahiba & wadis", description: "Desert and Eastern wadis." },
      {
        time: "Day 7–8",
        title: "Southern flight",
        description: "Salalah and the frankincense trail.",
      },
      { time: "Day 9", title: "Empty Quarter", description: "Edge of the Rub' al Khali." },
      { time: "Day 10", title: "Return", description: "Flight back to Muscat for departure." },
    ],
  }),
];

// ---------------------------------------------------------------------------
// Additional day trips & overnights from the operator's printed catalogue.
// Priced and itinerised so the booking flow works on these too.
// ---------------------------------------------------------------------------

const additionalTours: Tour[] = [
  {
    id: "t-016",
    slug: "wadi-dham-cliff-village",
    name: "Wadi Dham Cliff Village Day",
    shortName: "Wadi Dham",
    region: "Ad Dakhiliyah",
    tagline: "A clifftop falaj village over a hidden mountain canyon.",
    description:
      "Walk the abandoned mud-brick alleyways of a clifftop village, follow the falaj channels along the canyon edge, and picnic with views straight down into the wadi.",
    image: misfat,
    gallery: [misfat, jebelShams, nizwa],
    durationHours: 9,
    durationLabel: "Full day · 9 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 70,
    childPrice: 40,
    highlights: [
      "Clifftop village walk",
      "Falaj channel trail",
      "Canyon-edge picnic",
      "Quieter than Misfat",
    ],
    inclusions: ["Private 4WD with guide", "Hotel pickup", "Bottled water", "Picnic lunch"],
    exclusions: ["Personal expenses", "Tips"],
    itinerary: [
      { time: "08:00", title: "Pickup", description: "Depart Muscat for the interior region." },
      {
        time: "10:30",
        title: "Cliff arrival",
        description: "Drive up the access road to the village.",
      },
      {
        time: "11:00",
        title: "Falaj walk",
        description: "Two-hour heritage walk along the irrigation system.",
      },
      { time: "13:00", title: "Picnic", description: "Lunch on the canyon-edge viewpoint." },
      { time: "16:00", title: "Return", description: "Drive back to Muscat." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-017",
    slug: "oman-historical-forts",
    name: "Historical Tour · Three Forts of the Interior",
    shortName: "Historical Tour",
    region: "Ad Dakhiliyah",
    tagline: "Three centuries of Omani forts in a single day.",
    description:
      "A heritage-first day covering Nizwa Fort, the UNESCO Bahla Fort and the elegant Jabreen Castle, the architectural triangle that shaped pre-modern Oman.",
    image: nizwa,
    gallery: [nizwa, misfat, jebelShams],
    durationHours: 11,
    durationLabel: "Full day · 11 hrs",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Day Trips", "City Tour"],
    adultPrice: 65,
    childPrice: 38,
    highlights: [
      "Nizwa Fort defensive tower",
      "UNESCO Bahla Fort",
      "Jabreen Castle ceilings",
      "Bahla pottery village",
    ],
    inclusions: ["Private 4WD with guide", "Hotel pickup", "All entrance tickets", "Bottled water"],
    exclusions: ["Lunch", "Personal expenses", "Tips"],
    itinerary: [
      { time: "07:30", title: "Pickup", description: "Depart Muscat westwards." },
      { time: "09:30", title: "Nizwa Fort", description: "Defensive tower, falaj and museum." },
      { time: "11:30", title: "Bahla", description: "UNESCO fort and pottery workshops." },
      {
        time: "13:30",
        title: "Jabreen Castle",
        description: "Painted ceilings and astronomical murals.",
      },
      { time: "15:30", title: "Souq stop", description: "Optional silver and dagger browsing." },
      { time: "18:30", title: "Return", description: "Drop-off at your hotel." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-018",
    slug: "desert-adventure-day",
    name: "Wahiba Desert Adventure Day",
    shortName: "Desert Adventure",
    region: "Ash Sharqiyah",
    tagline: "Dune bashing and sunset on the Wahiba ridge, back same day.",
    description:
      "For travellers without a free night to spare: a long day-loop into the Wahiba dunes, lunch at a local farm, dune bashing on the highest ridges and a sunset tea before the drive back.",
    image: nizwa,
    gallery: [nizwa, wadiShab, jebelShams],
    durationHours: 12,
    durationLabel: "Long day · 12 hrs",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 90,
    childPrice: 52,
    highlights: [
      "Wadi Bani Khalid swim",
      "Sand-board the highest dune",
      "Bedouin-style sunset tea",
      "Same-day return",
    ],
    inclusions: [
      "Private 4WD with desert-trained driver",
      "Hotel pickup & drop-off",
      "Lunch at a local farm",
      "Sand-boards & water",
    ],
    exclusions: ["Personal expenses", "Tips"],
    itinerary: [
      { time: "07:00", title: "Pickup", description: "Early start for the desert." },
      { time: "10:30", title: "Wadi Bani Khalid", description: "Pool swim and shaded walk." },
      {
        time: "13:00",
        title: "Farm lunch",
        description: "Traditional Omani lunch at a date farm.",
      },
      { time: "15:30", title: "Enter Wahiba", description: "Dune bashing and sand-boarding." },
      {
        time: "17:30",
        title: "Sunset tea",
        description: "Bedouin-style tea on the highest ridge.",
      },
      { time: "19:00", title: "Return", description: "Drive back to Muscat." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-019",
    slug: "sea-tour-dolphins-bandar",
    name: "Sea Tour · Dolphins & Hidden Coves",
    shortName: "Sea Tour",
    region: "Muscat",
    tagline: "A half-day boat charter from Muscat marina, dolphins guaranteed in season.",
    description:
      "Step onto a private speedboat at the Bandar Al Rowdha marina, cruise the Muscat coast, swim in two hidden coves and watch resident pods of spinner dolphins on the way back.",
    image: salalah,
    gallery: [salalah, wadiShab, muscat],
    durationHours: 5,
    durationLabel: "Half day · 5 hrs",
    difficulty: "Easy",
    groupType: "Shared",
    maxGroup: 10,
    categories: ["Day Trips", "Adventure"],
    adultPrice: 55,
    childPrice: 32,
    highlights: [
      "Spinner dolphin pods",
      "Two hidden cove swims",
      "Snorkel mask included",
      "Marina photo stop",
    ],
    inclusions: [
      "Private speedboat charter",
      "Snorkel gear & life vests",
      "Bottled water",
      "Marina meeting point",
    ],
    exclusions: ["Hotel transfer to marina", "Lunch", "Tips"],
    itinerary: [
      { time: "08:30", title: "Marina check-in", description: "Brief and safety on the dock." },
      { time: "09:00", title: "Set sail", description: "Cruise the Muscat coast eastward." },
      { time: "10:00", title: "First cove", description: "Anchor and swim in a quiet cove." },
      { time: "11:30", title: "Dolphin watch", description: "Cruise the resident pod's bay." },
      { time: "12:30", title: "Return", description: "Disembark at the marina." },
    ],
    pickup: "Marina meeting point (transfers extra)",
    meetingPoint: "Bandar Al Rowdha Marina, Muscat",
  },
  {
    id: "t-020",
    slug: "al-jamal-camel-overnight",
    name: "Al Jamal · Camel Overnight in the Wahiba",
    shortName: "Al Jamal",
    region: "Ash Sharqiyah",
    tagline: "The camel takes centre stage: long ride, racing camp, Bedouin host.",
    description:
      "Built around Oman's heritage relationship with the camel. Visit a working racing camp, take a longer-than-usual sunset camel ride into the dunes, and dine with a Bedouin family before sleeping in a private tent.",
    image: nizwa,
    gallery: [nizwa, wadiShab, jebelShams],
    durationHours: 30,
    durationLabel: "2 days · 1 night",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Overnight", "Adventure"],
    adultPrice: 220,
    childPrice: 125,
    highlights: [
      "Working camel-racing camp",
      "Long sunset camel ride",
      "Dinner with a Bedouin family",
      "Private desert tent",
    ],
    inclusions: [
      "Private 4WD with desert driver",
      "1 night private tent",
      "Dinner & breakfast",
      "Camel ride & racing camp visit",
    ],
    exclusions: ["Lunch on day 1", "Drinks", "Tips"],
    itinerary: [
      { time: "Day 1 · 09:00", title: "Pickup", description: "Depart Muscat for the desert." },
      { time: "13:30", title: "Racing camp", description: "Visit a working camel-racing camp." },
      { time: "15:30", title: "Enter Wahiba", description: "Drive into the dunes." },
      {
        time: "16:30",
        title: "Long camel ride",
        description: "Sunset ride into the deeper dunes.",
      },
      {
        time: "19:30",
        title: "Bedouin dinner",
        description: "Family-hosted dinner under the stars.",
      },
      { time: "Day 2 · 08:00", title: "Breakfast & return", description: "Drive back to Muscat." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
  {
    id: "t-021",
    slug: "al-luban-frankincense-trail",
    name: "Al Luban · The Frankincense Trail",
    shortName: "Al Luban",
    region: "Dhofar",
    tagline: "On the trail of Oman's signature scent: trees, museum, harvest.",
    description:
      "A three-day immersion in Oman's frankincense story, from the ancient harbour of Sumhuram to the wild Boswellia groves of Wadi Dawkah, with a night in Salalah's frankincense-souq quarter.",
    image: salalah,
    gallery: [salalah, muscat, wadiShab],
    durationHours: 72,
    durationLabel: "3 days · 2 nights",
    difficulty: "Easy",
    groupType: "Private",
    maxGroup: 8,
    categories: ["Overnight", "Round Trip"],
    adultPrice: 380,
    childPrice: 215,
    highlights: [
      "Frankincense Land Museum",
      "Wild Boswellia groves at Wadi Dawkah",
      "UNESCO Sumhuram harbour ruins",
      "Frankincense souq overnight",
    ],
    inclusions: [
      "Private 4WD & guide",
      "2 nights 4-star Salalah hotel",
      "Domestic flights Muscat–Salalah",
      "All entrance fees",
    ],
    exclusions: ["Most meals", "Travel insurance", "Tips"],
    itinerary: [
      {
        time: "Day 1",
        title: "Fly to Salalah",
        description: "Morning flight, afternoon city orientation.",
      },
      {
        time: "Day 2",
        title: "Frankincense day",
        description: "Museum, Wadi Dawkah groves, Sumhuram.",
      },
      {
        time: "Day 3",
        title: "Souq & return",
        description: "Souq tasting and afternoon flight back.",
      },
    ],
    pickup: "Muscat airport included",
    meetingPoint: "Muscat International Airport",
  },
  {
    id: "t-022",
    slug: "al-raihan-wadi-overnight",
    name: "Al Raihan · Wadi-to-Wadi Overnight",
    shortName: "Al Raihan",
    region: "Ash Sharqiyah",
    tagline: "Two wadis, one camp under the stars, among sweet basil and date palms.",
    description:
      "Swim Wadi Bani Khalid in the late afternoon light, drive across the Sharqiyah ridge to a quiet wadi camp surrounded by date palms, then explore Wadi Shab the following morning.",
    image: wadiShab,
    gallery: [wadiShab, nizwa, salalah],
    durationHours: 30,
    durationLabel: "2 days · 1 night",
    difficulty: "Moderate",
    groupType: "Private",
    maxGroup: 6,
    categories: ["Overnight", "Adventure"],
    adultPrice: 195,
    childPrice: 110,
    highlights: [
      "Wadi Bani Khalid evening swim",
      "Date-palm camp under stars",
      "Wadi Shab morning hike",
      "Bimmah Sinkhole stop",
    ],
    inclusions: [
      "Private 4WD with guide",
      "1 night camp accommodation",
      "Dinner & breakfast",
      "Wadi entrance fees",
    ],
    exclusions: ["Lunch on day 1", "Drinks", "Tips"],
    itinerary: [
      { time: "Day 1 · 09:00", title: "Pickup", description: "Depart Muscat eastwards." },
      { time: "13:00", title: "Lunch & swim", description: "Wadi Bani Khalid pools and lunch." },
      { time: "17:00", title: "Camp arrival", description: "Quiet wadi camp under date palms." },
      { time: "Day 2 · 08:00", title: "Breakfast", description: "Then drive to Wadi Shab." },
      { time: "10:00", title: "Wadi Shab hike", description: "Morning canyon walk and cave swim." },
      { time: "15:00", title: "Return", description: "Coastal drive back via Bimmah Sinkhole." },
    ],
    pickup: "Muscat hotels (free)",
    meetingPoint: "Your Muscat hotel lobby",
  },
];

tours.push(...additionalTours);

tours.push(...roundTrips);

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tours.map((t) => t.slug);
}
