import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  KeyRound,
  LogOut,
  Search,
  TrendingUp,
  Users,
  CalendarDays,
  Wallet,
  Trash2,
} from "lucide-react";
import {
  loadBookings,
  updateBookingStatus,
  removeBooking,
  type Booking,
  type BookingStatus,
} from "@/data/bookings";
import { getTourBySlug } from "@/data/tours";
import { formatDate, formatDateRange, formatOMR, tripDays, tripEndDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Sunshine Tours Oman" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const PASSCODE = "1234";
const SESSION_KEY = "sunshine_admin_session_v1";

/**
 * Bookings store only the start date; the span comes from the tour's duration.
 * An operator needs the end date to know how long a guide and vehicle are
 * committed, so it is derived here rather than stored.
 */
function bookingEndDate(b: Booking): Date {
  const t = getTourBySlug(b.tourSlug);
  return tripEndDate(b.date, t ? tripDays(t) : 1);
}

function bookingDateSpan(b: Booking): string {
  return formatDateRange(b.date, bookingEndDate(b));
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code === PASSCODE) {
              window.sessionStorage.setItem(SESSION_KEY, "1");
              setAuthed(true);
            } else {
              setError("Incorrect passcode");
            }
          }}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <KeyRound className="h-5 w-5" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-black uppercase tracking-tight">
            Admin Access
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the operator passcode to continue.
          </p>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="Passcode"
            className="ring-focus mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="ring-focus mt-4 w-full rounded-full bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-brand-foreground transition-transform hover:scale-[1.02]"
          >
            Sign in
          </button>
          {/* No on-screen passcode hint: the demo is run via `npm run dev`, so a
              DEV-gated hint would still be visible to the client during a pitch.
              The passcode lives in DEMO_NOTES.md instead. */}
        </form>
      </div>
    );
  }

  return (
    <Dashboard
      onLogout={() => {
        window.sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"All" | BookingStatus>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  const refresh = () => setBookings(loadBookings());

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed");
    const pending = bookings.filter((b) => b.status === "Pending");
    const cancelled = bookings.filter((b) => b.status === "Cancelled");
    const revenue = confirmed.reduce((s, b) => s + b.total, 0);
    const totalGuests = confirmed.reduce((s, b) => s + b.adults + b.children, 0);
    const upcoming = confirmed.filter((b) => new Date(b.date) >= new Date()).length;
    return {
      total,
      confirmed: confirmed.length,
      pending: pending.length,
      cancelled: cancelled.length,
      revenue,
      totalGuests,
      upcoming,
    };
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchStatus = filter === "All" || b.status === filter;
      if (!matchStatus) return false;
      if (!q) return true;
      return (
        b.reference.toLowerCase().includes(q) ||
        b.tourName.toLowerCase().includes(q) ||
        b.customer.name.toLowerCase().includes(q) ||
        b.customer.email.toLowerCase().includes(q) ||
        b.customer.phone.toLowerCase().includes(q)
      );
    });
  }, [bookings, filter, query]);

  const counts: Record<"All" | BookingStatus, number> = {
    All: bookings.length,
    Pending: stats.pending,
    Confirmed: stats.confirmed,
    Cancelled: stats.cancelled,
  };

  const updateStatus = (ref: string, s: BookingStatus) => {
    updateBookingStatus(ref, s);
    refresh();
    toast.success(`${ref} marked ${s.toLowerCase()}`);
  };

  const handleDelete = (ref: string) => {
    if (!window.confirm(`Permanently delete booking ${ref}? This action cannot be undone.`)) return;
    removeBooking(ref);
    refresh();
    toast.success(`Booking ${ref} deleted`);
  };

  const exportCSV = () => {
    if (filtered.length === 0) {
      toast.error("Nothing to export");
      return;
    }
    const headers = [
      "Reference",
      "Tour",
      "Start Date",
      "End Date",
      "Adults",
      "Children",
      "Subtotal (OMR)",
      "Transport (OMR)",
      "Total (OMR)",
      "Transport",
      "Pickup Address",
      "Customer Name",
      "Email",
      "Phone",
      "Nationality",
      "Status",
      "Notes",
      "Created At",
    ];
    const escape = (v: unknown) => {
      const s = String(v ?? "");
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const rows = filtered.map((b) =>
      [
        b.reference,
        b.tourName,
        formatDate(b.date),
        formatDate(bookingEndDate(b)),
        b.adults,
        b.children,
        b.subtotal.toFixed(2),
        b.transportFee.toFixed(2),
        b.total.toFixed(2),
        b.transport.name,
        b.transport.pickupAddress ?? "",
        b.customer.name,
        b.customer.email,
        b.customer.phone,
        b.customer.nationality,
        b.status,
        b.customer.notes ?? "",
        b.createdAt,
      ]
        .map(escape)
        .join(","),
    );
    const csv = "﻿" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sunshine-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filtered.length} bookings exported`);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Operations
            </span>
            <h1 className="mt-1 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
              Bookings dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="ring-focus inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              ← View site
            </Link>
            <button
              onClick={onLogout}
              className="ring-focus inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={TrendingUp}
            label="Total bookings"
            value={String(stats.total)}
            sub={`${stats.confirmed} confirmed`}
          />
          <StatCard
            icon={Wallet}
            label="Confirmed revenue"
            value={formatOMR(stats.revenue)}
            sub="From confirmed only"
          />
          <StatCard
            icon={Users}
            label="Guests booked"
            value={String(stats.totalGuests)}
            sub="Confirmed adults + children"
          />
          <StatCard
            icon={CalendarDays}
            label="Upcoming"
            value={String(stats.upcoming)}
            sub="Future-dated bookings"
            highlight
          />
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {(["All", "Pending", "Confirmed", "Cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "ring-focus rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  filter === s
                    ? "bg-brand text-brand-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted",
                )}
              >
                {s} <span className="ml-1.5 text-xs opacity-70">({counts[s]})</span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reference, name, tour…"
                className="ring-focus w-64 rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            <button
              onClick={exportCSV}
              className="ring-focus inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          {filtered.length === 0 ? (
            <div className="p-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {query
                  ? `No bookings match "${query}".`
                  : `No ${filter !== "All" ? filter.toLowerCase() : ""} bookings yet.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/30">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3">Tour</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Guests</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <BookingRow
                      key={b.reference}
                      booking={b}
                      expanded={expanded === b.reference}
                      toggle={() =>
                        setExpanded((prev) => (prev === b.reference ? null : b.reference))
                      }
                      onStatus={(s) => updateStatus(b.reference, s)}
                      onDelete={() => handleDelete(b.reference)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Showing {filtered.length} of {bookings.length} bookings · Stored locally for the demo.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5",
        highlight ? "border-brand/40 shadow-md shadow-brand/10" : "border-border",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <Icon className={cn("h-4 w-4", highlight ? "text-brand" : "text-muted-foreground")} />
      </div>
      <div className="mt-2 font-display text-2xl font-black tracking-tight text-foreground md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function BookingRow({
  booking,
  expanded,
  toggle,
  onStatus,
  onDelete,
}: {
  booking: Booking;
  expanded: boolean;
  toggle: () => void;
  onStatus: (s: BookingStatus) => void;
  onDelete: () => void;
}) {
  return (
    <>
      <tr className="border-b border-border last:border-0 hover:bg-muted/20">
        <td className="px-4 py-3 font-mono text-xs font-bold text-brand">{booking.reference}</td>
        <td className="px-4 py-3 font-medium">{booking.tourName}</td>
        <td className="px-4 py-3 whitespace-nowrap">{bookingDateSpan(booking)}</td>
        <td className="px-4 py-3">
          <div className="font-medium">{booking.customer.name}</div>
          <div className="text-xs text-muted-foreground">{booking.customer.email}</div>
        </td>
        <td className="px-4 py-3">
          {booking.adults}A {booking.children > 0 && `· ${booking.children}C`}
        </td>
        <td className="px-4 py-3 font-semibold">{formatOMR(booking.total)}</td>
        <td className="px-4 py-3">
          <StatusBadge status={booking.status} />
        </td>
        <td className="px-4 py-3 text-right">
          <button
            onClick={toggle}
            aria-label="Toggle details"
            className="ring-focus inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/20">
          <td colSpan={8} className="px-4 py-5">
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer
                </div>
                <div className="mt-1 text-sm font-semibold">{booking.customer.name}</div>
                <div className="text-sm text-muted-foreground">{booking.customer.email}</div>
                <div className="text-sm text-muted-foreground">{booking.customer.phone}</div>
                {booking.customer.whatsapp && (
                  <div className="text-sm text-muted-foreground">
                    WA: {booking.customer.whatsapp}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{booking.customer.nationality}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Transport &amp; Pickup
                </div>
                <div className="mt-1 text-sm font-semibold">{booking.transport.name}</div>
                {booking.transport.pickupAddress && (
                  <div className="text-sm text-muted-foreground">
                    {booking.transport.pickupAddress}
                  </div>
                )}
                {booking.customer.notes && (
                  <>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Notes
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {booking.customer.notes}
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Update Status
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["Pending", "Confirmed", "Cancelled"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => onStatus(s)}
                      className={cn(
                        "ring-focus rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                        booking.status === s
                          ? "bg-foreground text-background"
                          : "bg-card text-muted-foreground border border-border hover:bg-muted",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Quick contact
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={`tel:${booking.customer.phone}`}
                      className="ring-focus rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground border border-border hover:bg-muted"
                    >
                      Call
                    </a>
                    <a
                      href={`mailto:${booking.customer.email}`}
                      className="ring-focus rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground border border-border hover:bg-muted"
                    >
                      Email
                    </a>
                    {booking.customer.whatsapp && (
                      <a
                        href={`https://api.whatsapp.com/send?phone=${booking.customer.whatsapp.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ring-focus rounded-full bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#128C7E]"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={onDelete}
                  className="ring-focus mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-destructive hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete booking
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, string> = {
    Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    Confirmed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    Cancelled: "bg-red-500/15 text-red-700 dark:text-red-300",
  };
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        map[status],
      )}
    >
      {status}
    </span>
  );
}
