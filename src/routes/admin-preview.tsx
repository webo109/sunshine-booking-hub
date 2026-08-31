import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  Headphones,
  HelpCircle,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  User as UserIcon,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  detailedBookings,
  guides,
  inbox,
  marginInsights,
  revenueSnapshot,
  sourceInsights,
  todayActions,
  todaysDate,
  todaysTours,
  weekDays,
  type DetailedBooking,
  type ScheduledTour,
} from "@/data/admin-preview-mock";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { formatOMR } from "@/lib/format";

export const Route = createFileRoute("/admin-preview")({
  head: () => ({
    meta: [
      { title: "Operator Dashboard · Preview" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPreviewPage,
});

type Tab = "today" | "week" | "bookings" | "business";

function AdminPreviewPage() {
  const [tab, setTab] = useState<Tab>("today");
  const [openBookingRef, setOpenBookingRef] = useState<string | null>(null);

  const openBooking = openBookingRef
    ? detailedBookings.find((b) => b.reference === openBookingRef)
    : null;

  // Lock scroll when drawer open
  useEffect(() => {
    if (openBooking) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openBooking]);

  return (
    <div className="min-h-screen bg-muted/30">
      <PreviewBanner />
      <DashboardShell>
        <DashboardHeader tab={tab} onTabChange={setTab} />
        <RevenueStrip />
        {/* Not a <main>: the root layout already provides one, and nesting
            landmarks is invalid HTML that confuses screen readers. */}
        <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
          {tab === "today" && <TodayView onOpenBooking={setOpenBookingRef} />}
          {tab === "week" && <WeekView onOpenBooking={setOpenBookingRef} />}
          {tab === "bookings" && <BookingsView onOpenBooking={setOpenBookingRef} />}
          {tab === "business" && <BusinessView />}
        </div>
      </DashboardShell>

      {openBooking && (
        <BookingDetailDrawer
          booking={openBooking}
          onClose={() => setOpenBookingRef(null)}
        />
      )}
    </div>
  );
}

// ─── Preview banner ─────────────────────────────────────────────────────────
function PreviewBanner() {
  return (
    <div className="border-b border-amber-300/40 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2 text-xs text-amber-900 dark:text-amber-200 md:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/60 px-2.5 py-0.5 font-bold uppercase tracking-widest dark:bg-amber-500/20">
          <Sparkles className="h-3 w-3" /> Prototype
        </span>
        <span>
          Operator dashboard concept · review only · not yet wired into the live{" "}
          <span className="font-mono">/admin</span> route
        </span>
        <Link
          to="/"
          className="ml-auto inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
        >
          ← Back to site
        </Link>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline"
        >
          Compare with current <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return <div className="bg-muted/30">{children}</div>;
}

// ─── Header + tab nav ───────────────────────────────────────────────────────
function DashboardHeader({ tab, onTabChange }: { tab: Tab; onTabChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "today", label: "Today", icon: Zap },
    { id: "week", label: "Week", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: Inbox },
    { id: "business", label: "Business", icon: TrendingUp },
  ];
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-black tracking-tight">Operator</h1>
            <p className="text-xs text-muted-foreground">{todaysDate} · 09:42</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="ring-focus inline-flex h-9 items-center gap-1.5 rounded-full bg-muted px-3 text-xs font-semibold text-foreground/80 hover:bg-muted/70"
          >
            <Bell className="h-3.5 w-3.5" /> 6
          </button>
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-3 text-xs font-bold text-brand-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px]">
              MA
            </span>
            Mr. Mohammed
          </span>
        </div>
      </div>
      {/* Tabs */}
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:px-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTabChange(t.id)}
            className={cn(
              "ring-focus relative -mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
              tab === t.id
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

// ─── Revenue strip ──────────────────────────────────────────────────────────
function RevenueStrip() {
  const r = revenueSnapshot;
  const monthPct = Math.round((r.monthTotal / r.monthGoal) * 100);
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 md:grid-cols-4 md:px-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Today
          </div>
          <div className="mt-1 font-display text-xl font-black text-foreground">
            {formatOMR(r.todayConfirmed)}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            <span className="text-emerald-700 dark:text-emerald-300">confirmed</span> ·{" "}
            <span className="text-amber-700 dark:text-amber-300">
              {formatOMR(r.todayPending)} pending
            </span>{" "}
            ·{" "}
            <span className="text-destructive">{formatOMR(r.todayAtRisk)} at risk</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            This week
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-xl font-black text-foreground">
              {formatOMR(r.weekTotal)}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-bold",
                r.weekDeltaPct >= 0
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-destructive",
              )}
            >
              {r.weekDeltaPct >= 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {Math.abs(r.weekDeltaPct)}%
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            vs same week last month
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            May goal
          </div>
          <div className="mt-1 font-display text-xl font-black text-foreground">
            {formatOMR(r.monthTotal)}{" "}
            <span className="text-xs font-semibold text-muted-foreground">
              / {formatOMR(r.monthGoal)}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${monthPct}%` }}
            />
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {monthPct}% · {r.monthDaysLeft} days left
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Pulse
          </div>
          <div className="mt-1 space-y-0.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">{r.topTour.name}</span>
              <span className="text-muted-foreground">
                +{r.topTour.bookings} bookings · {r.topTour.pctOfRevenue}% of revenue
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-destructive">
              <TrendingDown className="h-3 w-3" />
              <span className="font-semibold">{r.coldTour.name}</span>
              <span className="text-muted-foreground">
                {r.coldTour.deltaPct}% MoM · investigate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Today view (action triage home screen) ─────────────────────────────────
function TodayView({ onOpenBooking }: { onOpenBooking: (ref: string) => void }) {
  const critical = todayActions.filter((a) => a.urgency === "critical");
  const warning = todayActions.filter((a) => a.urgency === "warning");
  return (
    <div className="space-y-8 py-8">
      {/* Right now */}
      <section>
        <SectionLabel
          icon={Zap}
          tone="critical"
          title="Right now"
          count={critical.length}
          subtitle="Decisions that need you in the next hour."
        />
        <div className="mt-4 space-y-2.5">
          {critical.map((a) => (
            <ActionRow
              key={a.id}
              action={a}
              onOpenBooking={() => a.bookingRef && onOpenBooking(a.bookingRef)}
            />
          ))}
        </div>
      </section>

      {/* Today's tours */}
      <section>
        <SectionLabel
          icon={Calendar}
          tone="ok"
          title="Today's tours"
          count={todaysTours.length}
          subtitle="Scheduled for today, ordered by start time."
        />
        <div className="mt-4 space-y-2.5">
          {todaysTours.map((t) => (
            <TourRow
              key={t.id}
              tour={t}
              onOpenBooking={() => t.bookingRef && onOpenBooking(t.bookingRef)}
            />
          ))}
        </div>
      </section>

      {/* Pending action */}
      <section>
        <SectionLabel
          icon={Clock}
          tone="warning"
          title="Pending action"
          count={warning.length}
          subtitle="Lower urgency, but don't let them age out."
        />
        <div className="mt-4 space-y-2.5">
          {warning.map((a) => (
            <ActionRow
              key={a.id}
              action={a}
              onOpenBooking={() => a.bookingRef && onOpenBooking(a.bookingRef)}
            />
          ))}
        </div>
      </section>

      {/* Inbox preview */}
      <section>
        <SectionLabel
          icon={MessageSquare}
          tone="ok"
          title="Inbox"
          count={inbox.length}
          subtitle="WhatsApp + email · AI drafts ready in customer's language."
        />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {inbox.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="text-base">{m.fromFlag}</span>
                <span className="font-semibold text-foreground">{m.fromName}</span>
                <span className="ml-auto text-[10px] text-muted-foreground">{m.receivedAt}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {m.channel === "whatsapp" && <WhatsAppIcon className="h-3 w-3 text-emerald-600" />}
                {m.channel === "email" && <Mail className="h-3 w-3 text-blue-600" />}
                {m.channel === "instagram" && <ImageIcon className="h-3 w-3 text-pink-600" />}
                {m.channel} · {m.language}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{m.preview}</p>
              {m.draftPreview && (
                <div className="mt-3 rounded-xl bg-brand/5 px-3 py-2 text-xs">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand">
                    <Sparkles className="h-3 w-3" /> AI draft
                  </div>
                  <p className="mt-1 line-clamp-2 text-foreground/85">{m.draftPreview}</p>
                </div>
              )}
              <div className="mt-3 flex gap-1.5">
                <button
                  type="button"
                  className="ring-focus flex-1 rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold text-brand-foreground hover:opacity-90"
                >
                  Send draft
                </button>
                <button
                  type="button"
                  className="ring-focus rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold hover:bg-muted/50"
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  tone,
  title,
  count,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "critical" | "warning" | "ok";
  title: string;
  count: number;
  subtitle: string;
}) {
  const toneClass = {
    critical: "bg-destructive/10 text-destructive",
    warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    ok: "bg-brand/10 text-brand",
  }[tone];
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest",
            toneClass,
          )}
        >
          <Icon className="h-3 w-3" /> {title} ({count})
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function ActionRow({
  action,
  onOpenBooking,
}: {
  action: (typeof todayActions)[number];
  onOpenBooking: () => void;
}) {
  const accent =
    action.urgency === "critical"
      ? "border-l-4 border-l-destructive"
      : "border-l-4 border-l-amber-500";
  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md md:p-5",
        accent,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-foreground">{action.title}</h3>
          <p className="mt-1 text-sm text-foreground/75">{action.context}</p>
          {action.meta && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand/5 px-2.5 py-0.5 text-[11px] text-brand">
              <Sparkles className="h-3 w-3" /> {action.meta}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action.bookingRef && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="ring-focus inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted/50"
            >
              <Eye className="h-3 w-3" /> Booking
            </button>
          )}
          <button
            type="button"
            className="ring-focus inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-brand-foreground hover:opacity-90"
          >
            {action.cta} <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

function TourRow({
  tour,
  onOpenBooking,
}: {
  tour: ScheduledTour;
  onOpenBooking: () => void;
}) {
  const statusBadge = {
    ok: { label: "Ready", classes: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
    warning: {
      label: "Watch",
      classes: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    },
    risk: { label: "At risk", classes: "bg-destructive/15 text-destructive" },
    blocked: { label: "Blocked", classes: "bg-muted text-muted-foreground" },
  }[tour.status];
  return (
    <button
      type="button"
      onClick={onOpenBooking}
      className="ring-focus flex w-full flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-muted font-display text-xs font-black text-foreground">
        <span className="text-base leading-none">{tour.time.split(":")[0]}</span>
        <span className="text-[9px] text-muted-foreground">:{tour.time.split(":")[1]}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-sm font-bold text-foreground">{tour.tourName}</span>
          <span className="text-xs text-muted-foreground">→ {tour.endTime}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" /> {tour.partySize} · {tour.customerName}
          </span>
          <span>{tour.customerNationality}</span>
          {tour.pickupHotel && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {tour.pickupHotel}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        {tour.guideName ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
            <Headphones className="h-3 w-3" /> {tour.guideName}{" "}
            <span className="text-[10px] text-muted-foreground">({tour.guideLanguage})</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 font-semibold text-destructive">
            <AlertTriangle className="h-3 w-3" /> Guide?
          </span>
        )}
        {tour.vehicleId && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
            <Car className="h-3 w-3" /> {tour.vehicleId}
          </span>
        )}
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest",
            statusBadge.classes,
          )}
        >
          {statusBadge.label}
        </span>
      </div>
    </button>
  );
}

// ─── Week view ──────────────────────────────────────────────────────────────
function WeekView({ onOpenBooking }: { onOpenBooking: (ref: string) => void }) {
  const totalRevenue = useMemo(() => {
    return weekDays
      .flatMap((d) => d.tours)
      .reduce((sum, t) => sum + t.revenueOmr, 0);
  }, []);
  const totalBookings = useMemo(() => weekDays.flatMap((d) => d.tours).length, []);
  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-foreground">
            Week of May 5 – 11
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalBookings} tours · {formatOMR(totalRevenue)} booked · drag any guide from the
            sidebar onto a tour to assign.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-semibold hover:bg-muted/50"
          >
            <Plus className="h-3 w-3" /> Block date
          </button>
          <button
            type="button"
            className="ring-focus inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-bold text-brand-foreground hover:opacity-90"
          >
            <Plus className="h-3 w-3" /> New booking
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        {/* Week grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {weekDays.map((day) => (
            <DayColumn key={day.date} day={day} onOpenBooking={onOpenBooking} />
          ))}
        </div>

        {/* Guides sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Guides
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Available now · drag onto a tour to assign.
          </p>
          <div className="mt-4 space-y-2">
            {guides.map((g) => (
              <div
                key={g.id}
                className={cn(
                  "rounded-xl border p-3 text-xs transition-colors cursor-grab",
                  g.available
                    ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                    : "border-border bg-muted/40 opacity-70",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-foreground">{g.name}</span>
                  {g.available ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Free
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">until {g.busyUntil}</span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
                  {g.languages.map((lang) => (
                    <span key={lang} className="rounded-full bg-muted px-1.5 py-0.5">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function DayColumn({
  day,
  onOpenBooking,
}: {
  day: (typeof weekDays)[number];
  onOpenBooking: (ref: string) => void;
}) {
  const dayRevenue = day.tours.reduce((sum, t) => sum + t.revenueOmr, 0);
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-card p-3",
        day.isToday ? "border-brand bg-brand/5 shadow-sm shadow-brand/10" : "border-border",
        day.blocked && "opacity-60",
      )}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {day.dayShort}
          </div>
          <div
            className={cn(
              "font-display text-lg font-black tracking-tight",
              day.isToday ? "text-brand" : "text-foreground",
            )}
          >
            {day.date.split(" ")[1]}
          </div>
        </div>
        {dayRevenue > 0 && (
          <span className="text-[10px] font-semibold text-muted-foreground">
            {formatOMR(dayRevenue)}
          </span>
        )}
      </div>

      {day.blocked ? (
        <div className="mt-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-[11px] text-muted-foreground">
          {day.blocked.reason}
        </div>
      ) : day.tours.length === 0 ? (
        <div className="mt-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-3 py-6 text-center text-[11px] text-muted-foreground">
          Open day · push for bookings
        </div>
      ) : (
        <div className="mt-3 space-y-1.5">
          {day.tours.map((t) => (
            <DayTourCard
              key={t.id}
              tour={t}
              onClick={() => t.bookingRef && onOpenBooking(t.bookingRef)}
            />
          ))}
        </div>
      )}

      {day.capacityHint && (
        <div className="mt-3 rounded-lg bg-amber-500/10 px-2 py-1.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
          💡 {day.capacityHint}
        </div>
      )}
    </div>
  );
}

function DayTourCard({ tour, onClick }: { tour: ScheduledTour; onClick: () => void }) {
  const tone = {
    ok: "border-emerald-500/30 bg-emerald-500/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    risk: "border-destructive/40 bg-destructive/5",
    blocked: "border-border bg-muted/40",
  }[tour.status];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "ring-focus w-full rounded-xl border p-2 text-left transition-shadow hover:shadow-sm",
        tone,
      )}
    >
      <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
        <span>{tour.time}</span>
        <span>{tour.partySize} pax</span>
      </div>
      <div className="mt-0.5 truncate font-display text-xs font-bold text-foreground">
        {tour.tourName}
      </div>
      <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
        {tour.customerName} {tour.customerNationality}
      </div>
      <div className="mt-1 flex items-center justify-between text-[10px]">
        {tour.guideName ? (
          <span className="text-muted-foreground">👤 {tour.guideName}</span>
        ) : (
          <span className="font-semibold text-destructive">No guide</span>
        )}
        {tour.vehicleId ? (
          <span className="text-muted-foreground">🚗 {tour.vehicleId}</span>
        ) : (
          <span className="font-semibold text-destructive">No vehicle</span>
        )}
      </div>
    </button>
  );
}

// ─── Bookings view ──────────────────────────────────────────────────────────
function BookingsView({ onOpenBooking }: { onOpenBooking: (ref: string) => void }) {
  const [filter, setFilter] = useState<"all" | "needs-attention" | "today" | "upcoming">("all");
  const filtered = useMemo(() => {
    if (filter === "needs-attention")
      return detailedBookings.filter(
        (b) => b.status === "Pending" || (b.pickup && !b.pickup.confirmed),
      );
    if (filter === "today") return detailedBookings.filter((b) => b.date.startsWith("Today"));
    if (filter === "upcoming")
      return detailedBookings.filter(
        (b) => !b.date.startsWith("Today") && b.status !== "Cancelled",
      );
    return detailedBookings;
  }, [filter]);

  const filters: { id: typeof filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: detailedBookings.length },
    {
      id: "needs-attention",
      label: "Needs attention",
      count: detailedBookings.filter(
        (b) => b.status === "Pending" || (b.pickup && !b.pickup.confirmed),
      ).length,
    },
    {
      id: "today",
      label: "Today",
      count: detailedBookings.filter((b) => b.date.startsWith("Today")).length,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: detailedBookings.filter(
        (b) => !b.date.startsWith("Today") && b.status !== "Cancelled",
      ).length,
    },
  ];

  return (
    <div className="space-y-5 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-foreground">
            Bookings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Searchable directory · click any row to see the customer's full story.
          </p>
        </div>
        <button
          type="button"
          className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted/50"
        >
          Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "ring-focus inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === f.id
                ? "bg-brand text-brand-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {f.label}{" "}
            <span
              className={cn(
                "rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold",
                filter !== f.id && "bg-foreground/10",
              )}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.reference}
                onClick={() => onOpenBooking(b.reference)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/20"
              >
                <td className="px-4 py-3 font-mono text-xs">{b.reference}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{b.customer.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {b.customer.nationality} · {b.customer.primaryLanguage}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{b.tour.name}</div>
                  <div className="text-[11px] text-muted-foreground">{b.partySize} guests</div>
                </td>
                <td className="px-4 py-3 text-xs">{b.date}</td>
                <td className="px-4 py-3">
                  <BookingStatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 text-right font-mono">{formatOMR(b.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingStatusBadge({ status }: { status: DetailedBooking["status"] }) {
  const meta = {
    Confirmed: {
      classes: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
      icon: CheckCircle2,
    },
    Pending: {
      classes: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
      icon: Clock,
    },
    Cancelled: {
      classes: "bg-muted text-muted-foreground",
      icon: AlertTriangle,
    },
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
        meta.classes,
      )}
    >
      <meta.icon className="h-3 w-3" /> {status}
    </span>
  );
}

// ─── Booking detail drawer (the "customer story" view) ──────────────────────
function BookingDetailDrawer({
  booking,
  onClose,
}: {
  booking: DetailedBooking;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="relative ml-auto h-full w-full max-w-xl overflow-y-auto bg-background shadow-2xl"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Booking
            </div>
            <h2 className="font-mono text-lg font-bold">{booking.reference}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ring-focus flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-muted/70"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Customer card */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-black tracking-tight text-foreground">
                  {booking.customer.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {booking.customer.nationality} · speaks {booking.customer.primaryLanguage}
                </p>
                {booking.customer.repeatGuest && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                    <Star className="h-3 w-3" /> Repeat guest
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href={`tel:${booking.customer.phone}`}
                  className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted/40"
                >
                  <Phone className="h-3 w-3" /> Call
                </a>
                <a
                  href={`mailto:${booking.customer.email}`}
                  className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted/40"
                >
                  <Mail className="h-3 w-3" /> Email
                </a>
                <button
                  type="button"
                  className="ring-focus inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <WhatsAppIcon className="h-3 w-3" /> WhatsApp
                </button>
              </div>
            </div>
          </section>

          {/* Tour & booking value */}
          <section className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Tour
              </div>
              <p className="mt-1 font-display text-base font-bold text-foreground">
                {booking.tour.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {booking.date} · {booking.partySize} guests
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-0.5 text-[10px] text-muted-foreground">
                <Globe className="h-3 w-3" /> Source: {booking.source}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Booking value
              </div>
              <div className="mt-1 font-display text-xl font-black text-foreground">
                {formatOMR(booking.total)}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Payment arranged offline (cash / bank transfer / card at office)
              </div>
              <div className="mt-3">
                <BookingStatusBadge status={booking.status} />
              </div>
            </div>
          </section>

          {/* Operational assignment with smart suggestion */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Operations
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                <Sparkles className="h-3 w-3" /> Smart suggestions
              </span>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <OpsRow
                icon={Headphones}
                label="Guide"
                value={booking.guide?.name}
                suggestion={
                  booking.guide
                    ? `${booking.guide.languages.join(" · ")} · certified ${booking.guide.certifications.join(", ")}`
                    : `Suggested: Khalid (${booking.customer.primaryLanguage} speaker, certified for this tour)`
                }
                missing={!booking.guide}
              />
              <OpsRow
                icon={Car}
                label="Vehicle"
                value={booking.vehicle}
                suggestion={
                  booking.vehicle
                    ? "Available · cleaned · fuel full"
                    : "Suggested: Vehicle 2 (4×4, fits party of 4 comfortably)"
                }
                missing={!booking.vehicle}
              />
              <OpsRow
                icon={MapPin}
                label="Pickup"
                value={booking.pickup ? `${booking.pickup.hotel} at ${booking.pickup.time}` : undefined}
                suggestion={
                  booking.pickup
                    ? booking.pickup.confirmed
                      ? "Confirmed by hotel concierge"
                      : "Awaiting hotel confirmation · sent yesterday"
                    : "Need pickup details"
                }
                missing={booking.pickup ? !booking.pickup.confirmed : true}
              />
            </div>
          </section>

          {/* Notes */}
          {booking.notes && (
            <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                Notes
              </div>
              <p className="mt-2 text-sm text-foreground/85">{booking.notes}</p>
            </section>
          )}

          {/* Timeline · the customer's story */}
          <section>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Customer journey
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Every interaction this guest has had with you, oldest first.
            </p>
            <ol className="mt-5 space-y-4 border-l-2 border-border pl-6">
              {booking.timeline.map((e) => (
                <TimelineRow key={e.id} event={e} />
              ))}
            </ol>
          </section>

          {/* Composer */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Send a message
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <button className="ring-focus inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 font-bold text-white">
                <WhatsAppIcon className="h-3 w-3" /> WhatsApp
              </button>
              <button className="ring-focus inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-semibold hover:bg-muted/40">
                <Mail className="h-3 w-3" /> Email
              </button>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                <Sparkles className="h-3 w-3" /> Auto-translate to {booking.customer.primaryLanguage}
              </span>
            </div>
            <textarea
              placeholder={`Type your message in any language, sent in ${booking.customer.primaryLanguage}.`}
              className="ring-focus mt-3 min-h-[80px] w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60"
            />
            <div className="mt-2 flex justify-end">
              <button className="ring-focus inline-flex items-center gap-1 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-brand-foreground hover:opacity-90">
                <Send className="h-3 w-3" /> Send
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}

function OpsRow({
  icon: Icon,
  label,
  value,
  suggestion,
  missing,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  suggestion: string;
  missing: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-3 py-2.5",
        missing ? "border-destructive/30 bg-destructive/5" : "border-border bg-muted/30",
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          missing ? "text-destructive" : "text-muted-foreground",
        )}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          {value ? (
            <span className="font-semibold text-foreground">{value}</span>
          ) : (
            <span className="font-semibold text-destructive">Not assigned</span>
          )}
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{suggestion}</p>
      </div>
      {missing && (
        <button
          type="button"
          className="ring-focus inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-brand-foreground hover:opacity-90"
        >
          Assign
        </button>
      )}
    </div>
  );
}

function TimelineRow({ event }: { event: DetailedBooking["timeline"][number] }) {
  const channelMeta = {
    whatsapp: { icon: WhatsAppIcon, color: "text-emerald-600", label: "WhatsApp" },
    email: { icon: Mail, color: "text-blue-600", label: "Email" },
    tripadvisor: { icon: Star, color: "text-emerald-700", label: "TripAdvisor" },
    phone: { icon: Phone, color: "text-foreground", label: "Phone" },
    system: { icon: Zap, color: "text-brand", label: "System" },
  }[event.channel];
  const Icon = channelMeta.icon;
  return (
    <li className="relative">
      <span className="absolute -left-[1.95rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
        <Icon className={cn("h-3 w-3", channelMeta.color)} />
      </span>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {event.at} · {channelMeta.label}
        {event.fromAgent && (
          <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-1.5 py-0 text-[9px] font-bold text-brand">
            <Sparkles className="h-2.5 w-2.5" /> auto
          </span>
        )}
      </div>
      <div className="mt-1 font-semibold text-foreground">{event.description}</div>
      {event.bodyExcerpt && (
        <div className="mt-1.5 rounded-lg bg-muted/60 px-3 py-2 text-xs italic text-foreground/70">
          "{event.bodyExcerpt}"
        </div>
      )}
    </li>
  );
}

// ─── Business view ──────────────────────────────────────────────────────────
function BusinessView() {
  return (
    <div className="space-y-8 py-8">
      <div>
        <h2 className="font-display text-2xl font-black tracking-tight text-foreground">
          The business beneath the day-to-day
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Reviewed weekly, not daily. Margin per tour, where bookings come from, and which
          patterns you'd otherwise miss. Most of these signals get sharper after 90 days of real
          data.
        </p>
      </div>

      {/* Margin */}
      <section>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Margin per tour
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Revenue minus guide, vehicle, fuel, food per tour. Some tours generate volume; some
          generate profit. They're not the same.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3">Tour</th>
                <th className="px-4 py-3 text-right">Bookings</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Margin</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {marginInsights.map((m) => (
                <tr key={m.tour} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold">{m.tour}</td>
                  <td className="px-4 py-3 text-right font-mono">{m.bookings}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatOMR(m.revenue)}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-mono font-bold",
                        m.marginPct >= 35
                          ? "text-emerald-700 dark:text-emerald-300"
                          : m.marginPct >= 25
                            ? "text-foreground"
                            : "text-amber-700 dark:text-amber-300",
                      )}
                    >
                      {m.trend === "up" && <ArrowUp className="h-3 w-3" />}
                      {m.trend === "down" && <ArrowDown className="h-3 w-3" />}
                      {m.marginPct}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{m.note ?? "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources */}
      <section>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Where bookings come from
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Not all sources are equal. Hotel referrals convert at 41%, Instagram at 12%. Spend your
          marketing time accordingly.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {sourceInsights.map((s) => (
            <div key={s.source} className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.source}
              </div>
              <div className="mt-1 font-display text-xl font-black tracking-tight text-foreground">
                {s.bookings}
              </div>
              <div className="text-[11px] text-muted-foreground">bookings</div>
              <div className="mt-3 flex items-baseline justify-between border-t border-border pt-2 text-[11px]">
                <span className="text-muted-foreground">Revenue</span>
                <span className="font-mono font-bold">{formatOMR(s.revenue)}</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-muted-foreground">Conversion</span>
                <span
                  className={cn(
                    "font-mono font-bold",
                    s.conversionPct >= 30
                      ? "text-emerald-700 dark:text-emerald-300"
                      : s.conversionPct >= 18
                        ? "text-foreground"
                        : "text-amber-700 dark:text-amber-300",
                  )}
                >
                  {s.conversionPct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insight cards */}
      <section>
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Patterns worth noticing
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Generated from your booking history. A separate report drops to your WhatsApp every
          Sunday morning with the highlights.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <InsightCard
            tone="opportunity"
            title="Italian guests book 2.4 days · Germans book 4.1 days"
            body="Pitch German visitors longer multi-day combinations (Wahiba + Nizwa + Jebel). They're already inclined."
          />
          <InsightCard
            tone="opportunity"
            title="Hotel referrals convert 2.3× better than direct"
            body="Crowne Plaza concierge sent 4 of last week's 7 bookings. Worth a thank-you visit + small commission bump."
          />
          <InsightCard
            tone="warning"
            title="Jebel Akhdar bookings down 22% MoM"
            body="Three new operators listed it on GetYourGuide last month at lower prices. Consider matching, or pivot the marketing."
          />
          <InsightCard
            tone="opportunity"
            title="Wadi Shab → Nizwa repeat pattern"
            body="60% of guests who book Wadi Shab return for Nizwa within 90 days. Send a follow-up at day 60 with a small loyalty discount."
          />
        </div>
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center text-sm text-muted-foreground">
          More patterns surface after 90 days of bookings · system gets smarter as it learns your
          customers.
        </div>
      </section>
    </div>
  );
}

function InsightCard({
  tone,
  title,
  body,
}: {
  tone: "opportunity" | "warning";
  title: string;
  body: string;
}) {
  const meta =
    tone === "opportunity"
      ? {
          classes: "border-emerald-500/30 bg-emerald-500/5",
          iconClass: "text-emerald-600",
          icon: TrendingUp,
          label: "Opportunity",
        }
      : {
          classes: "border-amber-500/30 bg-amber-500/5",
          iconClass: "text-amber-600",
          icon: AlertTriangle,
          label: "Watch",
        };
  return (
    <article className={cn("rounded-2xl border p-5", meta.classes)}>
      <div className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest", meta.iconClass)}>
        <meta.icon className="h-3 w-3" /> {meta.label}
      </div>
      <h3 className="mt-2 font-display text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-foreground/75">{body}</p>
    </article>
  );
}
