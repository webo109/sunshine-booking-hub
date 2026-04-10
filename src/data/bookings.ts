export interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  pickupLocation: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsApp: string;
  nationality: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
  reference: string;
}

const STORAGE_KEY = "sunshine_bookings";

export function getBookings(): Booking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function generateReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "STO-";
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export function exportBookingsCSV(): string {
  const bookings = getBookings();
  const headers = ["Reference", "Tour", "Date", "Customer", "Email", "Phone", "Adults", "Children", "Total (OMR)", "Status", "Booked On"];
  const rows = bookings.map((b) => [
    b.reference, b.tourName, b.date, b.customerName, b.customerEmail, b.customerPhone,
    b.adults, b.children, b.totalPrice, b.status, b.createdAt,
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
