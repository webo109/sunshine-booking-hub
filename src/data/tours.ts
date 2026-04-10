import tourMuscat from "@/assets/tour-muscat.jpg";
import tourWadiShab from "@/assets/tour-wadi-shab.jpg";
import tourWahiba from "@/assets/tour-wahiba.jpg";
import tourNizwa from "@/assets/tour-nizwa.jpg";
import tourJebelShams from "@/assets/tour-jebel-shams.jpg";
import tourJebelAkhdar from "@/assets/tour-jebel-akhdar.jpg";

export interface Tour {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  duration: string;
  durationHours?: number;
  durationDays?: number;
  price: number;
  image: string;
  categories: string[];
  groupType: "Private" | "Group";
  description: string;
  itinerary: string[];
  included: string[];
  notIncluded: string[];
  pickup: string;
  maxGroupSize: number;
  availableDates: string[];
  childPrice: number;
}

function generateDates(startOffset: number, count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = startOffset; i < startOffset + count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 5) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates.slice(0, count);
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "muscat-city-tour",
    name: "Full Day Private Muscat City Tour",
    shortName: "Muscat City Tour",
    duration: "8 hours",
    durationHours: 8,
    price: 75,
    image: tourMuscat,
    categories: ["Day Trips", "City Tours"],
    groupType: "Private",
    description: "Discover the jewels of Muscat on this comprehensive full-day private tour. Visit the magnificent Sultan Qaboos Grand Mosque, explore the historic Mutrah Souq with its aromatic frankincense and traditional crafts, admire the Royal Opera House, and drive along the stunning coastal corniche. Your expert guide will share stories of Oman's rich heritage, from ancient forts to modern marvels.",
    itinerary: [
      "8:00 AM – Hotel pickup in Muscat",
      "8:30 AM – Sultan Qaboos Grand Mosque (1.5 hours)",
      "10:30 AM – Royal Opera House (exterior visit & photo stop)",
      "11:00 AM – Bait Al Zubair Museum",
      "12:30 PM – Lunch at a traditional Omani restaurant",
      "2:00 PM – Mutrah Souq & Corniche walk",
      "3:30 PM – Al Alam Palace & Jalali/Mirani Forts (exterior)",
      "4:30 PM – Return to hotel"
    ],
    included: ["Private air-conditioned 4x4 vehicle", "Professional English-speaking guide", "Hotel pickup & drop-off", "Bottled water", "All entrance fees"],
    notIncluded: ["Lunch (approx. OMR 5–8)", "Personal expenses", "Tips (optional)"],
    pickup: "All Muscat hotels & Muscat International Airport",
    maxGroupSize: 8,
    availableDates: generateDates(1, 25),
    childPrice: 40,
  },
  {
    id: "2",
    slug: "wadi-shab-bimmah-sinkhole",
    name: "Full Day Private Wadi Shab & Bimmah Sinkhole",
    shortName: "Wadi Shab Adventure",
    duration: "9 hours",
    durationHours: 9,
    price: 85,
    image: tourWadiShab,
    categories: ["Day Trips", "Wadi Adventures"],
    groupType: "Private",
    description: "Embark on an unforgettable adventure to two of Oman's most spectacular natural wonders. Swim through the turquoise pools of Wadi Shab, hike through dramatic canyon walls to hidden waterfalls, and marvel at the stunning Bimmah Sinkhole – a natural limestone crater filled with crystal-clear emerald water.",
    itinerary: [
      "7:30 AM – Hotel pickup in Muscat",
      "9:30 AM – Arrive at Bimmah Sinkhole (45 min swim & explore)",
      "10:30 AM – Drive to Wadi Shab",
      "11:00 AM – Boat crossing & begin wadi hike (2.5 hours)",
      "1:30 PM – Swim to the hidden waterfall cave",
      "2:30 PM – Lunch break (packed lunch or local restaurant)",
      "3:30 PM – Return hike to car park",
      "4:30 PM – Drive back to Muscat"
    ],
    included: ["Private 4x4 vehicle", "Professional guide", "Hotel pickup & drop-off", "Boat crossing fee", "Water & snacks"],
    notIncluded: ["Lunch", "Waterproof phone case (recommended)", "Tips"],
    pickup: "All Muscat hotels & Muscat International Airport",
    maxGroupSize: 6,
    availableDates: generateDates(1, 25),
    childPrice: 45,
  },
  {
    id: "3",
    slug: "wadi-bani-khalid-wahiba-sands",
    name: "Full Day Private Wadi Bani Khalid & Wahiba Sands Sunset",
    shortName: "Desert & Wadi Sunset",
    duration: "10 hours",
    durationHours: 10,
    price: 95,
    image: tourWahiba,
    categories: ["Day Trips", "Wadi Adventures", "Desert"],
    groupType: "Private",
    description: "Experience the stunning contrast of Oman's landscapes – from the lush emerald pools of Wadi Bani Khalid to the golden rolling dunes of Wahiba Sands. Enjoy a thrilling dune bashing experience, meet Bedouin families, and witness a breathtaking desert sunset that will stay with you forever.",
    itinerary: [
      "7:00 AM – Hotel pickup",
      "9:30 AM – Arrive at Wadi Bani Khalid",
      "10:00 AM – Swim & explore the wadi pools (1.5 hours)",
      "12:00 PM – Traditional lunch at a local house",
      "1:30 PM – Drive to Wahiba Sands",
      "3:00 PM – Dune bashing adventure (45 min)",
      "4:00 PM – Visit Bedouin camp, camel ride & Arabic coffee",
      "5:30 PM – Sunset viewing from the dunes",
      "6:00 PM – Return to Muscat"
    ],
    included: ["Private 4x4 vehicle", "Expert driver-guide", "Hotel pickup & drop-off", "Dune bashing", "Camel ride", "Arabic coffee & dates", "Water"],
    notIncluded: ["Lunch (OMR 5–7)", "Sandboarding (optional, OMR 5)", "Tips"],
    pickup: "All Muscat hotels & Airport",
    maxGroupSize: 6,
    availableDates: generateDates(2, 22),
    childPrice: 50,
  },
  {
    id: "4",
    slug: "nizwa-jebel-akhdar",
    name: "Full Day Private Nizwa & Jebel Akhdar (Green Mountain)",
    shortName: "Nizwa & Green Mountain",
    duration: "10 hours",
    durationHours: 10,
    price: 110,
    image: tourJebelAkhdar,
    categories: ["Day Trips", "Mountain", "City Tours"],
    groupType: "Private",
    description: "Journey through Oman's interior to the ancient city of Nizwa and ascend the majestic Jebel Akhdar (Green Mountain). Explore the iconic Nizwa Fort, browse the vibrant Friday goat market (Fridays only), and discover the terraced rose gardens of Jebel Akhdar at 2,000 meters above sea level with spectacular canyon views.",
    itinerary: [
      "7:00 AM – Hotel pickup",
      "9:00 AM – Nizwa Fort & Souq exploration",
      "10:30 AM – Traditional Omani halwa tasting",
      "11:00 AM – Drive up Jebel Akhdar (4x4 required)",
      "12:00 PM – Diana's Viewpoint & abandoned village walk",
      "1:00 PM – Lunch with mountain views",
      "2:30 PM – Rose garden terraces & local farms",
      "4:00 PM – Return drive via Birkat Al Mouz",
      "5:00 PM – Return to Muscat"
    ],
    included: ["Private 4x4 (required for Jebel Akhdar)", "Licensed mountain guide", "Hotel pickup & drop-off", "Nizwa Fort entrance fee", "Water & snacks"],
    notIncluded: ["Lunch (OMR 6–10)", "Rose water products (available for purchase)", "Tips"],
    pickup: "All Muscat hotels & Airport",
    maxGroupSize: 6,
    availableDates: generateDates(1, 25),
    childPrice: 60,
  },
  {
    id: "5",
    slug: "nizwa-jebel-shams",
    name: "Full Day Private Nizwa Fort & Jebel Shams (Grand Canyon of Oman)",
    shortName: "Nizwa & Grand Canyon",
    duration: "10 hours",
    durationHours: 10,
    price: 105,
    image: tourJebelShams,
    categories: ["Day Trips", "Mountain"],
    groupType: "Private",
    description: "Discover the 'Grand Canyon of Arabia' on this epic day trip. Start at the historic Nizwa Fort, then ascend to Jebel Shams – Oman's highest peak at 3,009m. Walk along the breathtaking Balcony Walk trail with 1,000-meter deep canyon views, and explore the abandoned mountain village of As Sab. An unforgettable experience for nature lovers and adventurers.",
    itinerary: [
      "6:30 AM – Hotel pickup (early start recommended)",
      "8:30 AM – Nizwa Fort & quick souq visit",
      "9:30 AM – Drive to Jebel Shams via Al Hamra",
      "10:30 AM – Al Hamra old village (quick photo stop)",
      "11:30 AM – Jebel Shams Balcony Walk (2 hours)",
      "1:30 PM – Lunch at mountain viewpoint",
      "2:30 PM – As Sab abandoned village exploration",
      "3:30 PM – Return drive",
      "5:00 PM – Return to Muscat"
    ],
    included: ["Private 4x4 vehicle", "Mountain guide", "Hotel pickup & drop-off", "Fort entrance fee", "Water & energy snacks"],
    notIncluded: ["Lunch (OMR 5–8)", "Hiking poles (recommended)", "Tips"],
    pickup: "All Muscat hotels & Airport",
    maxGroupSize: 6,
    availableDates: generateDates(1, 24),
    childPrice: 55,
  },
  {
    id: "6",
    slug: "5-day-oman-highlights",
    name: "5-Day Private Oman Highlights Tour",
    shortName: "5-Day Highlights",
    duration: "5 days / 4 nights",
    durationDays: 5,
    price: 1450,
    image: tourWahiba,
    categories: ["Multi-Day", "Desert", "Wadi Adventures", "Mountain", "City Tours"],
    groupType: "Private",
    description: "The ultimate Oman experience in 5 days. From the capital Muscat to the deserts of Wahiba Sands, the wadis, the mountains of Jebel Akhdar, and the historic forts of Nizwa – this tour covers all the highlights with luxury desert camp stays, private guides, and unforgettable experiences.",
    itinerary: [
      "Day 1: Muscat City Tour – Grand Mosque, Mutrah Souq, Royal Opera House",
      "Day 2: Wadi Shab & Bimmah Sinkhole, drive to Sur",
      "Day 3: Wahiba Sands – dune bashing, camel ride, desert camp (overnight)",
      "Day 4: Wadi Bani Khalid, drive to Nizwa, Nizwa Fort & Souq",
      "Day 5: Jebel Akhdar, return to Muscat"
    ],
    included: ["All transportation in private 4x4", "Professional guide for all 5 days", "4 nights hotel/desert camp accommodation", "Daily breakfast", "All entrance fees", "Dune bashing & camel ride", "Airport transfers"],
    notIncluded: ["International flights", "Lunches & dinners", "Travel insurance", "Personal expenses", "Tips"],
    pickup: "Muscat International Airport or any Muscat hotel",
    maxGroupSize: 6,
    availableDates: generateDates(3, 20),
    childPrice: 950,
  },
  {
    id: "7",
    slug: "8-day-grand-oman",
    name: "8-Day Grand Oman Tour",
    shortName: "8-Day Grand Tour",
    duration: "8 days / 7 nights",
    durationDays: 8,
    price: 2300,
    image: tourJebelShams,
    categories: ["Multi-Day", "Desert", "Wadi Adventures", "Mountain", "City Tours"],
    groupType: "Private",
    description: "The most comprehensive Oman tour available. In 8 magnificent days, explore every corner of this beautiful sultanate – from the cosmopolitan capital of Muscat to the remote Musandam fjords, the towering Jebel Shams canyon, the mystical Wahiba desert, and the pristine beaches of the eastern coast. This is the ultimate Oman adventure.",
    itinerary: [
      "Day 1: Arrival & Muscat City Tour",
      "Day 2: Coastal drive to Sur, Wadi Shab & Bimmah Sinkhole",
      "Day 3: Ras Al Jinz Turtle Reserve, Wahiba Sands desert camp",
      "Day 4: Desert sunrise, Wadi Bani Khalid, drive to Nizwa",
      "Day 5: Nizwa Fort, Jebel Akhdar (Green Mountain)",
      "Day 6: Jebel Shams (Grand Canyon), Balcony Walk",
      "Day 7: Bahla Fort (UNESCO), Jabreen Castle, return to Muscat",
      "Day 8: Free morning, departure transfer"
    ],
    included: ["All transportation in luxury 4x4", "Professional English-speaking guide", "7 nights accommodation (4-star hotels + desert camp)", "Daily breakfast & 3 dinners", "All entrance fees & permits", "Desert activities (dune bashing, camel ride, sandboarding)", "Turtle watching permit", "Airport transfers"],
    notIncluded: ["International flights", "Most lunches & some dinners", "Travel insurance", "Visa fees", "Personal expenses & souvenirs", "Tips"],
    pickup: "Muscat International Airport",
    maxGroupSize: 8,
    availableDates: generateDates(5, 15),
    childPrice: 1500,
  },
];

export const categories = ["All", "Day Trips", "Multi-Day", "Wadi Adventures", "Desert", "Mountain", "City Tours"];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
