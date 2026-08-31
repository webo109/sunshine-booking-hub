export type TransportId = "city" | "group" | "airport" | "none";

export interface TransportOption {
  id: TransportId;
  name: string;
  description: string;
  price: number;
  vehicles: string[];
}

export const transports: TransportOption[] = [
  {
    id: "none",
    name: "No transfer needed",
    description: "I will arrange my own transport to the meeting point.",
    price: 0,
    vehicles: [],
  },
  // Hotel pickup inside Muscat is free: every tour's `pickup` field says
  // "Muscat hotels (free)" and faqs.ts (faq-019) promises free hotel pickup
  // for all Muscat tours. Charging for it here contradicted both.
  {
    id: "city",
    name: "Hotel Pick-up & Drop-off",
    description: "Included free from hotels across the Muscat metropolitan area.",
    price: 0,
    vehicles: ["Saloon", "4WD", "Minibus", "Coaster"],
  },
  {
    id: "group",
    name: "Group Pick-up",
    description: "Larger vehicle for groups of 6+. Also free from Muscat hotels.",
    price: 0,
    vehicles: ["Minibus", "Coaster", "Big Bus"],
  },
  {
    id: "airport",
    name: "Airport Pick-up",
    description: "Private transfer from Muscat International Airport to your hotel.",
    price: 20,
    vehicles: ["Saloon", "4WD", "Minibus", "Coaster", "Big Bus"],
  },
];

export function getTransport(id: TransportId): TransportOption {
  return transports.find((t) => t.id === id) ?? transports[0];
}
