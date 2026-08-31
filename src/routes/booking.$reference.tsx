import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Home } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getBookingByReference, type Booking } from "@/data/bookings";
import { getTourBySlug } from "@/data/tours";
import { formatOMR, formatDate, formatDateRange, tripDays, tripEndDate } from "@/lib/format";

export const Route = createFileRoute("/booking/$reference")({
  head: () => ({
    meta: [
      { title: "Booking Request Received · Sunshine Tours Oman" },
      {
        name: "description",
        content: "Your booking request has been received. Our team will be in touch shortly.",
      },
    ],
  }),
  component: ConfirmationPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 pt-20">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Booking not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          Back home
        </Link>
      </div>
    </div>
  ),
});

function ConfirmationPage() {
  const { reference } = Route.useParams();
  const booking: Booking | undefined = getBookingByReference(reference);

  if (!booking) {
    throw notFound();
  }

  const guestSummary = `${booking.adults} adult${booking.adults !== 1 ? "s" : ""}${
    booking.children > 0 ? ` · ${booking.children} child${booking.children !== 1 ? "ren" : ""}` : ""
  }`;

  /* Bookings persist only the start date. The span is derived from the tour so
     existing saved bookings keep working without a data migration. */
  const bookedTour = getTourBySlug(booking.tourSlug);
  const days = bookedTour ? tripDays(bookedTour) : 1;
  const endDate = tripEndDate(booking.date, days);
  const dateSpan = formatDateRange(booking.date, endDate);
  const isMultiDay = days > 1;

  const whatsappMessage = encodeURIComponent(
    `Hi Sunshine Tours, my booking reference is ${booking.reference} for ${booking.tourName} on ${dateSpan}.`,
  );

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-20 md:pt-32">
      <div className="mx-auto max-w-xl px-5 md:px-8">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/15 ring-8 ring-brand/5">
            <Check className="h-10 w-10 text-brand" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-display text-4xl font-black tracking-tight md:text-5xl">
            Booking Request Received
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you,{" "}
            <span className="font-semibold text-foreground">{booking.customer.name}</span>. Our team
            will be in touch within 24 hours to confirm details and arrange payment.
          </p>
        </div>

        {/* Reference card */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-7">
          {(() => {
            const statusColors: Record<string, string> = {
              Pending: "bg-amber-100 text-amber-800",
              Confirmed: "bg-green-100 text-green-800",
              Cancelled: "bg-red-100 text-red-800",
            };
            return (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Status</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status] ?? ""}`}
                >
                  {booking.status}
                </span>
              </div>
            );
          })()}
          <div className="space-y-3 divide-y divide-border">
            <Row
              label="Reference"
              value={<span className="font-mono font-bold text-brand">{booking.reference}</span>}
              first
            />
            <Row label="Tour" value={<span className="font-semibold">{booking.tourName}</span>} />
            <Row label={isMultiDay ? "Trip dates" : "Date"} value={dateSpan} />
            {isMultiDay && bookedTour && <Row label="Duration" value={bookedTour.durationLabel} />}
            <Row label="Guests" value={guestSummary} />
            <Row label="Transport" value={booking.transport.name} />
            <Row
              label={
                <span className="font-display text-base font-bold text-foreground">Total</span>
              }
              value={
                <span className="font-display text-xl font-black text-brand">
                  {formatOMR(booking.total)}
                </span>
              }
            />
          </div>
        </div>

        {/* QR code */}
        <div className="mt-5 rounded-3xl border border-border bg-card p-6 text-center">
          <h3 className="font-display text-sm font-bold">Your Booking QR Code</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Show this to your guide on the day of your tour.
          </p>
          <div className="mx-auto mt-4 flex h-44 w-44 items-center justify-center rounded-xl border border-border bg-white p-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(
                booking.reference,
              )}`}
              alt={`QR code for booking ${booking.reference}`}
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-3 font-mono text-xs font-semibold text-foreground">
            {booking.reference}
          </p>
        </div>

        {/* Demo notice: this build has no backend, bookings stay in the browser */}
        <div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-4 text-sm">
          <strong className="font-semibold text-foreground">Demo preview</strong>
          <span className="mt-1 block text-muted-foreground">
            This booking was saved in this browser only. No message has been sent to Sunshine Tours
            and no one has been notified. In the live version this creates a real booking and alerts
            the operator instantly.
          </span>
        </div>

        {/* What happens next: dual-path message */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-brand/5 px-5 py-4 text-sm text-foreground">
          <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
          <span>
            <strong className="font-semibold">What happens next</strong>
            <br />
            <span className="text-muted-foreground">
              Our team will reach out within 24 hours on WhatsApp to confirm your booking and
              arrange payment in the way that suits you (cash on the day, bank transfer, or
              in-person card). If you&apos;d like to reach us sooner, tap below, either path works.
            </span>
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={`https://api.whatsapp.com/send?phone=96896964811&text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ring-focus inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp
          </a>
          <Link
            to="/"
            className="ring-focus inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  first,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 ${first ? "" : "pt-3"} text-sm`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}
