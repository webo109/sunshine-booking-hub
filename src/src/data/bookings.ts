import type { TransportId } from "./transports";

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

export interface Booking {
  reference: string;
  tourSlug: string;
  tourName: string;
  date: string; // ISO
  adults: number;
  children: number;
  subtotal: number;
  transportFee: number;
  total: number;
  transport: {
    id: TransportId;
    name: string;
    pickupAddress?: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    nationality: string;
    notes?: string;
  };
  status: BookingStatus;
  createdAt: string;
}

const STORAGE_KEY = "sunshine_bookings_v2";

export function generateReference(): string {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `STO-${part()}${part().slice(0, 1)}`;
}

export function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking): void {
  if (typeof window === "undefined") return;
  const list = loadBookings();
  list.unshift(b);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getBookingByReference(ref: string): Booking | undefined {
  return loadBookings().find((b) => b.reference === ref);
}

export function updateBookingStatus(reference: string, status: BookingStatus): void {
  if (typeof window === "undefined") return;
  const list = loadBookings().map((b) => (b.reference === reference ? { ...b, status } : b));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function removeBooking(reference: string): void {
  if (typeof window === "undefined") return;
  const list = loadBookings().filter((b) => b.reference !== reference);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
