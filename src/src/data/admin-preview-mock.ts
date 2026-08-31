// Mock data for the operator dashboard prototype (/admin-preview).
// Designed to feel real for the demo: realistic names, plausible amounts,
// a coherent narrative across views (today's chaos, this week's load, the
// stories behind individual bookings).

export type Urgency = "critical" | "warning" | "ok";

export type ActionKind =
  | "assign-driver"
  | "chase-confirmation"
  | "respond-inquiry"
  | "confirm-pickup"
  | "review-response"
  | "guide-conflict";

export interface ActionItem {
  id: string;
  urgency: Urgency;
  kind: ActionKind;
  title: string;
  context: string;
  meta: string;
  cta: string;
  bookingRef?: string;
}

export const todayActions: ActionItem[] = [
  {
    id: "act-01",
    urgency: "critical",
    kind: "assign-driver",
    title: "Wahiba Sunset · pickup in 45 minutes",
    context: "Lisa Schmidt · 4 guests · Crowne Plaza Muscat · driver not assigned",
    meta: "Suggested: Ahmed (German) + Vehicle 3 (4×4 ready)",
    cta: "Assign now",
    bookingRef: "STO-WX4P9",
  },
  {
    id: "act-02",
    urgency: "critical",
    kind: "chase-confirmation",
    title: "Booking unconfirmed 3 days · STO-7K2P",
    context: "Marco Bianchi · Wahiba overnight · OMR 320 · awaiting confirmation",
    meta: "Last contact 5 days ago via WhatsApp",
    cta: "Send polite follow-up",
    bookingRef: "STO-7K2P",
  },
  {
    id: "act-03",
    urgency: "critical",
    kind: "respond-inquiry",
    title: "WhatsApp inquiry · 92 min unread",
    context:
      'Hans Müller (German) · "Sind diese Daten für 4 Personen verfügbar? Wahiba 12-13 Mai"',
    meta: "AI drafted reply ready in German · review and send",
    cta: "Open draft",
  },
  {
    id: "act-04",
    urgency: "warning",
    kind: "confirm-pickup",
    title: "Hotel pickup unconfirmed · STO-9X1A",
    context: "Sophie Laurent · Wadi Shab tomorrow 7:30 · Crowne Plaza Muscat",
    meta: "Hotel hasn't replied to confirmation request",
    cta: "Call hotel desk",
    bookingRef: "STO-9X1A",
  },
  {
    id: "act-05",
    urgency: "warning",
    kind: "review-response",
    title: "New TripAdvisor review · 5 stars",
    context:
      'Anna Kowalski · "Khalid was the most knowledgeable guide I\'ve had in any country."',
    meta: "Posted 3 hours ago · respond within 24h for best engagement",
    cta: "Draft thank-you",
  },
  {
    id: "act-06",
    urgency: "warning",
    kind: "guide-conflict",
    title: "Guide schedule conflict · Ahmed",
    context: "Nizwa 14:00 ends at 17:00 · Wahiba 16:00 needs him",
    meta: "Reassign one of the two. Suggested: Khalid for Wahiba",
    cta: "Resolve conflict",
  },
];

export type TourStatus = "ok" | "warning" | "risk" | "blocked";

export interface ScheduledTour {
  id: string;
  time: string; // "08:00"
  endTime: string;
  tourSlug: string;
  tourName: string;
  customerName: string;
  customerNationality: string;
  partySize: number;
  guideName?: string;
  guideLanguage?: string;
  vehicleId?: string;
  status: TourStatus;
  pickupHotel?: string;
  bookingRef?: string;
  revenueOmr: number;
}

