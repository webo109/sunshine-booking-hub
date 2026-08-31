export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export type FAQCategory = "Booking" | "Payment" | "Tours" | "Travel" | "Cancellation" | "Practical";

export const faqCategories: FAQCategory[] = [
  "Booking",
  "Payment",
  "Tours",
  "Travel",
  "Cancellation",
  "Practical",
];

export const faqs: FAQ[] = [
  // Booking
  {
    id: "faq-001",
    category: "Booking",
    question: "How do I book a tour?",
    answer:
      "Browse our tour catalogue, select your preferred tour, and click the Request to Book button. You'll be guided through a five-step form covering date, guests, transport, your details, and a final review. You receive a reference number on submit; our team contacts you within 24 hours to confirm details and arrange payment.",
  },
  {
    id: "faq-002",
    category: "Booking",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 7 days in advance for day trips and 21 days for multi-day tours. During the high season (October to March) and Eid holidays, popular tours such as Wahiba Sands and Salalah can sell out 4 to 6 weeks ahead.",
  },
  {
    id: "faq-003",
    category: "Booking",
    question: "Can I customise an itinerary?",
    answer:
      "Absolutely. Every tour you see is private by default, which means we can adjust pickup times, lunch stops, photography breaks, or even combine routes. Send us a WhatsApp message with your dream day and we'll send back a tailored quote within 24 hours.",
  },
  {
    id: "faq-004",
    category: "Booking",
    question: "When do I get confirmation?",
    answer:
      "Right after submitting the booking form you'll see a confirmation page with your reference number and a QR code. Our team then reaches out within 24 hours on WhatsApp to confirm details, arrange payment, and share your meeting point and guide's contact information.",
  },
  // Payment
  {
    id: "faq-005",
    category: "Payment",
    question: "How will I pay?",
    answer:
      "After you submit a booking request and our team confirms it on WhatsApp, we'll arrange payment in the way that suits you best: cash on the day, bank transfer in advance, or in-person card payment at our office. All prices are quoted in Omani Rials (OMR). No card details are ever stored on our site.",
  },
  {
    id: "faq-006",
    category: "Payment",
    question: "Do you require a deposit?",
    answer:
      "Day tours can usually be paid in full on the day. Multi-day tours typically require a 30 percent deposit to secure your dates, with the balance due 14 days before departure. The exact arrangement is discussed when our team contacts you to confirm your booking.",
  },
  // Tours
  {
    id: "faq-008",
    category: "Tours",
    question: "Are your tours private or shared?",
    answer:
      "All standard tours on our website are private by default, meaning the vehicle, the guide, and the itinerary are exclusively yours. We also operate larger group transfers and shared excursions for 6+ guests on request.",
  },
  {
    id: "faq-009",
    category: "Tours",
    question: "What languages do your guides speak?",
    answer:
      "Our team speaks English, Arabic, Italian, French, German, and Spanish fluently. Mention your preferred language at booking and we'll match you with the most suitable guide. Mandarin and Russian guides are available with 7 days notice.",
  },
  {
    id: "faq-010",
    category: "Tours",
    question: "Are tours suitable for children?",
    answer:
      "Yes, we welcome families. Most day tours work well from age 6, and we offer a 40 percent discount for children aged 3 to 12. Children under 3 travel free in their parent's lap. Wahiba Sands and Jebel Shams are best from age 8 due to terrain.",
  },
  {
    id: "faq-011",
    category: "Tours",
    question: "What is the maximum group size?",
    answer:
      "Maximum group sizes vary by tour and are shown on each tour page. Day tours typically allow 8 to 12 guests. We can accommodate larger groups by adding additional 4WDs and guides. Just send us your numbers and we'll prepare a quote.",
  },
  // Travel
  {
    id: "faq-012",
    category: "Travel",
    question: "Do I need a visa for Oman?",
    answer:
      "Most nationalities can apply for an e-visa online at evisa.rop.gov.om before travel. GCC nationals and citizens of 100+ countries qualify for visa-free entry of up to 14 days. Always check the latest rules with the Royal Oman Police website before booking flights.",
  },
  {
    id: "faq-013",
    category: "Travel",
    question: "What should I wear on tours?",
    answer:
      "Light, breathable, modest clothing works best: long shorts or trousers, t-shirts or short-sleeved shirts. For mosque visits, women need a headscarf and full coverage of arms and legs (we keep loaner abayas in our vehicles). Sturdy closed shoes are essential for wadi hikes.",
  },
  {
    id: "faq-014",
    category: "Travel",
    question: "What is the best time to visit Oman?",
    answer:
      "October to April offers the most comfortable weather across most of Oman, with daytime temperatures of 22 to 30°C. The Dhofar region (Salalah) has its unique Khareef monsoon from late June to early September, with cool, misty temperatures and lush green landscapes.",
  },
  {
    id: "faq-015",
    category: "Travel",
    question: "Will my mobile phone work?",
    answer:
      "Yes. Omantel and Ooredoo provide excellent 4G/5G coverage across cities and most tourist routes. International roaming works well, though we recommend a local prepaid SIM at the airport for trips longer than 5 days. Wi-Fi is widely available in hotels and many cafés.",
  },
  // Cancellation
  {
    id: "faq-016",
    category: "Cancellation",
    question: "What is your cancellation policy?",
    answer:
      "Day tours: free cancellation up to 48 hours before departure for a full refund. Cancellations within 48 hours are non-refundable. Multi-day tours: free cancellation up to 14 days before; 50 percent charge between 14 and 7 days; 100 percent charge within 7 days.",
  },
  {
    id: "faq-017",
    category: "Cancellation",
    question: "What happens if the weather is bad?",
    answer:
      "If we cancel a tour due to weather (flash flood risk, sandstorm, mountain road closure) we offer a full refund or free rescheduling to another date. Light rain or heat does not normally affect departures, and your guide will brief you on conditions in the morning.",
  },
  {
    id: "faq-018",
    category: "Cancellation",
    question: "Can I reschedule my booking?",
    answer:
      "Yes. Rescheduling is free of charge if requested at least 48 hours before your tour. Use your booking reference on our Booking Lookup page or message us directly on WhatsApp and we'll move your tour to any available date in the next 12 months.",
  },
  // Practical
  {
    id: "faq-019",
    category: "Practical",
    question: "Do you offer hotel pickup?",
    answer:
      "Yes, free hotel pickup is included for all Muscat tours from hotels in the Muscat metropolitan area (Mutrah, Ruwi, Qurum, Shatti, Madinat Al Sultan Qaboos, Seeb, Bausher). Pickup from outside Muscat or from your private residence is available for a small fee.",
  },
  {
    id: "faq-020",
    category: "Practical",
    question: "Are meals included?",
    answer:
      "Inclusions vary by tour and are clearly listed on each tour page. Most full-day tours include water and refreshments; some include lunch at a recommended local restaurant. Multi-day desert and mountain tours include all meals as part of the camp or hotel package.",
  },
  {
    id: "faq-021",
    category: "Practical",
    question: "Is travel insurance required?",
    answer:
      "We strongly recommend comprehensive travel insurance covering medical evacuation, trip cancellation, and adventure activities. While our vehicles, drivers, and routes are fully licensed and insured, personal travel insurance protects you against the unexpected.",
  },
  {
    id: "faq-022",
    category: "Practical",
    question: "Can I tip my guide and driver?",
    answer:
      "Tipping is appreciated but never expected. If you've enjoyed your experience, a tip of 5 to 10 percent of the tour value is customary in Oman. You can hand it directly in OMR or send it digitally via the WhatsApp link your guide will share.",
  },
];
