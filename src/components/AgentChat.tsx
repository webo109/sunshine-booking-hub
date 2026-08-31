import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bot, ExternalLink, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { tours } from "@/data/tours";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

type ActionButton =
  | {
      label: string;
      kind: "internal";
      to: string;
      params?: Record<string, string>;
      search?: Record<string, string>;
    }
  | { label: string; kind: "external"; href: string }
  | { label: string; kind: "tel"; number: string };

interface AgentReply {
  text: string;
  actions?: ActionButton[];
  suggestions?: string[];
}

interface Message extends AgentReply {
  id: string;
  role: "user" | "agent";
  ts: number;
}

// ----------------------------------------------------------------------------
// Intent classifier
// ----------------------------------------------------------------------------

const INITIAL_SUGGESTIONS = [
  "Find a desert tour",
  "I have 3 days",
  "Family-friendly tours",
  "Talk to a human",
];

function tourLink(slug: string, label: string): ActionButton {
  return { kind: "internal", to: "/tours/$slug", params: { slug }, label };
}

function browseTours(filters: Record<string, string>, label: string): ActionButton {
  return { kind: "internal", to: "/tours", search: filters, label };
}

function classifyIntent(rawInput: string): AgentReply {
  const input = rawInput.toLowerCase().trim();

  // -------- Greetings
  if (/^(hi|hello|hey|hola|salaam|marhaba|good (morning|evening|afternoon))[!.\s]*$/i.test(input)) {
    return {
      text: "Hello! Tell me what kind of trip you're imagining: desert, wadi, mountain, city, family, adventure. Or ask me anything about booking with Sunshine Tours.",
      suggestions: INITIAL_SUGGESTIONS,
    };
  }

  // -------- Booking reference lookup (STO-XXXXX)
  const refMatch = input.match(/sto-?[a-z0-9]{4,8}/i);
  if (refMatch) {
    return {
      text: `Looks like a booking reference. I'll take you to the lookup page so you can see all the details.`,
      actions: [{ kind: "internal", to: "/booking-lookup", label: "Open booking lookup" }],
      suggestions: ["Talk to a human", "Browse tours"],
    };
  }

  // -------- Specific tour by name (highest specificity, check before regions)
  for (const t of tours) {
    const candidates = [t.shortName, t.slug.replace(/-/g, " "), t.name].map((s) => s.toLowerCase());
    if (candidates.some((c) => input.includes(c) && c.length > 4)) {
      return {
        text: `Great pick, ${t.shortName}. ${t.tagline} ${
          t.priceOnRequest
            ? "It's a custom round-trip so we'll quote on WhatsApp."
            : `From ${t.adultPrice} OMR per adult.`
        }`,
        actions: [
          tourLink(t.slug, `View ${t.shortName}`),
          ...(!t.priceOnRequest
            ? ([
                {
                  kind: "internal",
                  to: "/book/$slug",
                  params: { slug: t.slug },
                  label: "Book it now",
                },
              ] as ActionButton[])
            : []),
        ],
        suggestions: ["Show me similar tours", "How do I book?", "Talk to a human"],
      };
    }
  }

  // -------- Region intents
  const regionMap: Record<string, string> = {
    muscat: "Muscat",
    "ad dakhiliyah": "Ad Dakhiliyah",
    dakhiliyah: "Ad Dakhiliyah",
    nizwa: "Ad Dakhiliyah",
    "ash sharqiyah": "Ash Sharqiyah",
    sharqiyah: "Ash Sharqiyah",
    sharqiya: "Ash Sharqiyah",
    "al batinah": "Al Batinah",
    batinah: "Al Batinah",
    dhofar: "Dhofar",
    salalah: "Dhofar",
    musandam: "Musandam",
    khasab: "Musandam",
  };
  for (const [key, value] of Object.entries(regionMap)) {
    if (input.includes(key)) {
      return {
        text: `${value} tours coming up. I'll filter the catalog so you only see what's in that region.`,
        actions: [browseTours({ region: value }, `Browse ${value} tours`)],
        suggestions: ["I have 3 days", "Family-friendly tours", "Talk to a human"],
      };
    }
  }

  // -------- Difficulty intents
  if (/\b(easy|relaxed|gentle|chilled?|low(\s|-)effort)\b/.test(input)) {
    return {
      text: "Perfect. I'll show you all our Easy tours. These have light walking, low altitude, and work well for kids and grandparents.",
      actions: [browseTours({ difficulty: "Easy" }, "Browse easy tours")],
      suggestions: ["Family-friendly tours", "Show me Muscat tours", "Talk to a human"],
    };
  }
  if (/\b(challenging|hard|tough|extreme|adventur|thrill|hike|trek)/.test(input)) {
    return {
      text: "If you want to earn the view, our Challenging tours are for you: Jebel Shams Balcony Walk, dune crossings, deep wadi swims.",
      actions: [browseTours({ difficulty: "Challenging" }, "Browse adventure tours")],
      suggestions: ["I have 3 days", "Plan a custom trip", "Talk to a human"],
    };
  }

  // -------- Category intents
  if (/\b(desert|dune|sand|wahiba)\b/.test(input)) {
    return {
      text: "Two ways to do the desert: a same-day Wahiba dune-bashing run, or a full overnight at a Bedouin camp under the stars.",
      actions: [
        tourLink("wahiba-sands-overnight", "Wahiba overnight"),
        tourLink("desert-adventure-day", "Desert day tour"),
      ],
      suggestions: ["What's the price?", "How do I book?", "Talk to a human"],
    };
  }
  if (/\b(wadi|pool|swim|waterfall|canyon)\b/.test(input)) {
    return {
      text: "Wadi season runs all year. Wadi Shab is the icon (cave waterfall swim); Wadi Bani Khalid + Tiwi is the easier family option.",
      actions: [
        tourLink("wadi-shab-emerald-pools", "Wadi Shab"),
        tourLink("wadi-bani-khalid-tiwi", "Bani Khalid + Tiwi"),
        tourLink("wadi-al-arbeieen-adventure", "Wadi Al Arbeieen"),
      ],
      suggestions: ["I have 3 days", "Easy tours", "Talk to a human"],
    };
  }
  if (/\b(mountain|jebel|hike|peak|altitude|rose)\b/.test(input)) {
    return {
      text: "Two distinct mountain experiences: Jebel Shams for the dramatic canyon Balcony Walk; Jebel Akhdar for the rose terraces and cool plateau.",
      actions: [
        tourLink("jebel-shams-grand-canyon", "Jebel Shams"),
        tourLink("jebel-akhdar-rose-mountain", "Jebel Akhdar"),
      ],
      suggestions: ["Easy tours", "What's the best time?", "Talk to a human"],
    };
  }
  if (/\b(city|culture|mosque|souq|fort|heritage|history|historic)\b/.test(input)) {
    return {
      text: "Heritage Oman: old forts, falaj villages, the Grand Mosque, and the silver souqs of Nizwa. Pick by region or do a multi-stop heritage day.",
      actions: [
        tourLink("muscat-city-private", "Muscat City"),
        tourLink("nizwa-friday-souq", "Nizwa Friday Souq"),
        tourLink("oman-historical-forts", "Three Forts day"),
      ],
      suggestions: ["I have 3 days", "Talk to a human"],
    };
  }
  if (/\b(coast|beach|sea|dolphin|snorkel|island)\b/.test(input)) {
    return {
      text: "For sea time: half-day dolphin + cove cruise from Muscat marina, or a full snorkel day at the protected Daymaniyat reefs.",
      actions: [
        tourLink("sea-tour-dolphins-bandar", "Sea Tour · Dolphins"),
        tourLink("snorkel-daymaniyat", "Daymaniyat Snorkel"),
      ],
      suggestions: ["I have 3 days", "Talk to a human"],
    };
  }
  if (/\b(frankincense|luban|incense)\b/.test(input)) {
    return {
      text: "Frankincense is Dhofar's signature. Our Al Luban trip flies you to Salalah for the museum, the Wadi Dawkah Boswellia groves, and the Sumhuram harbour ruins.",
      actions: [tourLink("al-luban-frankincense-trail", "Al Luban · 3 days")],
      suggestions: ["Talk to a human"],
    };
  }

  // -------- Duration intents
  const dayMatch = input.match(/(\d+)\s*(day|days|night|nights|d\b)/);
  if (dayMatch) {
    const days = parseInt(dayMatch[1], 10);
    if (days <= 1) {
      return {
        text: "One day is perfect for a Muscat city tour or a day trip into the wadis or mountains. I'll show you the day tours.",
        actions: [browseTours({ duration: "Day" }, "Browse day tours")],
        suggestions: ["Show me Muscat tours", "Adventure tours", "Talk to a human"],
      };
    }
    if (days === 2) {
      return {
        text: "Two days unlocks an overnight at the Wahiba camp or a wadi-to-wadi sleep under the stars.",
        actions: [browseTours({ duration: "Multi" }, "Browse overnights")],
        suggestions: ["What's the price?", "Talk to a human"],
      };
    }
    if (days >= 3 && days <= 5) {
      return {
        text: `${days} days is enough for a real loop: Muscat + Wahiba + Wadi Shab, or fly south for the Salalah/frankincense story. Let me build you a custom plan.`,
        actions: [
          { kind: "internal", to: "/contact", label: "Plan a custom trip" },
          browseTours({ category: "Round Trip" }, "Browse round trips"),
        ],
        suggestions: ["Build it from multiple tours", "Talk to a human"],
      };
    }
    if (days >= 6) {
      return {
        text: `${days} days lets you cover the full Sultanate, north fjords to southern monsoon coast. Our Mazoon Grand Discovery is the longest itinerary, or we can custom-build it.`,
        actions: [
          tourLink("mazoon-grand-discovery", "Mazoon · 10-day"),
          tourLink("grand-tour-7days", "Grand Tour · 7-day"),
          { kind: "internal", to: "/contact", label: "Plan a custom trip" },
        ],
        suggestions: ["Talk to a human"],
      };
    }
  }
  if (/\b(weekend|short(\sbreak)?|quick|half\s?day)\b/.test(input)) {
    return {
      text: "Short on time? Half-day Muscat city, or a long-day Wahiba dune run that gets you back the same evening.",
      actions: [
        tourLink("muscat-city-private", "Muscat (½ day)"),
        tourLink("desert-adventure-day", "Desert day"),
      ],
      suggestions: ["Talk to a human"],
    };
  }
  if (/\b(week|7\s?days?)\b/.test(input)) {
    return {
      text: "A full week is the sweet spot. Our Grand Tour covers Muscat, the interior, the desert, and the eastern wadis with all hotels included.",
      actions: [tourLink("grand-tour-7days", "Grand Tour · 7-day")],
      suggestions: ["Build a custom trip", "Talk to a human"],
    };
  }

  // -------- Family / kids
  if (
    /\b(family|kid|kids|child|children|baby|toddler|grandparent|parents|son|daughter)\b/.test(input)
  ) {
    return {
      text: "We love family trips. Wadi Shab, Wadi Bani Khalid, and the Muscat city tour all work brilliantly with kids 6+. Children 3–12 get a 40% discount.",
      actions: [
        browseTours({ difficulty: "Easy" }, "Easy tours"),
        tourLink("maymona-family", "Maymona · family round-trip"),
      ],
      suggestions: ["I have 3 days", "Talk to a human"],
    };
  }

  // -------- Custom itinerary
  if (/\b(custom|tailor|design|plan(\smy)?|itinerary|bespoke)\b/.test(input)) {
    return {
      text: "Let's build it from scratch. Send us a message with your dates, group size, language, pace and budget, and we'll come back with a tailored quote within 24 hours.",
      actions: [{ kind: "internal", to: "/contact", label: "Send us your plan" }],
      suggestions: ["Talk to a human"],
    };
  }

  // -------- Multi-tour package
  if (
    /\b(multi|multiple|combine|package|bundle|several|few tours|two tours|three tours)\b/.test(
      input,
    )
  ) {
    return {
      text: "We can absolutely combine several tours into one trip. Message us with the ones you have in mind, along with dates, group size and pace, and we'll come back with a single bundled quote within 24 hours.",
      actions: [{ kind: "internal", to: "/contact", label: "Send us your plan" }],
      suggestions: ["Browse tours", "Talk to a human"],
    };
  }

  // -------- Booking / how to book
  if (
    /\b(how(\sdo\si)?\sbook|booking process|reserve|reservation|how to book|do i book)\b/.test(
      input,
    )
  ) {
    return {
      text: "Pick a tour, click Request to Book, and complete five quick steps: date, guests, transport, your details, and review. You get a reference number immediately; our team then reaches out on WhatsApp within 24 hours to confirm and arrange payment offline (cash, bank transfer, or in-person card).",
      actions: [
        { kind: "internal", to: "/tours", label: "Browse tours" },
        { kind: "internal", to: "/faq", label: "Booking FAQ" },
      ],
      suggestions: ["How will I pay?", "Cancellation policy?", "Talk to a human"],
    };
  }

  // -------- Payment (now offline-only)
  if (/\b(price|cost|how much|payment|pay|paypal|card|cash|omannet)\b/.test(input)) {
    return {
      text: "Prices are in OMR. Payment is arranged offline by our team after they confirm your booking on WhatsApp: cash on the day, bank transfer, or in-person card payment, whichever suits you. No card details are stored on our site.",
      actions: [{ kind: "internal", to: "/faq", label: "Payment FAQ" }],
      suggestions: ["How do I book?", "Cancellation policy?", "Talk to a human"],
    };
  }

  // -------- Cancellation
  if (/\b(cancel|refund|reschedule|change date|move date)\b/.test(input)) {
    return {
      text: "Day tours: free cancellation up to 48h before for a full refund. Multi-day: free up to 14 days; 50% between 14 and 7 days; non-refundable inside 7. Reschedule is free up to 48h before.",
      actions: [{ kind: "internal", to: "/faq", label: "Cancellation FAQ" }],
      suggestions: ["Talk to a human"],
    };
  }

  // -------- Weather / best time
  if (/\b(weather|when|season|best time|hot|cold|rain|monsoon|khareef)\b/.test(input)) {
    return {
      text: "October to April is the comfortable window across most of Oman (22–30°C). Dhofar/Salalah has its unique Khareef monsoon late-June to early-September: green hills, mist, and 20°C while the rest of the Gulf bakes.",
      suggestions: ["Show me Salalah tours", "Show me Muscat tours", "Talk to a human"],
    };
  }

  // -------- Languages
  if (/\b(language|english|italian|french|german|spanish|arabic|speaks?)\b/.test(input)) {
    return {
      text: "Our guides speak English, Italian, French, German, Spanish and Arabic fluently. Mention your language at booking and we'll match you to the right guide.",
      suggestions: ["How do I book?", "Talk to a human"],
    };
  }

  // -------- Transfers / airport
  if (/\b(transfer|airport|pickup|pick up|hotel pickup|drop off|chauffeur)\b/.test(input)) {
    return {
      text: "We do private airport transfers, city chauffeur service, and group pickups in sedans / 4WDs / minibuses / coasters / big buses.",
      actions: [{ kind: "internal", to: "/transfers", label: "Open transfers page" }],
      suggestions: ["Talk to a human"],
    };
  }

  // -------- Find booking
  if (
    /\b(find|lookup|look up|where is|status of)\s.*(booking|reservation|reference)/.test(input) ||
    /\bmy booking\b/.test(input)
  ) {
    return {
      text: "Pop your reference in here and I'll pull up the details.",
      actions: [{ kind: "internal", to: "/booking-lookup", label: "Open booking lookup" }],
      suggestions: ["Talk to a human"],
    };
  }

  // -------- Talk to human / WhatsApp
  if (/\b(human|real person|agent|talk|chat|message|whatsapp|wa\b|advisor|live)\b/.test(input)) {
    return {
      text: "I'll connect you to our team on WhatsApp. They reply within an hour during office hours.",
      actions: [
        {
          kind: "external",
          href: "https://api.whatsapp.com/send?phone=96896964811",
          label: "Open WhatsApp",
        },
        { kind: "tel", number: "96892830836", label: "Or call" },
      ],
      suggestions: ["Browse tours", "Plan a custom trip"],
    };
  }

  // -------- Phone / call
  if (/\b(call|phone|ring|dial|number)\b/.test(input)) {
    return {
      text: "Call us on +968 9283 0836. We answer between 7am and 10pm Oman time, every day.",
      actions: [{ kind: "tel", number: "96892830836", label: "Call now" }],
      suggestions: ["Open WhatsApp", "Browse tours"],
    };
  }

  // -------- Browse tours catch-all
  if (/\b(browse|all tours|see tours|show tours|list|catalog|catalogue)\b/.test(input)) {
    return {
      text: "Here's the whole catalog: 31 tours across day trips, overnights, and round trips.",
      actions: [{ kind: "internal", to: "/tours", label: "Browse all tours" }],
      suggestions: INITIAL_SUGGESTIONS,
    };
  }

  // -------- Thanks / bye
  if (/\b(thank|thanks|thx|cheers|bye|goodbye|see you)\b/.test(input)) {
    return {
      text: "You're welcome, safe travels and shine bright in the Sultanate. We're here on WhatsApp anytime.",
      suggestions: ["Browse tours", "Plan a custom trip"],
    };
  }

  // -------- Default fallback
  return {
    text: "I can help you find a tour, plan a custom trip, look up a booking, or connect you to our team. Pick one below or type what you're imagining.",
    suggestions: ["Browse all tours", "Plan a custom trip", "Find my booking", "Talk to a human"],
  };
}

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