export const todaysTours: ScheduledTour[] = [
  {
    id: "t-01",
    time: "08:00",
    endTime: "13:00",
    tourSlug: "wadi-shab-emerald-pools",
    tourName: "Wadi Shab",
    customerName: "Famiglia Romano",
    customerNationality: "🇮🇹 Italy",
    partySize: 4,
    guideName: "Khalid",
    guideLanguage: "Italian",
    vehicleId: "Vehicle 2",
    status: "ok",
    pickupHotel: "Kempinski Muscat",
    bookingRef: "STO-K3R7M",
    revenueOmr: 380,
  },
  {
    id: "t-02",
    time: "10:30",
    endTime: "14:00",
    tourSlug: "muscat-city-private",
    tourName: "Muscat City",
    customerName: "James Wright",
    customerNationality: "🇬🇧 UK",
    partySize: 2,
    guideName: "Salim",
    guideLanguage: "English",
    vehicleId: "Vehicle 1",
    status: "ok",
    pickupHotel: "Shangri-La Barr Al Jissah",
    bookingRef: "STO-MX2C1",
    revenueOmr: 145,
  },
  {
    id: "t-03",
    time: "14:00",
    endTime: "17:00",
    tourSlug: "nizwa-friday-souq",
    tourName: "Nizwa Half-Day",
    customerName: "Hoffmann Family",
    customerNationality: "🇩🇪 Germany",
    partySize: 3,
    guideName: "Ahmed",
    guideLanguage: "German",
    vehicleId: "Vehicle 1",
    status: "warning",
    pickupHotel: "Grand Hyatt Muscat",
    bookingRef: "STO-NZ8K2",
    revenueOmr: 210,
  },
  {
    id: "t-04",
    time: "16:00",
    endTime: "20:30",
    tourSlug: "wahiba-sands-overnight",
    tourName: "Wahiba Sunset",
    customerName: "Lisa Schmidt",
    customerNationality: "🇩🇪 Germany",
    partySize: 4,
    guideName: undefined,
    vehicleId: "Vehicle 3",
    status: "risk",
    pickupHotel: "Crowne Plaza Muscat",
    bookingRef: "STO-WX4P9",
    revenueOmr: 505,
  },
];

export interface WeekDay {
  date: string; // "May 6"
  dayName: string;
  dayShort: string;
  isToday?: boolean;
  blocked?: { reason: string };
  tours: ScheduledTour[];
  capacityHint?: string;
}

