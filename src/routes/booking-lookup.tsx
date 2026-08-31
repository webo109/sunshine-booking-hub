import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Receipt, AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getBookingByReference } from "@/data/bookings";

export const Route = createFileRoute("/booking-lookup")({
  head: () => ({
    meta: [
      { title: "Find My Booking · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Look up your Sunshine Tours booking by reference number to view your confirmation, transport, and tour details.",
      },
    ],
  }),
  component: BookingLookupPage,
});

function BookingLookupPage() {
  const navigate = useNavigate();
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = ref.trim().toUpperCase();
    if (!trimmed) {
      setError("Please enter a reference number");
      return;
    }
    const found = getBookingByReference(trimmed);
    if (!found) {
      setError(
        "We can't find that reference. Double-check the code from your confirmation email or WhatsApp.",
      );
      return;
    }
    navigate({ to: "/booking/$reference", params: { reference: trimmed } });
  };

  return (
    <div className="min-h-screen bg-muted/30 pt-28 pb-20 md:pt-36">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Receipt className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight md:text-5xl">
            Find your booking
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Enter the reference number from your confirmation to view the details, download your QR
            code, and contact your guide.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-sm md:p-10"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Booking reference
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={ref}
                onChange={(e) => {
                  setRef(e.target.value);
                  setError("");
                }}
                placeholder="STO-XXXXX"
                spellCheck={false}
                autoCapitalize="characters"
                className="ring-focus w-full rounded-xl border border-border bg-background py-4 pl-11 pr-4 font-mono text-sm uppercase tracking-wider text-foreground placeholder:text-muted-foreground/60 placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
              />
            </div>
          </label>

          {error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="ring-focus mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02]"
          >
            <Search className="h-4 w-4" /> Find booking
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm">
          <p className="font-semibold text-foreground">Can't find your reference?</p>
          <p className="mt-1 text-muted-foreground">
            Check your WhatsApp messages and email inbox (including spam) for a message from
            Sunshine Tours. Your reference looks like{" "}
            <span className="font-mono font-bold text-brand">STO-AB12C</span>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://api.whatsapp.com/send?phone=96896964811"
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-4 py-2 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp us
            </a>
            <Link
              to="/contact"
              className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
            >
              Contact form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
