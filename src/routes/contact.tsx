import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Phone, MapPin, Clock, Send, Globe, Building2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { StyledSelect, inputClass } from "@/components/FormFields";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Sunshine Tours Oman" },
      {
        name: "description",
        content:
          "Get in touch with Sunshine Tours Oman for private tours, transfers, and travel advice. Phone, email, WhatsApp, and office in Muscat.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Phone required").max(20),
  subject: z.enum(["tour", "transfer", "custom", "group", "other"]),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});
type FormVals = z.infer<typeof schema>;

const subjects = [
  { value: "tour", label: "Tour booking" },
  { value: "transfer", label: "Transfer inquiry" },
  { value: "custom", label: "Custom itinerary" },
  { value: "group", label: "Group / corporate" },
  { value: "other", label: "Something else" },
];

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: "+968 9283 0836",
    href: "tel:+96892830836",
    sub: "Daily · 7am – 10pm GST",
    action: "Call now",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+968 9696 4811",
    href: "https://api.whatsapp.com/send?phone=96896964811",
    sub: "Reply within 1 hour",
    action: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sunshinetoursoman.com",
    href: "mailto:info@sunshinetoursoman.com",
    sub: "Reply within 24 hours",
    action: "Send an email",
  },
];

const stats = [
  { icon: Globe, value: "40+", label: "Countries served" },
  { icon: Clock, value: "10 yrs", label: "Operating since 2014" },
  { icon: Building2, value: "5 lang", label: "Multilingual team" },
];

function ContactPage() {
  const form = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "tour",
      message: "",
    },
  });

  const onSubmit = (data: FormVals) => {
    const list = JSON.parse(localStorage.getItem("sunshine_contact_v1") || "[]");
    list.unshift({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("sunshine_contact_v1", JSON.stringify(list));

    const subjectLabel = subjects.find((s) => s.value === data.subject)?.label || data.subject;
    const message = encodeURIComponent(
      `Hi Sunshine Tours, I'd like to ask about ${subjectLabel}. ${data.message} Thanks, ${data.name}`,
    );
    toast.success("Message received. Opening WhatsApp to confirm.");
    window.open(`https://api.whatsapp.com/send?phone=96896964811&text=${message}`, "_blank");
    form.reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian pt-32 pb-20 text-white md:pt-40">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-2 border-dashed border-primary/30 opacity-50" />
        <div className="absolute right-16 bottom-20 h-40 w-40 rounded-full border-2 border-dashed border-accent/40 opacity-50" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
            We reply fast
          </span>
          <h1 className="font-display mb-6 text-5xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-8xl">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            Tell us your dream Oman story. We'll come back to you with a tailored itinerary, in any
            of five languages, within 24 hours.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="ring-focus group block cursor-pointer rounded-2xl border border-primary/25 bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl active:translate-y-0 active:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 break-words font-display text-lg font-bold tracking-tight lg:text-xl">
                    {c.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.sub}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-primary">
                    {c.action}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Office */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_400px]">
          <div className="rounded-3xl border border-border bg-card p-7 md:p-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Send us a message
            </span>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">
              How can we help?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the form and we'll WhatsApp you back within an hour during business hours.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={form.formState.errors.name?.message}>
                  <input
                    {...form.register("name")}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone / WhatsApp" error={form.formState.errors.phone?.message}>
                  <input
                    type="tel"
                    {...form.register("phone")}
                    className={inputClass}
                    placeholder="+968 9XXX XXXX"
                  />
                </Field>
              </div>
              <Field label="Email address" error={form.formState.errors.email?.message}>
                <input
                  type="email"
                  {...form.register("email")}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Subject">
                <Controller
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <StyledSelect
                      ariaLabel="Subject"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={subjects.map((s) => ({ value: s.value, label: s.label }))}
                    />
                  )}
                />
              </Field>
              <Field label="Your message" error={form.formState.errors.message?.message}>
                <textarea
                  rows={5}
                  {...form.register("message")}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us your dates, group size and what you'd love to see…"
                />
              </Field>

              <button
                type="submit"
                className="ring-focus inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wider text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" /> Send message
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                We never share your details. By submitting you agree to our privacy policy.
              </p>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">Visit our office</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Sunshine Tours Oman
                <br />
                Muscat, Sultanate of Oman
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Full office address shared on request. Most guests meet us at their hotel, the
                airport or their tour pickup point.
              </p>
              {/* The OSM embed renders its own footer bar of links (report a problem, donate,
                  API terms). It sits inside a cross-origin iframe, so we crop it out of view and
                  carry the required credit ourselves as plain text. */}
              <div className="relative mt-5 h-56 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Muscat, Oman"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=58.35%2C23.56%2C58.60%2C23.66&amp;layer=mapnik&amp;marker=23.6100%2C58.4750"
                  className="absolute inset-x-0 top-0 h-[17.5rem] w-full border-0"
                />
                <span className="pointer-events-none absolute right-2 bottom-2 rounded-md bg-card/80 px-1.5 py-0.5 text-[10px] text-muted-foreground backdrop-blur">
                  © OpenStreetMap contributors
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Muscat+Oman"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
              >
                Muscat on Google Maps →
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">Office hours</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <Hour day="Saturday – Thursday" time="08:00 – 20:00" />
                <Hour day="Friday" time="14:00 – 20:00" />
                <Hour day="WhatsApp support" time="24 / 7" highlight />
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center"
                >
                  <s.icon className="mx-auto h-5 w-5 text-brand" />
                  <p className="mt-2 font-display text-base font-black text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
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

function Hour({ day, time, highlight }: { day: string; time: string; highlight?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{day}</span>
      <span className={highlight ? "font-semibold text-brand" : "font-medium text-foreground"}>
        {time}
      </span>
    </li>
  );
}