export const weekDays: WeekDay[] = [
  {
    date: "May 5",
    dayName: "Sunday",
    dayShort: "Sun",
    tours: [
      {
        id: "w-01",
        time: "08:00",
        endTime: "13:00",
        tourSlug: "wadi-shab-emerald-pools",
        tourName: "Wadi Shab",
        customerName: "Park Family",
        customerNationality: "🇰🇷 Korea",
        partySize: 3,
        guideName: "Khalid",
        guideLanguage: "English",
        vehicleId: "V2",
        status: "ok",
        revenueOmr: 285,
      },
    ],
  },
  {
    date: "May 6",
    dayName: "Monday",
    dayShort: "Mon",
    tours: [
      {
        id: "w-02",
        time: "08:00",
        endTime: "13:00",
        tourSlug: "wadi-shab-emerald-pools",
        tourName: "Wadi Shab",
        customerName: "Anna Kowalski",
        customerNationality: "🇵🇱 Poland",
        partySize: 2,
        guideName: "Salim",
        guideLanguage: "English",
        vehicleId: "V1",
        status: "ok",
        revenueOmr: 190,
      },
      {
        id: "w-03",
        time: "14:00",
        endTime: "18:00",
        tourSlug: "muscat-city-private",
        tourName: "Muscat City",
        customerName: "Verma Family",
        customerNationality: "🇮🇳 India",
        partySize: 4,
        guideName: "Salim",
        guideLanguage: "English",
        vehicleId: "V1",
        status: "ok",
        revenueOmr: 280,
      },
    ],
  },
  {
    date: "May 7",
    dayName: "Tuesday",
    dayShort: "Tue",
    isToday: true,
    tours: todaysTours,
    capacityHint: "Today is the busiest day this week",
  },
  {
    date: "May 8",
    dayName: "Wednesday",
    dayShort: "Wed",
    tours: [
      {
        id: "w-04",
        time: "07:30",
        endTime: "20:00",
        tourSlug: "jebel-shams-grand-canyon",
        tourName: "Jebel Shams",
        customerName: "Bianchi Couple",
        customerNationality: "🇮🇹 Italy",
        partySize: 2,
        guideName: "Khalid",
        guideLanguage: "Italian",
        vehicleId: "V2",
        status: "ok",
        revenueOmr: 290,
      },
      {
        id: "w-05",
        time: "08:00",
        endTime: "13:00",
        tourSlug: "wadi-shab-emerald-pools",
        tourName: "Wadi Shab",
        customerName: "Dubois Group",
        customerNationality: "🇫🇷 France",
        partySize: 6,
        guideName: undefined,
        vehicleId: undefined,
        status: "warning",
        revenueOmr: 540,
      },
      {
        id: "w-06",
        time: "10:00",
        endTime: "15:00",
        tourSlug: "nakhal-wakan-mountain-village",
        tourName: "Nakhal & Wakan",
        customerName: "Tanaka Family",
        customerNationality: "🇯🇵 Japan",
        partySize: 4,
        guideName: "Hamed",
        guideLanguage: "English",
        vehicleId: "V3",
        status: "ok",
        revenueOmr: 320,
      },
      {
        id: "w-07",
        time: "13:00",
        endTime: "18:00",
        tourSlug: "muscat-city-private",
        tourName: "Muscat City",
        customerName: "Smith Couple",
        customerNationality: "🇺🇸 USA",
        partySize: 2,
        guideName: "Salim",
        guideLanguage: "English",
        vehicleId: "V1",
        status: "ok",
        revenueOmr: 150,
      },
      {
        id: "w-08",
        time: "16:00",
        endTime: "12:00 next day",
        tourSlug: "wahiba-sands-overnight",
        tourName: "Wahiba Overnight",
        customerName: "Marco Bianchi",
        customerNationality: "🇮🇹 Italy",
        partySize: 2,
        guideName: undefined,
        vehicleId: undefined,
        status: "risk",
        revenueOmr: 320,
      },
    ],
  },
  {
    date: "May 9",
    dayName: "Thursday",
    dayShort: "Thu",
    tours: [
      {
        id: "w-09",
        time: "09:00",
        endTime: "14:00",
        tourSlug: "wadi-bani-khalid-tiwi",
        tourName: "Wadi Bani Khalid",
        customerName: "Schultz Couple",
        customerNationality: "🇩🇪 Germany",
        partySize: 2,
        guideName: "Ahmed",
        guideLanguage: "German",
        vehicleId: "V2",
        status: "ok",
        revenueOmr: 220,
      },
    ],
    capacityHint: "Light day · push for Thursday Wadi Shab promo",
  },
  {
    date: "May 10",
    dayName: "Friday",
    dayShort: "Fri",
    blocked: { reason: "Weekly closure (Friday)" },
    tours: [],
  },
  {
    date: "May 11",
    dayName: "Saturday",
    dayShort: "Sat",
    tours: [
      {
        id: "w-10",
        time: "08:00",
        endTime: "20:00",
        tourSlug: "salalah-discovery",
        tourName: "Salalah Discovery (1/3)",
        customerName: "Petersen Family",
        customerNationality: "🇩🇰 Denmark",
        partySize: 4,
        guideName: "Khalid",
        guideLanguage: "English",
        vehicleId: "V2",
        status: "ok",
        revenueOmr: 1450,
      },
      {
        id: "w-11",
        time: "08:00",
        endTime: "14:00",
        tourSlug: "muscat-city-private",
        tourName: "Muscat City",
        customerName: "Liu Couple",
        customerNationality: "🇨🇳 China",
        partySize: 2,
        guideName: "Salim",
        guideLanguage: "English",
        vehicleId: "V1",
        status: "ok",
        revenueOmr: 145,
      },
      {
        id: "w-12",
        time: "14:00",
        endTime: "18:30",
        tourSlug: "misfat-heritage",
        tourName: "Misfat Heritage",
        customerName: "Garcia Couple",
        customerNationality: "🇪🇸 Spain",
        partySize: 2,
        guideName: "Hamed",
        guideLanguage: "Spanish",
        vehicleId: "V3",
        status: "ok",
        revenueOmr: 195,
      },
    ],
  },
];

export interface RevenueSnapshot {
  todayConfirmed: number;
  todayPending: number;
  todayAtRisk: number;
  weekTotal: number;
  weekDeltaPct: number; // +12 = up 12%
  monthTotal: number;
  monthGoal: number;
  monthDaysLeft: number;
  topTour: { name: string; bookings: number; pctOfRevenue: number };
  coldTour: { name: string; deltaPct: number }; // negative
}

export const revenueSnapshot: RevenueSnapshot = {
  todayConfirmed: 1240,
  todayPending: 380,
  todayAtRisk: 145,
  weekTotal: 8420,
  weekDeltaPct: 12,
  monthTotal: 18200,
  monthGoal: 26000,
  monthDaysLeft: 12,
  topTour: { name: "Wahiba Sands", bookings: 6, pctOfRevenue: 38 },
  coldTour: { name: "Jebel Akhdar", deltaPct: -22 },
};

// Booking detail timeline events for the customer-story view
export type EventChannel = "whatsapp" | "email" | "tripadvisor" | "phone" | "system";
export type EventKind =
  | "inquiry"
  | "booking-created"
  | "deposit-paid"
  | "balance-paid"
  | "message"
  | "pickup-confirmed"
  | "tour-completed"
  | "review-posted"
  | "reminder-sent";

