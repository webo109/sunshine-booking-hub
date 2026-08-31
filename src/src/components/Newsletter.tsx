import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Send, Check, Mail } from "lucide-react";
import { toast } from "sonner";
import { subscribe } from "@/data/newsletter";
import { cn } from "@/lib/utils";

export function Newsletter({ variant = "footer" }: { variant?: "footer" | "card" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const wasNew = subscribe(trimmed);
    setDone(true);
    toast.success(
      wasNew ? "You're on the list, thank you!" : "You're already subscribed, thank you!",
    );
    setEmail("");
    timerRef.current = setTimeout(() => setDone(false), 4000);
  };

  if (variant === "card") {
    return (
      <div className="rounded-3xl border border-border bg-card p-7 md:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">Travel inspiration</h3>
            <p className="text-xs text-muted-foreground">One curated email a month, never spam.</p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="ring-focus flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
            required
          />
          <button
            type="submit"
            className={cn(
              "ring-focus inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all",
              done
                ? "bg-emerald-500 text-white"
                : "bg-brand text-brand-foreground hover:scale-[1.02]",
            )}
          >
            {done ? (
              <>
                <Check className="h-4 w-4" /> Subscribed
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Join
              </>
            )}
          </button>
        </form>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Already on the list?{" "}
          <Link
            to="/unsubscribe"
            className="font-semibold text-foreground underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
          >
            Unsubscribe
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
      <p className="mt-3 text-sm text-muted-foreground">
        Tour ideas, photos and special offers. One email a month.
      </p>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="ring-focus flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60"
          required
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={cn(
            "ring-focus flex h-10 w-10 items-center justify-center rounded-full transition-all",
            done ? "bg-emerald-500 text-white" : "bg-brand text-brand-foreground hover:scale-105",
          )}
        >
          {done ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
      <p className="mt-3 text-[11px] text-muted-foreground">
        <Link
          to="/unsubscribe"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Unsubscribe
        </Link>{" "}
        anytime.
      </p>
    </div>
  );
}
