import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Car, Plane, Users, Check, Calendar as CalendarIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { NumberStepper } from "@/components/NumberStepper";
import { DateField, StyledSelect, inputClass } from "@/components/FormFields";
import shareImage from "@/assets/hero-desert.jpg";
import transferHero from "@/assets/transfer-hero-landscape-oman-plate.png";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title: "Private Transfers · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Private airport, city and group transfers across Oman in licensed sedans, 4WDs, minibuses and coaches.",
      },
      { property: "og:image", content: shareImage },
    ],
  }),
  component: TransfersPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(20),
  service: z.enum(["airport", "city", "group"]),
  vehicle: z.string().min(1),
  date: z
    .string()
    .min(1, "Date required")
    .refine((d) => {
      if (!d) return false;
      return new Date(d) >= new Date(new Date().toDateString()); // today or later
    }, "Date must be today or in the future"),
  passengers: z.coerce.number().int().min(1).max(60),
  notes: z.string().trim().max(400).optional(),
});
type FormVals = z.infer<typeof schema>;

const services = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Transfer",
    desc: "Muscat International to your hotel, with meet & greet inside arrivals.",
  },
  {
    id: "city",
    icon: Car,
    title: "City Transfer",
    desc: "Private chauffeur for any point-to-point trip inside Muscat.",
  },
  {
    id: "group",
    icon: Users,
    title: "Group Pick-up",
    desc: "Minibuses and coaches for groups of up to 60 passengers.",
  },
];

const vehicles = [
  "Sedan (Salon)",
  "4WD SUV",
  "Minibus (14 pax)",
  "Coaster Bus (24 pax)",
  "Big Bus (50 pax)",
];

function TransfersPage() {
  const form = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "airport",
      vehicle: vehicles[0],
      date: "",
      passengers: 2,
      notes: "",
    },
  });

  const onSubmit = (data: FormVals) => {
    const msg = encodeURIComponent(
      `Hi Sunshine Tours! Transfer inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nVehicle: ${data.vehicle}\nDate: ${data.date}\nPassengers: ${data.passengers}${data.notes ? `\nNotes: ${data.notes}` : ""}`,
    );
    const url = `https://api.whatsapp.com/send?phone=96896964811&text=${msg}`;
    toast.success("Inquiry sent. We'll reply via WhatsApp within 1 hour.");
    window.open(url, "_blank");
    form.reset();
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-obsidian text-white">
        <img
          src={transferHero}
          alt="Private 4WD transfer vehicle on an Omani hillside at sunrise"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full border-2 border-dashed border-primary/30 opacity-50" />
        <div className="absolute right-12 -bottom-16 h-72 w-72 rounded-full border-2 border-dashed border-accent/40 opacity-50" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
            Door to door
          </span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            Private transfers
            <br />
            across Oman.
          </h1>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-6 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" /> Meet & greet included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" /> Free wait time
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" /> Licensed driver
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry form */}
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Get a quote
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
              Transfer inquiry
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll reply with a price on WhatsApp within an hour.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={form.formState.errors.name?.message}>
                <input {...form.register("name")} className={inputClass} />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <input type="email" {...form.register("email")} className={inputClass} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone / WhatsApp" error={form.formState.errors.phone?.message}>
                <input type="tel" {...form.register("phone")} className={inputClass} />
              </Field>
              <Field label="Date" error={form.formState.errors.date?.message}>
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <DateField value={field.value} onChange={field.onChange} />
                  )}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Service">
                <Controller
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <StyledSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      ariaLabel="Service"
                      options={[
                        { value: "airport", label: "Airport" },
                        { value: "city", label: "City" },
                        { value: "group", label: "Group" },
                      ]}
                    />
                  )}
                />
              </Field>
              <Field label="Vehicle">
                <Controller
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <StyledSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      ariaLabel="Vehicle"
                      options={vehicles.map((v) => ({ value: v, label: v }))}
                    />
                  )}
                />
              </Field>
              <Field label="Passengers" error={form.formState.errors.passengers?.message}>
                <Controller
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <NumberStepper
                      value={field.value}
                      onChange={field.onChange}
                      min={1}
                      max={60}
                      ariaLabel="Passengers"
                    />
                  )}
                />
              </Field>
            </div>
            <Field label="Notes (optional)">
              <textarea
                rows={3}
                {...form.register("notes")}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="ring-focus flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground hover:scale-[1.02] transition-transform"
            >
              <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

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