export interface TimelineEvent {
  id: string;
  kind: EventKind;
  channel: EventChannel;
  at: string; // human readable
  description: string;
  bodyExcerpt?: string;
  fromAgent?: boolean;
}

export interface DetailedBooking {
  reference: string;
  customer: {
    name: string;
    nationality: string;
    primaryLanguage: string;
    phone: string;
    email: string;
    repeatGuest?: boolean;
  };
  tour: { slug: string; name: string };
  date: string;
  partySize: number;
  total: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  guide?: { name: string; languages: string[]; certifications: string[] };
  vehicle?: string;
  pickup?: { hotel: string; time: string; confirmed: boolean };
  notes?: string;
  source: "WhatsApp" | "Direct booking" | "TripAdvisor" | "Hotel referral" | "Instagram";
  timeline: TimelineEvent[];
}

export const detailedBookings: DetailedBooking[] = [
  {
    reference: "STO-WX4P9",
    customer: {
      name: "Lisa Schmidt",
      nationality: "🇩🇪 Germany",
      primaryLanguage: "German",
      phone: "+49 175 ...",
      email: "lisa.schmidt@example.com",
    },
    tour: { slug: "wahiba-sands-overnight", name: "Wahiba Sands Overnight" },
    date: "Today · 16:00",
    partySize: 4,
    total: 505,
    status: "Confirmed",
    pickup: { hotel: "Crowne Plaza Muscat", time: "16:00", confirmed: true },
    source: "WhatsApp",
    timeline: [
      {
        id: "tl-1",
        kind: "inquiry",
        channel: "whatsapp",
        at: "9 days ago · 19:42",
        description: "Inquiry from Lisa Schmidt",
        bodyExcerpt: "Hallo, sind die Sterne klar diese Woche? 4 Personen.",
      },
      {
        id: "tl-2",
        kind: "message",
        channel: "whatsapp",
        at: "9 days ago · 19:50",
        description: "Auto-reply sent in German",
        bodyExcerpt:
          "Hallo Lisa! Ja, klare Sicht erwartet. Mai ist eine perfekte Wüstenzeit.",
        fromAgent: true,
      },
      {
        id: "tl-3",
        kind: "booking-created",
        channel: "system",
        at: "8 days ago · 14:12",
        description: "Booking request · 4 guests · OMR 505",
      },
      {
        id: "tl-4",
        kind: "message",
        channel: "whatsapp",
        at: "8 days ago · 14:32",
        description: "Booking confirmed by team · payment: cash on arrival",
        fromAgent: true,
      },
      {
        id: "tl-5",
        kind: "message",
        channel: "whatsapp",
        at: "Yesterday · 18:30",
        description: "Pre-tour reminder sent (German)",
        fromAgent: true,
      },
    ],
    notes: "Vegetarian dinner requested. One child age 9 needs car seat. Paying cash on arrival.",
  },
  {
    reference: "STO-7K2P",
    customer: {
      name: "Marco Bianchi",
      nationality: "🇮🇹 Italy",
      primaryLanguage: "Italian",
      phone: "+39 333 ...",
      email: "marco.bianchi@example.com",
      repeatGuest: true,
    },
    tour: { slug: "wahiba-sands-overnight", name: "Wahiba Sands Overnight" },
    date: "Wed May 8 · 16:00",
    partySize: 2,
    total: 320,
    status: "Pending",
    source: "Direct booking",
    timeline: [
      {
        id: "tl-1",
        kind: "booking-created",
        channel: "system",
        at: "12 days ago · 22:14",
        description: "Booking request · 2 guests · OMR 320",
      },
      {
        id: "tl-2",
        kind: "reminder-sent",
        channel: "whatsapp",
        at: "8 days ago · 10:00",
        description: "Confirmation reminder sent · awaiting Marco's reply",
        fromAgent: true,
      },
      {
        id: "tl-3",
        kind: "reminder-sent",
        channel: "whatsapp",
        at: "5 days ago · 10:00",
        description: "Follow-up sent · still no confirmation",
        fromAgent: true,
      },
      {
        id: "tl-4",
        kind: "message",
        channel: "whatsapp",
        at: "5 days ago · 14:22",
        description: "Marco replied",
        bodyExcerpt: "Confermo questa settimana, scusate il ritardo.",
      },
    ],
    notes:
      "Repeat guest from 2024. Previous tour was Wadi Shab, which earned a 5-star review. Worth a personal follow-up before escalation.",
  },
  {
    reference: "STO-9X1A",
    customer: {
      name: "Sophie Laurent",
      nationality: "🇫🇷 France",
      primaryLanguage: "French",
      phone: "+33 6 ...",
      email: "sophie.laurent@example.com",
    },
    tour: { slug: "wadi-shab-emerald-pools", name: "Wadi Shab Emerald Pools" },
    date: "Tomorrow · 07:30",
    partySize: 2,
    total: 190,
    status: "Confirmed",
    pickup: { hotel: "Crowne Plaza Muscat", time: "07:30", confirmed: false },
    source: "Hotel referral",
    timeline: [
      {
        id: "tl-1",
        kind: "booking-created",
        channel: "phone",
        at: "5 days ago · 11:00",
        description: "Booking by phone · referred by Crowne Plaza concierge",
      },
      {
        id: "tl-2",
        kind: "message",
        channel: "whatsapp",
        at: "5 days ago · 11:08",
        description: "Booking confirmed by team · payment: bank transfer",
        fromAgent: true,
      },
      {
        id: "tl-3",
        kind: "message",
        channel: "email",
        at: "2 days ago · 14:00",
        description: "Pickup confirmation request sent to hotel concierge",
        fromAgent: true,
      },
    ],
    notes: "First-timer in Oman. Mentioned interest in Nizwa later in the trip.",
  },
  {
    reference: "STO-K3R7M",
    customer: {
      name: "Romano Family",
      nationality: "🇮🇹 Italy",
      primaryLanguage: "Italian",
      phone: "+39 348 ...",
      email: "romano.family@example.com",
    },
    tour: { slug: "wadi-shab-emerald-pools", name: "Wadi Shab Emerald Pools" },
    date: "Today · 08:00",
    partySize: 4,
    total: 380,
    status: "Confirmed",
    guide: {
      name: "Khalid",
      languages: ["Arabic", "Italian", "English"],
      certifications: ["Wadi Shab", "Nizwa", "Wahiba"],
    },
    vehicle: "Vehicle 2",
    pickup: { hotel: "Kempinski Muscat", time: "07:00", confirmed: true },
    source: "TripAdvisor",
    timeline: [
      {
        id: "tl-1",
        kind: "inquiry",
        channel: "tripadvisor",
        at: "11 days ago",
        description: "Inquiry through TripAdvisor",
      },
      {
        id: "tl-2",
        kind: "booking-created",
        channel: "system",
        at: "10 days ago",
        description: "Booking request · 4 guests · OMR 380",
      },
      {
        id: "tl-3",
        kind: "message",
        channel: "whatsapp",
        at: "10 days ago",
        description: "Booking confirmed by team · payment: card at office",
        fromAgent: true,
      },
      {
        id: "tl-4",
        kind: "pickup-confirmed",
        channel: "phone",
        at: "Yesterday · 18:00",
        description: "Hotel confirmed pickup",
      },
    ],
    notes: "Two children (8 and 11). Khalid briefed on family pace. Paying by card at the office tomorrow morning.",
  },
  {
    reference: "STO-NZ8K2",
    customer: {
      name: "Hoffmann Family",
      nationality: "🇩🇪 Germany",
      primaryLanguage: "German",
      phone: "+49 171 ...",
      email: "hoffmann@example.com",
    },
    tour: { slug: "nizwa-friday-souq", name: "Nizwa Half-Day" },
    date: "Today · 14:00",
    partySize: 3,
    total: 210,
    status: "Confirmed",
    guide: {
      name: "Ahmed",
      languages: ["Arabic", "German", "English"],
      certifications: ["Nizwa", "Wahiba", "Misfat"],
    },
    vehicle: "Vehicle 1",
    source: "Direct booking",
    timeline: [
      {
        id: "tl-1",
        kind: "booking-created",
        channel: "system",
        at: "6 days ago",
        description: "Booking request via website · 3 guests · OMR 210",
      },
      {
        id: "tl-2",
        kind: "message",
        channel: "whatsapp",
        at: "6 days ago",
        description: "Booking confirmed by team · payment: cash on day",
        fromAgent: true,
      },
    ],
  },
];

