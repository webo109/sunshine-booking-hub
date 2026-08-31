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
  {
    id: "city",
    name: "City Transfer",
    description: "Private hotel pickup within Muscat metropolitan area.",
    price: 15,
    vehicles: ["Saloon", "4WD", "Minibus", "Coaster"],
  },
  {
    id: "group",
    name: "Group Pick-up",
    description: "Shared transfer ideal for groups of 6+ guests.",
    price: 25,
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