export function AgentChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "init",
      role: "agent",
      ts: Date.now(),
      text: "I'm Sahar, your Sunshine Tours guide. Ask me anything about Oman, or tell me what you're imagining and I'll point you at the right tour.",
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Page-level mobile toolbars can open the assistant without needing a
  // second floating launcher on top of the content.
  useEffect(() => {
    const openFromPageToolbar = () => setOpen(true);
    window.addEventListener("sunshine:open-chat", openFromPageToolbar);
    return () => window.removeEventListener("sunshine:open-chat", openFromPageToolbar);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock background scroll while the panel is full-screen (below md), so the
  // page behind does not scroll away under the chat.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    // simulate "thinking"
    const delay = 600 + Math.random() * 700;
    window.setTimeout(() => {
      const reply = classifyIntent(trimmed);
      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        role: "agent",
        ts: Date.now(),
        ...reply,
      };
      setMessages((m) => [...m, agentMsg]);
      setTyping(false);
    }, delay);
  };

  const handleAction = (a: ActionButton) => {
    if (a.kind === "internal") {
      // TanStack Router types are too strict to satisfy from a generic ActionButton.
      // The agent's actions are authored statically in classifyIntent, so we trust
      // the values here.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigate({ to: a.to as any, params: a.params, search: a.search } as any);
      setOpen(false);
    } else if (a.kind === "external") {
      window.open(a.href, "_blank", "noopener,noreferrer");
    } else if (a.kind === "tel") {
      window.location.href = `tel:+${a.number}`;
    }
  };

  const isBookingFlow = location.pathname.startsWith("/book/");
  const isToursCatalog = location.pathname === "/tours";
  const hasMobileStickyCta = /^\/tours\/[^/]+/.test(location.pathname);

  return (
    <>
      {/* Launcher button, sits above the WhatsApp button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className={cn(
          "ring-focus fixed right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-2xl shadow-brand/40 transition-transform md:right-7 md:h-14 md:w-14",
          isToursCatalog && "hidden sm:flex",
          isBookingFlow && "hidden lg:flex lg:bottom-28",
          !isBookingFlow &&
            hasMobileStickyCta &&
            "bottom-[calc(10rem+env(safe-area-inset-bottom))] lg:bottom-28",
          !isBookingFlow &&
            !hasMobileStickyCta &&
            "bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-28",
          "hover:scale-110",
        )}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.4} />
        ) : (
          <Bot className="h-6 w-6" strokeWidth={2.2} />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Sunshine Tours assistant"
          className="animate-fade-up fixed inset-0 z-50 flex flex-col overflow-hidden border-border bg-card shadow-2xl shadow-black/30 md:inset-auto md:bottom-48 md:right-7 md:h-[min(70vh,560px)] md:w-[min(92vw,400px)] md:rounded-3xl md:border"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-br from-brand to-accent p-4 pt-[max(1rem,env(safe-area-inset-top))] text-brand-foreground md:pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold">Sahar · Sunshine Tours</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
                AI-assisted · replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="ring-focus flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-brand-foreground transition-colors hover:bg-white/25"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} onAction={handleAction} onSuggestion={send} />
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent">
                  <Sparkles className="h-3.5 w-3.5 text-brand-foreground" />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <Dot delay={0} />
                    <Dot delay={150} />
                    <Dot delay={300} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-3"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a tour, region, or date…"
                className="ring-focus flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="ring-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Demo assistant · for live booking help, tap any "Talk to a human" suggestion.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

// ----------------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------------

function MessageBubble({
  message,
  onAction,
  onSuggestion,
}: {
  message: Message;
  onAction: (a: ActionButton) => void;
  onSuggestion: (text: string) => void;
}) {
  const isAgent = message.role === "agent";
  return (
    <div className={cn("flex items-end gap-2", isAgent ? "" : "flex-row-reverse")}>
      {isAgent && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent">
          <Sparkles className="h-3.5 w-3.5 text-brand-foreground" />
        </div>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-2", isAgent ? "" : "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
            isAgent
              ? "rounded-bl-sm bg-card text-foreground"
              : "rounded-br-sm bg-brand text-brand-foreground",
          )}
        >
          {message.text}
        </div>

        {/* Action buttons (only on agent messages) */}
        {isAgent && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((a, i) => (
              <button
                key={`${a.label}-${i}`}
                type="button"
                onClick={() => onAction(a)}
                className="ring-focus group inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                {a.label}
                {a.kind === "external" ? (
                  a.href.includes("whatsapp") ? (
                    <WhatsAppIcon className="h-3 w-3 opacity-70" />
                  ) : (
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  )
                ) : a.kind === "tel" ? (
                  <MessageCircle className="h-3 w-3 opacity-70" />
                ) : (
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Suggestion chips (only on most recent agent message) */}
        {isAgent && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSuggestion(s)}
                className="ring-focus rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