export interface InboxMessage {
  id: string;
  fromName: string;
  fromFlag: string;
  channel: "whatsapp" | "email" | "instagram";
  receivedAt: string;
  language: string;
  preview: string;
  draftPreview?: string;
  unreadMinutes: number;
}

export const inbox: InboxMessage[] = [
  {
    id: "msg-01",
    fromName: "Hans Müller",
    fromFlag: "🇩🇪",
    channel: "whatsapp",
    receivedAt: "92 min ago",
    language: "German",
    preview: "Sind diese Daten für 4 Personen verfügbar? Wahiba 12-13 Mai",
    draftPreview:
      "Hallo Hans! Ja, der 12.-13. Mai ist verfügbar für 4 Personen. Der Preis...",
    unreadMinutes: 92,
  },
  {
    id: "msg-02",
    fromName: "Sophie Laurent",
    fromFlag: "🇫🇷",
    channel: "whatsapp",
    receivedAt: "4 hours ago",
    language: "French",
    preview: "Merci beaucoup pour la magnifique excursion d'hier !",
    draftPreview:
      "Avec plaisir Sophie ! Pourriez-vous laisser un mot sur TripAdvisor ?...",
    unreadMinutes: 240,
  },
  {
    id: "msg-03",
    fromName: "Carlos Rodriguez",
    fromFlag: "🇪🇸",
    channel: "email",
    receivedAt: "8 hours ago",
    language: "Spanish",
    preview: "Estoy buscando un paquete de luna de miel para julio...",
    draftPreview:
      "Hola Carlos, qué bonito plan. Para luna de miel, recomendamos un viaje...",
    unreadMinutes: 480,
  },
];

