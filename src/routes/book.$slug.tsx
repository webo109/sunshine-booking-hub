import { createFileRoute, Link, notFound, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Car,
  Check,
  ClipboardCheck,
  Minus,
  Plus,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { getTourBySlug, type Tour } from "@/data/tours";
import { transports, getTransport, type TransportId } from "@/data/transports";
import { generateReference, saveBooking, type Booking } from "@/data/bookings";
import {
  formatOMR,
  formatDate,
  formatDateRange,
  isUnavailable,
  tripDays,
  tripEndDate,
} from "@/lib/format";
import { Calendar } from "@/components/ui/calendar";
import { TripSpanCard, SummaryRow } from "@/components/BookingSummary";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$slug")({
  loader: ({ params }): { tour: Tour } => {
    const tour = getTourBySlug(params.slug);
    if (!tour) throw notFound();
    if (tour.priceOnRequest) {
      throw redirect({ to: "/tours/$slug", params: { slug: tour.slug } });
    }
    return { tour };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Book ${loaderData.tour.shortName} · Sunshine Tours`
          : "Book · Sunshine Tours",
      },
      {
        name: "description",
        content: "Reserve your private guided tour in Oman in a few simple steps.",
      },
    ],
  }),
  component: BookingWizard,
});

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Phone number required").max(20),
  whatsapp: z.string().trim().max(20).optional().or(z.literal("")),
  nationality: z.string().trim().min(2, "Nationality required").max(60),
  notes: z.string().trim().max(500).optional(),
});
type CustomerForm = z.infer<typeof customerSchema>;

const STEPS = [
  { key: "date", label: "Date", icon: CalendarIcon },
  { key: "guests", label: "Guests", icon: Users },
  { key: "transport", label: "Transport", icon: Car },
  { key: "details", label: "Details", icon: UserRound },
  { key: "review", label: "Review", icon: ClipboardCheck },
] as const;

const dayOfWeekLong = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long" });

const daysFromToday = (d: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
};

const skipFriday = (d: Date, allowFriday = false) => {
  if (!allowFriday && d.getDay() === 5) d.setDate(d.getDate() + 1);
  return d;
};

const sameDay = (a: Date | undefined, b: Date) =>
  !!a &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const quickPicks: Array<{ label: string; compute: (allowFriday: boolean) => Date }> = [
  {
    label: "Tomorrow",
    compute: (allowFriday) => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return skipFriday(d, allowFriday);
    },
  },
  {
    label: "This Saturday",
    compute: () => {
      const d = new Date();
      const today = d.getDay();
      const daysToSat = (6 - today + 7) % 7 || 7;
      d.setDate(d.getDate() + daysToSat);
      return d;
    },
  },
  {
    label: "In 2 weeks",
    compute: (allowFriday) => {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      return skipFriday(d, allowFriday);
    },
  },
  {
    label: "Next month",
    compute: (allowFriday) => {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      return skipFriday(d, allowFriday);
    },
  },
];

function BookingWizard() {
  const { tour } = Route.useLoaderData();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [transportId, setTransportId] = useState<TransportId>("none");
  const [pickupAddress, setPickupAddress] = useState("");

  const form = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", email: "", phone: "", whatsapp: "", nationality: "", notes: "" },
  });

  /**
   * The trip span implied by the chosen start date. `days` comes from the
   * tour's own duration, so a "4 days · 3 nights" round trip starting Sun 09
   * Aug returns Wed 12 Aug, while a "Full day" tour starts and ends the same
   * day. Every listing gets a span; single-day ones just collapse to one date.
   */
  const days = tripDays(tour);
  const endDate = date ? tripEndDate(date, days) : undefined;
  const isMultiDay = days > 1;

  const transport = getTransport(transportId);
  const subtotal = adults * tour.adultPrice + children * tour.childPrice;
  const total = subtotal + transport.price;
  const guestsValid = adults >= 1 && adults + children <= tour.maxGroup;

  const next = async () => {
    if (step === 0 && !date) return toast.error("Please select a date");
    if (step === 1 && !guestsValid) return toast.error(`Max ${tour.maxGroup} guests for this tour`);
    if (step === 3) {
      const ok = await form.trigger();
      if (!ok) return;
    }
    if (step === 4) {
      submitBooking();
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const submitBooking = () => {
    const customer = form.getValues();
    const reference = generateReference();
    const booking: Booking = {
      reference,
      tourSlug: tour.slug,
      tourName: tour.name,
      date: date!.toISOString(),
      adults,
      children,
      subtotal,
      transportFee: transport.price,
      total,
      transport: {
        id: transport.id,
        name: transport.name,
        pickupAddress: pickupAddress || undefined,
      },
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        whatsapp: customer.whatsapp || undefined,
        nationality: customer.nationality,
        notes: customer.notes,
      },
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    toast.success(`Booking request received · ${reference}`);
    navigate({ to: "/booking/$reference", params: { reference } });
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20 pt-24 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {tour.shortName}
        </Link>
        <h1 className="mt-3 font-display text-3xl font-black tracking-tight md:text-4xl">
          Book your tour
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{tour.name}</p>

        {/* Stepper: icon nodes joined by dashed connectors */}
        <nav aria-label="Booking steps" className="mt-8">
          <ol
            className="grid"
            style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}
          >
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.key} className="relative flex flex-col items-center">
                  {/* Dashed connector running to the next node */}
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-1/2 top-6 w-full border-t border-dashed transition-colors duration-500 md:top-7",
                        done ? "border-brand/45" : "border-border",
                      )}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => done && setStep(i)}
                    disabled={!done && !active}
                    aria-current={active ? "step" : undefined}
                    aria-label={`Step ${i + 1}: ${s.label}`}
                    className={cn(
                      "ring-focus relative z-10 grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 md:h-14 md:w-14",
                      active
                        ? "scale-105 cursor-default border-transparent bg-brand text-brand-foreground shadow-lg shadow-brand/25"
                        : done
                          ? "cursor-pointer border-brand/40 bg-brand/10 text-brand hover:bg-brand/20"
                          : "cursor-not-allowed border-border bg-card text-muted-foreground/45",
                    )}
                  >
                    {done ? (
                      <Check className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                    ) : (
                      <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                    )}
                  </button>

                  <span
                    className={cn(
                      "mt-3 items-baseline gap-1.5",
                      active ? "flex" : "hidden sm:flex",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-black leading-none",
                        active ? "text-brand" : done ? "text-brand/60" : "text-muted-foreground/40",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-wider md:text-xs",
                        active
                          ? "text-foreground"
                          : done
                            ? "text-muted-foreground"
                            : "text-muted-foreground/50",
                      )}
                    >
                      {s.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
          {/* Step 0: Date */}
          {step === 0 && (
            <section>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                <CalendarIcon className="h-5 w-5 text-brand" /> Select Your Date
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {tour.allowFriday
                  ? "Past dates are unavailable. This tour runs on Fridays."
                  : "Fridays and past dates are unavailable."}
              </p>

              {/* Quick-pick chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Quick pick:
                </span>
                {quickPicks.map((qp) => {
                  const computed = qp.compute(!!tour.allowFriday);
                  const active = sameDay(date, computed);
                  return (
                    <button
                      key={qp.label}
                      type="button"
                      onClick={() => setDate(computed)}
                      className={cn(
                        "ring-focus rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                        active
                          ? "bg-brand text-brand-foreground shadow-sm shadow-brand/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/70",
                      )}
                    >
                      {qp.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,420px)_minmax(0,300px)] md:items-stretch md:justify-center">
                <div className="rounded-2xl border border-border bg-background p-3 sm:p-5">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d: Date) => isUnavailable(d, !!tour.allowFriday)}
                    initialFocus
                    /* Tint the nights after departure so a multi-day trip is
                       visible on the calendar itself, not just in the panel.
                       Starts the day after the selection so it never fights
                       the selected-day styling. */
                    modifiers={
                      isMultiDay && date && endDate
                        ? { tripSpan: { from: addDays(date, 1), to: endDate } }
                        : undefined
                    }
                    modifiersClassNames={{
                      /* opacity-100 overrides the `disabled` dimming: Fridays
                         can't be a departure date, but they are still days of
                         a multi-day trip, so the span must stay unbroken. */
                      tripSpan:
                        "opacity-100! [&>button]:bg-brand/20 [&>button]:text-foreground [&>button]:opacity-100",
                    }}
                    className="pointer-events-auto w-full [--cell-size:2.15rem] sm:[--cell-size:2.5rem]"
                    classNames={{
                      root: "w-full",
                      week: "mt-1 flex w-full",
                      weekdays: "flex pb-1",
                      months: "relative flex flex-col gap-2 md:flex-row",
                      month: "flex w-full flex-col gap-2",
                    }}
                  />
                </div>
                <aside className="flex flex-col rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">
                    Your selection
                  </div>
                  {date && endDate ? (
                    <>
                      <div className="mt-3 font-display text-3xl font-black leading-tight tracking-tight text-foreground">
                        {dayOfWeekLong(date)}
                      </div>
                      <div className="mt-1 font-display text-base font-semibold text-foreground">
                        {formatDate(date)}
                      </div>
                      <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                        <CalendarIcon className="h-3 w-3" />
                        {(() => {
                          const away = daysFromToday(date);
                          if (away === 0) return "Today";
                          if (away === 1) return "Tomorrow";
                          if (away < 0) return `${Math.abs(away)} days ago`;
                          return `In ${away} day${away === 1 ? "" : "s"}`;
                        })()}
                      </div>

                      <div className="mt-5">
                        <TripSpanCard
                          date={date}
                          endDate={endDate}
                          isMultiDay={isMultiDay}
                          durationLabel={tour.durationLabel}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-3 font-display text-2xl font-bold leading-tight text-foreground">
                        No date yet
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Pick an available day from the calendar, or use a quick-pick above.
                      </p>
                    </>
                  )}
                  <div className="mt-auto flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand" /> Selected
                    <span className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />{" "}
                    Unavailable
                  </div>
                </aside>
              </div>
            </section>
          )}

          {/* Step 1: Guests */}
          {step === 1 && (
            <section>
              <h2 className="font-display text-xl font-bold">Number of Guests</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Maximum {tour.maxGroup} guests for this tour.
              </p>
              <div className="mt-5 space-y-3">
                <Counter
                  label="Adults"
                  sub={`${formatOMR(tour.adultPrice)} per person`}
                  value={adults}
                  setValue={setAdults}
                  min={1}
                  max={tour.maxGroup - children}
                />
                <Counter
                  label="Children (3–12)"
                  sub={`${formatOMR(tour.childPrice)} per person`}
                  value={children}
                  setValue={setChildren}
                  min={0}
                  max={tour.maxGroup - adults}
                />
              </div>
              <p
                className={cn(
                  "mt-3 text-xs",
                  guestsValid ? "text-muted-foreground" : "text-destructive",
                )}
              >
                {adults + children} of max {tour.maxGroup} guests
              </p>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Transport options available on the next step
              </p>
            </section>
          )}

          {/* Step 2: Transport */}
          {step === 2 && (
            <section>
              <h2 className="font-display text-xl font-bold">Choose Your Transport</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Select the type of transfer you need for this tour.
              </p>
              <div className="mt-5 space-y-3">
                {transports.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTransportId(t.id)}
                    className={cn(
                      "ring-focus group flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                      transportId === t.id
                        ? "border-brand bg-brand/5 shadow-sm shadow-brand/20"
                        : "border-border bg-background hover:border-brand/40",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        transportId === t.id
                          ? "border-brand bg-brand"
                          : "border-border bg-background",
                      )}
                    >
                      {transportId === t.id && <Check className="h-3 w-3 text-brand-foreground" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-base font-bold text-foreground">
                          {t.name}
                        </h3>
                        <span className="font-display text-base font-bold text-brand whitespace-nowrap">
                          {t.price === 0 ? "Free" : formatOMR(t.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                      {t.vehicles.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {t.vehicles.map((v) => (
                            <span
                              key={v}
                              className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {transportId !== "none" && (
                <div className="mt-5">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pickup Address <span className="text-muted-foreground/60">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value.slice(0, 120))}
                      placeholder="e.g. Grand Hyatt Muscat, Terminal 2…"
                      className={inputClass}
                    />
                  </label>
                </div>
              )}
            </section>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <section>
              <h2 className="font-display text-xl font-bold">Your Details</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] md:items-start">
                <form className="space-y-4">
                  <Field label="Full Name" error={form.formState.errors.name?.message}>
                    <input
                      {...form.register("name")}
                      className={inputClass}
                      placeholder="Mohammed Al-Said"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email Address" error={form.formState.errors.email?.message}>
                      <input
                        type="email"
                        {...form.register("email")}
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </Field>
                    <Field label="Nationality" error={form.formState.errors.nationality?.message}>
                      <input
                        {...form.register("nationality")}
                        className={inputClass}
                        placeholder="e.g. British, German, Omani"
                      />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone Number" error={form.formState.errors.phone?.message}>
                      <input
                        type="tel"
                        {...form.register("phone")}
                        className={inputClass}
                        placeholder="+968 9XXX XXXX"
                      />
                    </Field>
                    <Field label="WhatsApp Number" error={form.formState.errors.whatsapp?.message}>
                      <input
                        type="tel"
                        {...form.register("whatsapp")}
                        className={inputClass}
                        placeholder="+968 9XXX XXXX"
                      />
                    </Field>
                  </div>
                  <Field label="Notes (optional)" error={form.formState.errors.notes?.message}>
                    <textarea
                      {...form.register("notes")}
                      rows={3}
                      className={cn(inputClass, "resize-none")}
                      placeholder="Dietary needs, special requests, etc."
                    />
                  </Field>
                </form>

                {/* Recap of everything chosen so far, so the customer can confirm
                  the trip without stepping back out of the form. */}
                <aside className="rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">
                    Your booking
                  </div>
                  <div className="mt-3 font-display text-xl font-black leading-tight tracking-tight text-foreground">
                    {tour.shortName}
                  </div>

                  {date && endDate && (
                    <div className="mt-4">
                      <TripSpanCard
                        date={date}
                        endDate={endDate}
                        isMultiDay={isMultiDay}
                        durationLabel={tour.durationLabel}
                      />
                    </div>
                  )}

                  <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                    <SummaryRow
                      label="Guests"
                      value={`${adults} adult${adults !== 1 ? "s" : ""}${children > 0 ? ` · ${children} child${children !== 1 ? "ren" : ""}` : ""}`}
                    />
                    <SummaryRow label="Transport" value={transport.name} />
                  </dl>
                </aside>
              </div>
            </section>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <section>
              <h2 className="font-display text-xl font-bold">Review Your Booking</h2>
              <div className="mt-5 divide-y divide-border rounded-2xl border border-border">
                <ReviewRow label="Tour" value={tour.shortName} />
                <ReviewRow
                  label={isMultiDay ? "Trip dates" : "Date"}
                  value={date && endDate ? formatDateRange(date, endDate) : "Not set"}
                />
                {isMultiDay && <ReviewRow label="Duration" value={tour.durationLabel} />}
                <ReviewRow
                  label="Guests"
                  value={`${adults} adult${adults !== 1 ? "s" : ""}${children > 0 ? ` · ${children} child${children !== 1 ? "ren" : ""}` : ""}`}
                />
                <ReviewRow label="Transport" value={transport.name} />
                {pickupAddress && <ReviewRow label="Pickup" value={pickupAddress} />}
                <ReviewRow label="Name" value={form.getValues("name") || "Not set"} />
                <ReviewRow label="Email" value={form.getValues("email") || "Not set"} />
                <ReviewRow label="Phone" value={form.getValues("phone") || "Not set"} />
                <ReviewRow
                  label={`Adults (${adults} × ${formatOMR(tour.adultPrice)})`}
                  value={formatOMR(adults * tour.adultPrice)}
                />
                {children > 0 && (
                  <ReviewRow
                    label={`Children (${children} × ${formatOMR(tour.childPrice)})`}
                    value={formatOMR(children * tour.childPrice)}
                  />
                )}
                {transport.price > 0 && (
                  <ReviewRow label="Transport fee" value={formatOMR(transport.price)} />
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between rounded-2xl bg-muted/50 px-5 py-4">
                <span className="font-display text-lg font-bold">Total</span>
                <span className="font-display text-3xl font-black text-brand">
                  {formatOMR(total)}
                </span>
              </div>
            </section>
          )}

          {/* Step navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="ring-focus inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-40 sm:px-5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={next}
              className="ring-focus inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.03] sm:px-7"
            >
              {step === 4 ? "Confirm booking request" : "Continue"}
              {step !== 4 && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "ring-focus w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Counter({
  label,
  sub,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  sub: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-5">
      <div>
        <div className="font-display text-base font-bold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => setValue(Math.max(min, value - 1))}
          disabled={value <= min}
          className="ring-focus flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted disabled:opacity-30"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center font-display text-xl font-bold tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => setValue(Math.min(max, value + 1))}
          disabled={value >= max}
          className="ring-focus flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}
