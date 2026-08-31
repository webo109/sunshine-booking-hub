import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Mail, X } from "lucide-react";
import { unsubscribe as removeFromList, isSubscribed } from "@/data/newsletter";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  email: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Unsubscribe · Sunshine Tours Oman" },
      {
        name: "description",
        content: "Remove your email from the Sunshine Tours newsletter list.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

type Status = "idle" | "success" | "not-found" | "invalid";

function UnsubscribePage() {
  const { email: queryEmail } = Route.useSearch();
  const [email, setEmail] = useState(queryEmail);
  const [status, setStatus] = useState<Status>("idle");
  const [processed, setProcessed] = useState(false);

  // If we received an email via the URL (e.g. one-click unsubscribe from a
  // future email link), auto-process on mount.
  useEffect(() => {
    if (queryEmail && !processed) {
      handleUnsubscribe(queryEmail, true);
      setProcessed(true);
    }
  }, [queryEmail, processed]);

  const handleUnsubscribe = (input: string, silent = false) => {
    const trimmed = input.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("invalid");
      return;
    }
    if (!isSubscribed(trimmed)) {
      setStatus("not-found");
      if (!silent) setEmail("");
      return;
    }
    removeFromList(trimmed);
    setStatus("success");
    if (!silent) setEmail("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUnsubscribe(email);
  };

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-20 md:pt-32">
      <div className="mx-auto max-w-lg px-5 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        <div className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-sm md:p-10">
          {/* Header */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-black tracking-tight md:text-4xl">
            Unsubscribe
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Remove your email from the Sunshine Tours newsletter. We&apos;ll stop sending you
            updates immediately.
          </p>

          {/* Success state */}
          {status === "success" && (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Check className="h-5 w-5" />
                <h2 className="font-display text-base font-bold">You&apos;ve been unsubscribed</h2>
              </div>
              <p className="mt-2 text-sm text-foreground/80">
                Your email has been removed from our list. You won&apos;t receive any more emails
                from us.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Changed your mind?{" "}
                <Link
                  to="/"
                  className="font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Resubscribe from the home page
                </Link>
                .
              </p>
            </div>
          )}

          {/* Not-found state */}
          {status === "not-found" && (
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <X className="h-5 w-5" />
                <h2 className="font-display text-base font-bold">
                  This email isn&apos;t on our list
                </h2>
              </div>
              <p className="mt-2 text-sm text-foreground/80">
                We couldn&apos;t find that address in our newsletter list, but either way, you
                won&apos;t hear from us.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                }}
                className="ring-focus mt-3 text-xs font-semibold text-brand underline-offset-4 hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Form: shown when idle or invalid */}
          {(status === "idle" || status === "invalid") && (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "invalid") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  required
                  className={cn(
                    "ring-focus w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60",
                    status === "invalid" ? "border-destructive" : "border-border",
                  )}
                />
                {status === "invalid" && (
                  <span className="mt-1 block text-xs text-destructive">
                    Please enter a valid email address.
                  </span>
                )}
              </label>
              <button
                type="submit"
                className="ring-focus inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-brand-foreground transition-transform hover:scale-[1.01]"
              >
                Unsubscribe
              </button>
            </form>
          )}

          {/* Always-on note */}
          <p className="mt-6 border-t border-border pt-5 text-[11px] text-muted-foreground">
            If you keep receiving emails after unsubscribing, message us on WhatsApp at{" "}
            <a
              href="https://api.whatsapp.com/send?phone=96896964811&text=Hi%2C%20I%20unsubscribed%20but%20still%20receive%20emails."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              +968 9696 4811
            </a>{" "}
            and we&apos;ll fix it manually.
          </p>
        </div>
      </div>
    </div>
  );
}