export interface Guide {
  id: string;
  name: string;
  languages: string[];
  certifiedFor: string[];
  available: boolean;
  busyUntil?: string;
}

export const guides: Guide[] = [
  {
    id: "g-1",
    name: "Khalid",
    languages: ["Arabic", "Italian", "English"],
    certifiedFor: ["Wadi Shab", "Nizwa", "Wahiba", "Jebel Shams"],
    available: false,
    busyUntil: "13:00 today",
  },
  {
    id: "g-2",
    name: "Salim",
    languages: ["Arabic", "English"],
    certifiedFor: ["Muscat City", "Misfat", "Coastal tours"],
    available: false,
    busyUntil: "14:00 today",
  },
  {
    id: "g-3",
    name: "Ahmed",
    languages: ["Arabic", "German", "English"],
    certifiedFor: ["Nizwa", "Wahiba", "Misfat", "Jebel Akhdar"],
    available: false,
    busyUntil: "17:00 today",
  },
  {
    id: "g-4",
    name: "Hamed",
    languages: ["Arabic", "Spanish", "English"],
    certifiedFor: ["Nakhal", "Wakan", "Misfat", "Jebel Akhdar"],
    available: true,
  },
  {
    id: "g-5",
    name: "Yousef",
    languages: ["Arabic", "French", "English"],
    certifiedFor: ["Wahiba", "Wadi Bani Khalid", "Sea tours"],
    available: true,
  },
];

export interface MarginInsight {
  tour: string;
  bookings: number;
  revenue: number;
  marginPct: number;
  trend: "up" | "down" | "flat";
  note?: string;
}

export const marginInsights: MarginInsight[] = [
  {
    tour: "Wahiba Sands Overnight",
    bookings: 6,
    revenue: 6920,
    marginPct: 41,
    trend: "up",
    note: "Highest margin · push in marketing",
  },
  {
    tour: "Wadi Shab Emerald Pools",
    bookings: 11,
    revenue: 4180,
    marginPct: 28,
    trend: "up",
  },
  {
    tour: "Muscat City Private",
    bookings: 14,
    revenue: 2030,
    marginPct: 36,
    trend: "flat",
    note: "Steady volume · low effort to operate",
  },
  {
    tour: "Jebel Akhdar Rose Mountain",
    bookings: 2,
    revenue: 580,
    marginPct: 22,
    trend: "down",
    note: "Down 22% MoM · investigate competitor pricing",
  },
];

export interface SourceInsight {
  source: string;
  bookings: number;
  revenue: number;
  conversionPct: number;
}

export const sourceInsights: SourceInsight[] = [
  { source: "TripAdvisor", bookings: 12, revenue: 5840, conversionPct: 18 },
  { source: "Direct (website)", bookings: 8, revenue: 4120, conversionPct: 24 },
  { source: "Hotel referrals", bookings: 7, revenue: 3950, conversionPct: 41 },
  { source: "WhatsApp inbound", bookings: 5, revenue: 2680, conversionPct: 56 },
  { source: "Instagram", bookings: 2, revenue: 740, conversionPct: 12 },
];

export const todaysDate = "Tuesday, May 7";
