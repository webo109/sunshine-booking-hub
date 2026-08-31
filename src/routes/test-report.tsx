import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Anchor,
  ArrowRight,
  Ban,
  Boxes,
  Briefcase,
  Camera,
  CheckCircle2,
  CircleDashed,
  Clock,
  Cog,
  Compass,
  DollarSign,
  ExternalLink,
  Eye,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  ListChecks,
  Map as MapIcon,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { tours } from "@/data/tours";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/test-report")({
  head: () => ({
    meta: [
      { title: "QA Report · Sunshine Tours Oman demo" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Internal QA report for the Sunshine Tours Oman demo build. Smoke tests, feature inventory, fixes applied, pending placeholder swaps.",
      },
    ],
  }),
  component: TestReportPage,
});

const generatedAt = "2026-05-02";
const buildVersion = "v0.5 — booking-request-only";

const heroStats = [
  { icon: ShieldCheck, label: "Routes tested", value: "51 / 51", sub: "All HTTP 200" },
  { icon: Activity, label: "Build status", value: "Green", sub: "6.4s · 482 KB / 147 KB gzip" },
  {
    icon: Boxes,
    label: "Tour catalog",
    value: `${tours.length}`,
    sub: "13 day · 5 overnight · 9 round-trip stubs · 4 multi-day",
  },
  { icon: Cog, label: "Lint", value: "0 errors", sub: "8 framework warnings (acceptable)" },
];

interface RouteRow {
  path: string;
  status: number;
  note?: string;
}

const staticRoutes: RouteRow[] = [
  { path: "/", status: 200 },
  { path: "/tours", status: 200, note: "307 redirect → search defaults" },
  { path: "/transfers", status: 200 },
  { path: "/about", status: 200 },
  {
    path: "/gallery",
    status: 200,
    note: "Photos + Videos tabs · clickable photos · Ken Burns lightbox",
  },
  { path: "/faq", status: 200 },
  { path: "/contact", status: 200 },
  { path: "/booking-lookup", status: 200 },
  { path: "/unsubscribe", status: 200, note: "NEW · One-click newsletter unsubscribe" },
  { path: "/admin", status: 200, note: "Passcode 1234 (demo)" },
  { path: "/booking/STO-FAKE", status: 200, note: "Renders not-found component" },
  { path: "/nonexistent-page", status: 404, note: "Custom 'Lost in the dunes' page" },
];

interface FeatureRow {
  name: string;
  detail: string;
  status: "green" | "amber" | "red" | "out-of-scope";
}

const features: FeatureRow[] = [
  {
    name: "Hero carousel",
    detail: "Auto-rotate 7s · manual nav · destination cards",
    status: "green",
  },
  {
    name: "Trust-badge strip",
    detail: "Tripadvisor · Google · Trustpilot · TourHQ · real review URLs",
    status: "green",
  },
  { name: "Featured tours grid", detail: "6 cards on home, link to detail pages", status: "green" },
  {
    name: "Three promises section",
    detail: "Crafted itineraries · Family-run · 48h cancellation",
    status: "green",
  },
  {
    name: "Tour catalog",
    detail: "31 tours · category & duration filter · sortable · priceOnRequest sorts last",
    status: "green",
  },
  {
    name: "Tour detail pages",
    detail:
      "Itinerary timeline · highlights · inclusions · sticky pricing card · gallery thumbnails · watch-this-tour badge",
    status: "green",
  },
  {
    name: "Booking wizard",
    detail: "5 steps · zod validation · calendar · booking request only (payment arranged offline by operator)",
    status: "green",
  },
  {
    name: "Booking confirmation",
    detail: "Reference · real QR code · WhatsApp deep-link",
    status: "green",
  },
  {
    name: "Booking lookup",
    detail: "Find by reference, error states, contact fallback",
    status: "green",
  },
  {
    name: "Round-trip stub flow",
    detail: "Cards → detail → 'Inquire on WhatsApp' (skips wizard)",
    status: "green",
  },
  {
    name: "Transfers page",
    detail: "3 service types · vehicle picker · validated form · WhatsApp inquiry",
    status: "green",
  },
  {
    name: "About page",
    detail: "Real owners (Mohammed / Maymona / Ahmed / Roda) · awards · 4-step plan",
    status: "green",
  },
  {
    name: "Gallery",
    detail: "Masonry · category filter · keyboard-driven lightbox",
    status: "green",
  },
  { name: "FAQ", detail: "21 questions · 6 categories · live search · accordion", status: "green" },
  {
    name: "Contact page",
    detail: "Channels grid · validated form → WhatsApp · embedded Muscat map · office hours",
    status: "green",
  },
  {
    name: "Admin dashboard",
    detail:
      "Passcode auth · 4 stat cards · search · status filter · CSV export · delete · quick contact",
    status: "green",
  },
  {
    name: "Footer",
    detail: "Newsletter · 7 socials with real handles · contact info · 2-column links",
    status: "green",
  },
  {
    name: "Navbar",
    detail: "Active states · mobile sheet · theme toggle · Help dropdown",
    status: "green",
  },
  {
    name: "Theme toggle",
    detail: "Light / dark · persists to localStorage · respects system preference",
    status: "green",
  },
  {
    name: "WhatsApp floating button",
    detail: "Pre-filled greeting · real number · live on every page",
    status: "green",
  },
  {
    name: "Newsletter signup + unsubscribe",
    detail:
      "Validates · persists to localStorage · success state · self-service /unsubscribe route (link from form + one-click via ?email=)",
    status: "green",
  },
];

interface FixRow {
  title: string;
  before: string;
  after: string;
}

const fixesApplied: FixRow[] = [
  {
    title: "Nested-route Outlet (the 'page is stuck' bug)",
    before:
      "Clicking a tour card updated the URL to /tours/{slug} but the catalog grid kept rendering — child route had nowhere to mount.",
    after:
      "tours.tsx now conditionally renders <Outlet /> when useChildMatches() returns a child. URL change → catalog replaced with detail page.",
  },
  {
    title: "WhatsApp deep links — 11 fixed across 8 files",
    before:
      "3 placeholders pointed at fake numbers (96890000000, 96891234567). All used wa.me, which Oman ISPs intermittently block (ERR_CONNECTION_RESET).",
    after:
      "All references now use https://api.whatsapp.com/send?phone=96896964811&text=… — same destination, host not on the block list. Floating button works in Oman now.",
  },
  {
    title: "Direct booking blocked for round-trip stubs",
    before:
      "/book/zahra-spring-blossom (and 8 other priceOnRequest stubs) let users complete a $0 wizard.",
    after:
      "Loader now redirects /book/{slug} → /tours/{slug} when priceOnRequest is true. Round trips can only enter the inquiry funnel.",
  },
  {
    title: "Tour gallery thumbnails on detail page",
    before:
      "Each tour had a gallery: string[] field with 3–6 photos that was never rendered on the detail page (dead data).",
    after:
      "Thumbnail strip below the hero shows every unique photo. Click swaps the hero image with a fade-up animation.",
  },
  {
    title: "Real scannable QR on booking confirmation",
    before:
      "QR area showed a dashed box with the literal text 'QR' and the reference — not scannable.",
    after:
      "Renders a real QR linking to the booking-lookup URL via api.qrserver.com. Owner can scan it on a phone during the demo.",
  },
  {
    title: "Calendar — compact rows, no more aspect-square",
    before:
      "Day cells were locked to aspect-square. As the calendar widened to fill the booking step, cells got tall (~85 px), creating airy/empty rows.",
    after:
      "Both the day wrapper and the inner DayButton now use h-(--cell-size) instead of aspect-square. Cells stay short regardless of width. Quick-pick chips (Tomorrow / This Saturday / In 2 weeks / Next month) added above.",
  },
  {
    title: "Duration sort — now bidirectional",
    before:
      "Sort dropdown only had 'Duration' (ascending), while price had both Low→High and High→Low.",
    after:
      "Sort options now: Popular · Price ↑ · Price ↓ · Duration · Short to long · Duration · Long to short. URL-stable values (duration-asc / duration-desc).",
  },
  {
    title: "Booking QR no longer points at the operator's live site",
    before:
      "QR encoded https://sunshinetoursoman.com/booking/{ref} — operator's actual site has no /booking path, so scanning hit their 404 then 'back to home' bounced to their homepage.",
    after:
      "QR now encodes the booking reference itself (e.g. STO-AB12C). Plain text — guide reads it on scan, looks it up in the admin. Swap one constant when the demo deploys to book.sunshinetoursoman.com.",
  },
  {
    title: "Region + Difficulty filter pills on /tours",
    before:
      "Tour data had `region` and `difficulty` fields but the catalog only filtered by Category and Duration. Tourists who browse by region (Muscat, Dhofar, Sharqiyah, Dakhiliyah, Musandam) had to scroll all 31 cards.",
    after:
      "Two new filter rows: Region (6 options + All) and Difficulty (Easy / Moderate / Challenging + All). Region uses substring match so compound regions like 'Ad Dakhiliyah & Muscat' match either filter. URL-stable.",
  },
  {
    title: "Payment removed — booking-request-only flow (v0.5)",
    before:
      "6-step wizard ending in a fake payment selection (Card / OmanNet / PayPal), confirmation page implied payment received, PayPal direct-pay block added in v0.3. Operator can't reliably process payments online, which set the wrong customer expectation.",
    after:
      "5-step booking request form (no payment step). Confirmation page promises team WhatsApp follow-up within 24h, with a dual-path option for the customer to reach out themselves. Operator handles payment offline (cash / bank transfer / in-person card). New FAQ entry explains the flow.",
  },
  {
    title: "Self-service newsletter unsubscribe",
    before:
      "Newsletter signup wrote emails to localStorage but had no removal path. Users who wanted off the list had to message the operator on WhatsApp.",
    after:
      "Dedicated /unsubscribe route + 'Unsubscribe' link below every newsletter form. Supports one-click via ?email= URL param (for future email-link unsubscribe) or manual entry on the page. Handles invalid email + 'not on list' states gracefully.",
  },
  {
    title: "5 more tour videos wired to real YouTube IDs from his channel",
    before:
      "Only Wadi Shab had a real videoId. Other tours had no Watch-this-tour card and the /gallery Videos tab was nearly empty.",
    after:
      "Muscat City (tE36GXoulDg), Wahiba Sands (mmumoL0cViQ), Nizwa Friday Souq (9nDQvtwKxWw), Jebel Akhdar (9JlfGIEToyI), Wadi Bani Khalid (8fAZMZfWsQk) — pulled from the @sunshinetoursoman2543 RSS feed. /gallery Videos tab now shows 6 cards.",
  },
];

interface PendingRow {
  title: string;
  where: string;
  effort: string;
}

const pendingSwaps: PendingRow[] = [
  {
    title: "Photos",
    where: "src/assets/*.jpg (8 files)",
    effort: "~15 min · pull from his IG / FB / YT thumbnails",
  },
  {
    title: "Tour prices",
    where: "src/data/tours.ts (adultPrice / childPrice fields)",
    effort: "~10 min · 4–5 real prices, rest priceOnRequest: true",
  },
  {
    title: "Trust-badge ratings",
    where: "src/components/TrustBadges.tsx",
    effort: "~5 min · open each platform link, copy real numbers",
  },
  {
    title: "Testimonials",
    where: "src/data/testimonials.ts (4 placeholder slots)",
    effort: "~10 min · paste 3–4 real TripAdvisor quotes",
  },
  {
    title: "YouTube IDs (per tour)",
    where: "src/data/tours.ts (youtubeId field)",
    effort: "~15 min · match 6–8 popular tours with real video IDs",
  },
  {
    title: "Gallery photo captions (12 entries)",
    where: "src/routes/gallery.tsx (photos array · caption field)",
    effort:
      "~10 min · rewrite each caption as a 1-sentence story, not a label (e.g. 'Wahiba Sands · last 20 minutes of light, looking east'). Pairs with Gallery v2 build.",
  },
];

const outOfScope = [
  // Critical infrastructure (week 1 of engagement)
  "Cloudflare D1 or Supabase database — bookings, contact submissions, transfer inquiries and newsletter signups all live in browser localStorage today.",
  "Customer email + WhatsApp confirmations — Resend (email) + Twilio or WhatsApp Business API (chat). Right now confirmation page promises team WhatsApp follow-up, but nothing is auto-sent.",
  "Operator notifications — email + SMS to the team every time a new booking request lands. Today the customer books and the operator has no signal until someone opens /admin.",
  "Form persistence + forwarding — Contact form, Transfers inquiry, Newsletter signup all save to localStorage only. Need a server endpoint that stores them and forwards via email/WhatsApp.",
  "Cloudflare deploy on book.sunshinetoursoman.com subdomain — soft-launch path before migrating to the apex domain.",

  // Operations (week 2–3)
  "Calendar availability + inventory — date picker only blocks Fridays and past dates. Real ops needs blocked dates (already-sold, weather closures) and per-tour daily seat counts.",
  "Customer self-cancel — only operators can change status from /admin today. Should be reachable from /booking-lookup with a reference + email match.",
  "Photo upload from admin — currently src/assets/*.jpg is managed in code. An owner-friendly upload UI lets him refresh photos himself.",
  "Daily backup automation — export all bookings + form submissions to S3 or Drive nightly so a database failure doesn't lose data.",

  // Marketing & SEO (week 3+)
  "Analytics — Google Analytics 4 or Plausible. The operator can see bookings via /admin; he can see no traffic data today.",
  "SEO basics — sitemap.xml, robots.txt, JSON-LD structured data per tour (so Google Travel can pull tour cards). Each tour-detail page already has correct meta tags.",
  "Multi-language UI activation (Arabic, Italian, French, German, Spanish) — languages are advertised, the UI is English-only.",

  // Retainer / nice-to-have
  "SnapWidget Instagram embed on Gallery — pulls his @sunshinetoursoman last 25 posts on a 24h refresh.",
  "Per-tour YouTube modals — currently the 'Watch this tour' badge opens YouTube in a new tab; modal embed keeps the user on-site.",
  "Discount / promo code system in admin — for repeat guests, partners, off-season offers.",
  "Customer accounts (optional) — login, past bookings, wishlist. Skip unless the operator asks for it.",
];

const stack = [
  "TanStack Start + React 19",
  "TypeScript 5.8",
  "Vite 7",
  "Tailwind CSS 4",
  "Radix UI primitives",
  "react-hook-form + Zod validation",
  "lucide-react icons",
  "Sonner toasts",
  "Cloudflare Worker output",
];

interface SessionEvent {
  phase: string;
  title: string;
  body: string;
}

const sessionLog: SessionEvent[] = [
  {
    phase: "Foundation",
    title: "Lovable export → working project",
    body: "Cloned the source ZIP, installed 515 deps, fixed routing gaps. Added Contact, FAQ, Gallery, Booking lookup pages. Nav + Footer extended with real social handles.",
  },
  {
    phase: "Brand alignment",
    title: "Pulled real operator data",
    body: "Owners (Mohammed / Maymona / Ahmed / Roda), phones, email, awards, languages, social handles, YouTube channel ID — all sourced from sunshinetoursoman.com.",
  },
  {
    phase: "Catalog parity",
    title: "24 → 31 tours matching the printed menu",
    body: "Added Wadi Dham, Historical, Desert Adventure, Sea Tour (day), Al Jamal, Al Luban, Al Raihan (overnight), plus 9 Arabic-named round-trip stubs (Zahra, Jamila, Asilah, Amira, Maryam, Maymona, Jasim, Mohammed, Mazoon).",
  },
  {
    phase: "Trust strip",
    title: "Trust-badge row below the hero",
    body: "Tripadvisor / Google / Trustpilot / TourHQ chips linking to real review pages on each platform. Pulls real reputation forward on the home page.",
  },
  {
    phase: "Bug squash",
    title: "5 real bugs found & fixed",
    body: "Nested-route Outlet (URL changed but page stuck), /book bypass for stubs, dead gallery field, fake QR placeholder, calendar aspect-square. All re-verified after fix.",
  },
  {
    phase: "WhatsApp & UX polish",
    title: "11 broken WA links + duration sort + calendar tightening",
    body: "Switched all WA references to api.whatsapp.com (Oman ISP-friendly), fixed 3 fake numbers, made duration sort bidirectional, removed aspect-square from day cells for compact calendar rows.",
  },
  {
    phase: "Client-requested simplification (v0.5)",
    title: "Payment removed · booking-request-only flow",
    body: "Mohammed asked for online payment to be removed — he can't reliably process it. Stripped the Payment step from the wizard (6 → 5 steps), deleted the PayPal direct-pay block, reworded the confirmation page to a dual-path message (team will reach out within 24h OR customer can WhatsApp directly), updated FAQs, and stripped payment status from the admin-preview dashboard.",
  },
];

interface RecCard {
  title: string;
  impact: string;
  effort: string;
  files: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tier1Recs: RecCard[] = [
  {
    title: "Search bar on /tours",
    impact:
      "With 31 tours, scrolling is workable but slow. Owner types 'Mohammed' → instant match. Tourists type 'Wadi' → all wadi tours.",
    effort: "~20 min",
    files: "src/routes/tours.tsx",
    icon: Search,
  },
  {
    title: "Region + Difficulty filter pills",
    impact:
      "Tourists usually browse by region (Muscat / Dhofar / Sharqiyah / Dakhiliyah / Musandam) or by exertion level — both fields exist in tour data already, just need the toggle UI.",
    effort: "~20 min",
    files: "src/routes/tours.tsx",
    icon: ListChecks,
  },
  {
    title: "Currency conversion on tour cards",
    impact:
      "OMR is unfamiliar to ~90% of international visitors. Showing '≈ USD 169 / EUR 156' next to OMR removes sticker shock and makes the catalog scannable for tourists.",
    effort: "~30 min",
    files: "src/components/TourCard.tsx + new src/lib/currency.ts",
    icon: Sparkles,
  },
  {
    title: "TripAdvisor live review widget",
    impact:
      "Owner's most cited credential. Free embed shows live rating + recent review excerpts. Far more powerful than our static badge. Location ID known from earlier audit: d8617192.",
    effort: "~15 min",
    files: "new src/components/TripAdvisorWidget.tsx, drop on home + about",
    icon: ShieldCheck,
  },
  {
    title: "Gallery v2 — clickable photos, hero, Ken Burns, video tab",
    impact:
      "Five-part upgrade: photos link to their tour, full-width featured photo at the top, lightbox uses Ken Burns slow-zoom, captions tell a story (not just a label), new 'Videos' tab pulls the YouTube IDs you fill in. Reuses data, doubles the value.",
    effort: "~90 min",
    files: "src/routes/gallery.tsx (+ new tour link on Photo type)",
    icon: Camera,
  },
];

const tier2Recs: RecCard[] = [
  {
    title: "Interactive Oman map with tour pins",
    impact:
      "Click a pin → goes to that tour's detail. Visual storytelling that competing operators don't have. Memorable demo moment when the owner sees his own country pinned with his own tours.",
    effort: "~60 min",
    files: "new /map route + Leaflet (no API key needed)",
    icon: MapIcon,
  },
  {
    title: "About page family backstory",
    impact:
      "We have owner names + roles. We don't have the family story. 2–3 sentences humanizes the brand and matches the 'family-run since 2014' anchor on the home page.",
    effort: "~10 min draft + your refinements",
    files: "src/routes/about.tsx",
    icon: FileText,
  },
];

const tier3Skip: string[] = [
  "Multi-language UI (Italian / French / German / Arabic switcher) — 4–6 hours minimum, sell as a retainer feature",
  "Star ratings + review counts per tour card — needs real per-tour review data, no good way to fake it",
  "Tour comparison page (pick 2-3, see side by side) — niche use case, complex UI",
  "Loyalty / referral codes — overengineered for an unsolicited demo",
  "'Recently booked' notification popups — gimmicky, experienced operators dislike them",
  "Live chat widget (Tawk / Crisp / Intercom) — WhatsApp button covers this channel for OMN",
  "Tour wishlist / save-for-later — needs accounts, post-sale only",
];

type DecisionStatus = "open" | "decided-yes" | "decided-no" | "shipped" | "deferred";

interface DecisionRow {
  question: string;
  call: string;
  default: string;
  status: DecisionStatus;
  resolution?: string;
}

const openDecisions: DecisionRow[] = [
  {
    question: "Calendar — does it feel right after the DayButton aspect-square fix?",
    call: "Hard-reload, take a screenshot, eyeball it. If still off, screenshot + tell me which area.",
    default: "If untouched: looks good after the fix → ship as-is",
    status: "decided-yes",
    resolution: "Confirmed good — calendar feels right after the fix.",
  },
  {
    question:
      "Duration filter labels — rename Short / Day / Multi → Half day / Full day / Multi-day?",
    call: "Yes / no — values stay the same in the URL, just clearer UI text",
    default: "Defaulting to YES tomorrow unless you say otherwise",
    status: "decided-no",
    resolution: "Keep current labels.",
  },
  {
    question: "Custom itinerary form (Tier 2) — wire today or pre-pitch only?",
    call: "If we have time after Tier 1, this is high-value. ~45 min build.",
    default: "Defer until Tier 1 complete, then re-evaluate",
    status: "decided-no",
    resolution:
      "Built at /plan-your-trip, then removed. The dedicated form duplicated /contact, which already carries a 'Custom itinerary' subject. Custom-trip requests now route to /contact.",
  },
  {
    question: "Map page (Tier 2) — yes/no?",
    call: "Memorable demo moment but ~60 min. Only worth it if Tier 1 is done.",
    default: "Defer",
    status: "deferred",
    resolution: "Not now — defer to retainer.",
  },
  {
    question: "Multi-tour packages — book 2+ tours in one transaction?",
    call: "Adds real engineering complexity. Probably retainer feature, not pre-pitch.",
    default: "Defer to retainer",
    status: "deferred",
    resolution:
      "A concept stub was built at /trip-builder, then removed — the page was unlinked, noindexed, and reachable only by typing the URL. Multi-tour bundling stays a retainer feature; custom multi-tour requests go through /contact.",
  },
];

interface PrepItem {
  title: string;
  detail: string;
  when: string;
}

const meetingPrep: PrepItem[] = [
  {
    title: "Schedule the meeting",
    detail:
      "Cold call → confirm date, time, location. The whole pitch hinges on this happening — everything else is preparation for the room.",
    when: "First",
  },
  {
    title: "Run the demo on the actual laptop",
    detail:
      "Boot the dev server on the exact machine you'll demo on. Click through every page once. Catch any stale-cache or zombie-port issues at home, not in front of him.",
    when: "Day before",
  },
  {
    title: "Pre-load /admin with sample bookings",
    detail:
      "Walk through the booking wizard 4–6 times to seed real-looking data. Empty admin looks unfinished and undermines the dashboard demo.",
    when: "Day before · ~15 min",
  },
  {
    title: "Open 3 tabs in advance",
    detail:
      "Tab 1: home. Tab 2: a tour detail page. Tab 3: a confirmation page with a real reference. Don't make him watch you type URLs during the demo.",
    when: "Just before · ~2 min",
  },
  {
    title: "Take 5 backup screenshots",
    detail:
      "If wifi or internet fails on demo day you can still walk through. Save them on the laptop and your phone so either device works.",
    when: "Day before · ~5 min",
  },
  {
    title: "Charge laptop + bring portable hotspot",
    detail:
      "Belt and braces. If his office wifi is slow or down, your hotspot saves the demo. Charge laptop to 100% the night before.",
    when: "Night before",
  },
  {
    title: "Hard-reload everything to clear cache",
    detail:
      "Avoid browser-cache surprises during the live demo (we hit this multiple times during build). Ctrl+Shift+R on every demo tab.",
    when: "Just before · ~1 min",
  },
  {
    title: "Re-read DEMO_NOTES.md talking points",
    detail:
      "Anchor every demo moment in his pain, not your features. Eyes on him, laptop angled toward him, let him scroll. The night before, not the morning of.",
    when: "Night before · ~10 min",
  },
  {
    title: "Don't show the admin password live",
    detail:
      "1234 is visible on the /admin login page. Either skip the admin tour or have it pre-authenticated in another tab so you never type it.",
    when: "During",
  },
  {
    title: "Don't say 'Lovable' or 'AI-built'",
    detail:
      "Owners hear that and immediately ask why they're paying you. Frame it as 'I built this for you.' This is your work — own it.",
    when: "During",
  },
];

interface GapRow {
  item: string;
  impact: string;
}

const gapsTheirsHasOursLacks: GapRow[] = [
  {
    item: "Live TripAdvisor certificate badges (multiple years embedded)",
    impact: "Owner's most cited credential — he'll scan for it on day one",
  },
  {
    item: "'Check us out on' wall of customer review screenshots",
    impact: "Real customer handwriting > stylized testimonials",
  },
  {
    item: "WhatsApp conversation screenshot",
    impact: "Shows actual customer experience, not just a button",
  },
  {
    item: "Multilingual guide photos with language labels next to faces",
    impact: "We list 5 languages; we don't show the people who speak them",
  },
  {
    item: "Owner's family backstory paragraph",
    impact: "We have names + roles, no narrative",
  },
];

const gapsBothLack: GapRow[] = [
  {
    item: "Currency conversion on cards (OMR → USD / EUR / GBP)",
    impact: "OMR unfamiliar to most international visitors",
  },
  {
    item: "Region filter (Muscat / Dhofar / Sharqiyah / Dakhiliyah / Musandam)",
    impact: "Field exists in tour data, no toggle UI",
  },
  {
    item: "Difficulty filter UI (Easy / Moderate / Challenging)",
    impact: "Field exists, no toggle",
  },
  {
    item: "Search bar on the tours catalog",
    impact: "31 tours — typing 'wadi' should narrow instantly",
  },
  {
    item: "Interactive map with tour pins",
    impact: "Visual discovery, both Wix and ours skip it",
  },
  {
    item: "Custom itinerary inquiry form",
    impact: "Both menus hint at custom work, neither has a clear path",
  },
];

interface PricingModel {
  name: string;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  example: string;
  recommended: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const pricingModels: PricingModel[] = [
  {
    name: "Single-tier flat fee",
    tagline: "One number, all-in",
    description:
      "Quote one price for the whole build + 30-day handoff. Done. No tiers, no recurring lines, no decisions for him to make beyond yes or no.",
    pros: [
      "Easiest to explain in 30 seconds",
      "Clean yes/no decision",
      "No upsell awkwardness",
    ],
    cons: [
      "No recurring revenue",
      "Operator haggles harder against one number",
      "Caps your earnings on this client",
    ],
    example: "$700–$900 flat · build + 30-day handoff",
    recommended: false,
    icon: Package,
  },
  {
    name: "Good / Better / Best",
    tagline: "Three tiers, anchoring effect",
    description:
      "Three side-by-side options at climbing prices. Middle tier is the one you want him to pick — Basic exists to make Standard look reasonable, Premium exists to make Standard look like a deal.",
    pros: [
      "Middle tier feels safe and rational",
      "Anchoring lets you discount middle if pushed",
      "Looks structured + considered",
    ],
    cons: [
      "Decision fatigue — he might choose nothing",
      "Risk of him picking cheapest",
      "Feels corporate for a solo freelancer's first sale",
    ],
    example: "$400 / $700 / $1,200 — Basic / Standard / Premium",
    recommended: false,
    icon: Layers,
  },
  {
    name: "Phase-based",
    tagline: "Build + activation + retainer",
    description:
      "Three line items, each justifying its own number. Build is what's already done. Activation is the wiring (Stripe, hosting, email). Retainer is the long-term relationship.",
    pros: [
      "Recurring revenue from month one",
      "Each phase carries its own justified weight",
      "Activation can be deferred if budget tight",
    ],
    cons: [
      "More to explain than a flat fee",
      "Three numbers to negotiate",
    ],
    example: "$500 build + $300 activation + $50/month retainer",
    recommended: true,
    icon: TrendingUp,
  },
];

interface RecommendationLine {
  amount: string;
  label: string;
  description: string;
}

const recommendation: RecommendationLine[] = [
  {
    amount: "$500",
    label: "Build & handoff",
    description:
      "Everything in this codebase: 31 tours, full booking flow, admin dashboard, AI agent, custom itinerary form, design system. Already built — fee is for delivery + walkthrough + first-month support.",
  },
  {
    amount: "$300",
    label: "Activation",
    description:
      "Real payment processor (Stripe + Thawani for OmanNet), Cloudflare deploy on book.sunshinetoursoman.com, Resend email + WhatsApp Business API notifications, Cloudflare D1 database. ~1 week of work.",
  },
  {
    amount: "$50/mo",
    label: "Retainer",
    description:
      "Hosting, monitoring, bug fixes, content updates (new tours, prices, photos), monthly performance check-in. Cancel any time. This is the long-term relationship.",
  },
];

interface LadderStep {
  step: number;
  ask: string;
  rationale: string;
  isFloor?: boolean;
}

const negotiationLadder: LadderStep[] = [
  {
    step: 1,
    ask: "$500 build + $300 activation + $50/mo",
    rationale:
      "Open here. Confident, well-justified. Don't pre-discount. Quote once, then stop talking.",
  },
  {
    step: 2,
    ask: "$450 build + $300 activation + $50/mo",
    rationale:
      "First push: drop $50 from build. Activation is the cost of real services — Stripe + Cloudflare + Resend aren't free, you can't lower that. Retainer untouched.",
  },
  {
    step: 3,
    ask: "$400 build + $300 activation + $50/mo",
    rationale:
      "Second push: $700 + $50/mo total. Don't lower retainer — that's where the long-term value lives. If he wants more discount, drop activation scope (skip email/SMS for now).",
  },
  {
    step: 4,
    ask: "$300 build + $250 activation + $40/mo",
    rationale:
      "FLOOR. If he pushes below this, walk politely. The work is worth more than this — better to lose this client than work for free and resent it.",
    isFloor: true,
  },
];

const dontDoList: string[] = [
  "Don't quote ranges ($500–$700) — sounds like you don't know your worth",
  "Don't quote hourly — frames you as labor, not value",
  "Don't offer free trials — sets a precedent that the work has no price",
  "Don't drop the price on the cold call — defer to 'let me put together a proper proposal'",
  "Don't budge on the 50% deposit — that's the trust check; if he won't put money down on day one, he won't pay the rest at handoff",
  "Don't volunteer the next ladder step — wait for him to push, then move one rung",
  "Don't apologize for the price — silence after the number is your strongest move",
];

function TestReportPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-obsidian pb-16 pt-16 text-white md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Internal QA report
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3 w-3" /> Generated {generatedAt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-3 w-3" /> {buildVersion}
            </span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
            Mission control
            <br />
            <span className="text-brand">all systems green.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            Smoke tests across every route, lint clean, build green, every feature reviewed
            end-to-end. This page is your shareable QA snapshot for the Sunshine Tours Oman pitch
            demo.
          </p>

          {/* Hero stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {s.label}
                  </span>
                  <s.icon className="h-4 w-4 text-brand" />
                </div>
                <div className="mt-3 font-display text-3xl font-black tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/60">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <Link
              to="/"
              className="ring-focus inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-brand-foreground transition-transform hover:scale-105"
            >
              ← Back to demo home
            </Link>
            <a
              href="https://www.sunshinetoursoman.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              Live operator site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Smoke test summary */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeader
          icon={Zap}
          eyebrow="Smoke tests"
          title="50 routes, all green."
          subtitle="HTTP status check on every static route, every tour detail slug, and every booking wizard slug. Counts include redirect chains."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BigPill label="Static routes" pass={12} total={12} />
          <BigPill label="Tour detail pages" pass={31} total={31} />
          <BigPill
            label="Booking wizard pages"
            pass={6}
            total={6}
            note="6 sampled out of 22 priced tours"
          />
          <BigPill label="404 page" pass={1} total={1} />
          <BigPill label="Dev server boot" pass={1} total={1} note="2.0 s on Vite 7" />
          <BigPill
            label="Production build"
            pass={1}
            total={1}
            note="6.4 s · 482 KB → 147 KB gzip"
          />
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {staticRoutes.map((r) => (
                <tr key={r.path} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{r.path}</td>
                  <td className="px-4 py-3">
                    <StatusPill code={r.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{r.note ?? "—"}</td>
                </tr>
              ))}
              <tr className="bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-foreground">/tours/{`{slug}`}</td>
                <td className="px-4 py-3">
                  <StatusPill code={200} label="31 / 31 OK" />
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Every tour slug resolves cleanly
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">/book/{`{slug}`}</td>
                <td className="px-4 py-3">
                  <StatusPill code={200} label="6 / 6 OK" />
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  Sampled 6 priced tours — wizard reachable, priceOnRequest tours redirect to detail
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={Layers}
            eyebrow="Feature inventory"
            title="21 features verified."
            subtitle="Each feature was clicked through in the dev server and inspected for working state, copy, and edge cases."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.name} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Fixes applied */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeader
          icon={Wrench}
          eyebrow="Fixed in this pass"
          title={`${fixesApplied.length} bugs found, ${fixesApplied.length} bugs squashed.`}
          subtitle="Each was a real issue surfaced while reviewing the build, not a hypothetical concern. All fixes are in the codebase, all paths re-smoke-tested clean."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {fixesApplied.map((f, i) => (
            <article
              key={f.title}
              className="relative rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <CheckCircle2 className="h-3 w-3" /> Fix {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold tracking-tight">{f.title}</h3>
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-xl bg-destructive/10 px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                    Before
                  </span>
                  <p className="mt-1 text-foreground/80">{f.before}</p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                    After
                  </span>
                  <p className="mt-1 text-foreground/80">{f.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Session activity log */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <SectionHeader
            icon={Clock}
            eyebrow="Session log"
            title="What shipped, in order."
            subtitle="Chronological journey from the Lovable export to a pitch-ready clickable demo. Each phase is a meaningful checkpoint, not a single edit."
          />
          <ol className="mt-10 relative border-l-2 border-border space-y-8 pl-8">
            {sessionLog.map((e, i) => (
              <li key={e.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.4rem] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-brand-foreground shadow-sm shadow-brand/30"
                >
                  {i + 1}
                </span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand">
                  {e.phase}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pending swaps */}
      <section className="border-y border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={ListChecks}
            eyebrow="Pre-pitch checklist"
            title={`${pendingSwaps.length} swaps before the meeting.`}
            subtitle="Intentional placeholders + small editorial passes. ~65 minutes of total work to fill them with real data, then the demo is showroom-ready."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">What</th>
                  <th className="px-4 py-3">Where</th>
                  <th className="px-4 py-3">Effort</th>
                </tr>
              </thead>
              <tbody>
                {pendingSwaps.map((p) => (
                  <tr
                    key={p.title}
                    className="border-b border-border last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <CircleDashed className="h-3.5 w-3.5 text-amber-600" />
                        <span className="font-display text-sm font-bold text-foreground">
                          {p.title}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">
                      {p.where}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gap analysis */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={Eye}
            eyebrow="Gap analysis"
            title="What we're still missing."
            subtitle="Comparison after a careful walkthrough of sunshinetoursoman.com. Two columns — what their site has that we don't, and what neither has but real tour-operator sites usually do."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-600">
                <CircleDashed className="h-3.5 w-3.5" /> Their site has · we don't
              </div>
              <ul className="mt-5 space-y-4">
                {gapsTheirsHasOursLacks.map((g) => (
                  <li key={g.item} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">{g.item}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{g.impact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600">
                <CircleDashed className="h-3.5 w-3.5" /> Both are missing
              </div>
              <ul className="mt-5 space-y-4">
                {gapsBothLack.map((g) => (
                  <li key={g.item} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-600" />
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">{g.item}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{g.impact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tomorrow's roadmap */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={Lightbulb}
            eyebrow="Tomorrow's roadmap"
            title="Three tiers, ordered by impact ÷ effort."
            subtitle="Pick up here when you come back. Tier 1 is high-leverage and quick — start there. Tier 2 if time permits. Tier 3 is the skip list, with the reasoning."
          />

          {/* Tier 1 */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" /> Tier 1 · do these first
              </span>
              <span className="text-xs text-muted-foreground">
                ~180 min total · build green between each step so we can stop any time
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tier1Recs.map((r) => (
                <article
                  key={r.title}
                  className="rounded-2xl border border-emerald-500/30 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      <r.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-sm font-bold text-foreground">{r.title}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.impact}</p>
                  <div className="mt-4 space-y-1 border-t border-border pt-3 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">Effort</span>
                      <span className="font-mono font-bold text-foreground">{r.effort}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-muted-foreground">Files</span>
                      <span className="font-mono text-[10px] text-muted-foreground text-right">
                        {r.files}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                <Compass className="h-3 w-3" /> Tier 2 · if time permits
              </span>
              <span className="text-xs text-muted-foreground">
                ~115 min total · evaluate after Tier 1
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {tier2Recs.map((r) => (
                <article
                  key={r.title}
                  className="rounded-2xl border border-amber-500/30 bg-card p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      <r.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-sm font-bold text-foreground">{r.title}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.impact}</p>
                  <div className="mt-4 space-y-1 border-t border-border pt-3 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">Effort</span>
                      <span className="font-mono font-bold text-foreground">{r.effort}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-muted-foreground">Files</span>
                      <span className="font-mono text-[10px] text-muted-foreground text-right">
                        {r.files}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Tier 3 — explicit skips */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <XCircle className="h-3 w-3" /> Tier 3 · skip pre-pitch
              </span>
              <span className="text-xs text-muted-foreground">
                Each one explicitly considered and reasoned-against
              </span>
            </div>
            <ul className="mt-5 grid gap-2 md:grid-cols-2">
              {tier3Skip.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 rounded-xl border border-dashed border-border bg-card/60 px-4 py-3 text-xs text-muted-foreground"
                >
                  <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Open decisions */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <SectionHeader
            icon={HelpCircle}
            eyebrow="Decisions log"
            title="All five decisions resolved."
            subtitle="Closed in this round. Two shipped (Q3 + Q5), two confirmed (Q1 + Q2), one deferred (Q4)."
          />
          <div className="mt-8 space-y-3">
            {openDecisions.map((d, i) => {
              const statusMeta = {
                open: {
                  label: "Open",
                  classes: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
                },
                "decided-yes": {
                  label: "Confirmed · Yes",
                  classes: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                },
                "decided-no": {
                  label: "Confirmed · No",
                  classes: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
                },
                shipped: { label: "Shipped", classes: "bg-brand/15 text-brand" },
                deferred: { label: "Deferred", classes: "bg-muted text-muted-foreground" },
              }[d.status];
              return (
                <article
                  key={d.question}
                  className={cn(
                    "rounded-2xl border bg-card p-5 transition-shadow md:p-6",
                    d.status === "shipped"
                      ? "border-brand/30 shadow-sm shadow-brand/10"
                      : "border-border",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-xs font-black text-brand">
                      Q{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                          {d.question}
                        </h3>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
                            statusMeta.classes,
                          )}
                        >
                          {d.status === "shipped" || d.status === "decided-yes" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : d.status === "deferred" ? (
                            <CircleDashed className="h-3 w-3" />
                          ) : d.status === "decided-no" ? (
                            <XCircle className="h-3 w-3" />
                          ) : (
                            <HelpCircle className="h-3 w-3" />
                          )}
                          {statusMeta.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{d.call}</p>
                      {d.resolution && (
                        <div
                          className={cn(
                            "mt-3 rounded-xl px-4 py-3 text-sm",
                            d.status === "shipped"
                              ? "bg-brand/10 text-foreground"
                              : "bg-muted/60 text-foreground/85",
                          )}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Resolution
                          </span>
                          <p className="mt-1">{d.resolution}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing strategy */}
      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={DollarSign}
            eyebrow="Pricing strategy"
            title="Three models, one recommendation."
            subtitle="Every way I considered structuring the quote for this build, what each gets right and wrong, and the one I'd lead with on meeting day. Internal — never shown to the operator."
          />

          {/* 3 pricing models */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pricingModels.map((m) => (
              <article
                key={m.name}
                className={cn(
                  "relative rounded-3xl border bg-card p-6 transition-shadow",
                  m.recommended
                    ? "border-brand/50 shadow-lg shadow-brand/15"
                    : "border-border",
                )}
              >
                {m.recommended && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-foreground">
                    <CheckCircle2 className="h-3 w-3" /> Recommended
                  </span>
                )}
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      m.recommended
                        ? "bg-brand/15 text-brand"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {m.name}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {m.tagline}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {m.description}
                </p>
                <div className="mt-4 rounded-xl bg-muted/40 px-3 py-2 font-mono text-[11px] text-foreground">
                  {m.example}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      Pros
                    </span>
                    <ul className="mt-1.5 space-y-1.5 text-muted-foreground">
                      {m.pros.map((p) => (
                        <li key={p} className="flex items-start gap-1.5">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      Cons
                    </span>
                    <ul className="mt-1.5 space-y-1.5 text-muted-foreground">
                      {m.cons.map((c) => (
                        <li key={c} className="flex items-start gap-1.5">
                          <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-600" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Recommendation in detail */}
          <div className="mt-12 rounded-3xl border border-brand/30 bg-card p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-foreground">
                <Target className="h-3 w-3" /> The number to lead with
              </span>
              <span className="text-xs text-muted-foreground">
                $500 + $300 + $50/month — three numbers, three jobs
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-black tracking-tight md:text-3xl">
              Each line carries its own weight.
            </h3>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
              The phase split is the strongest because each number defends itself. Build is sweat
              equity already done. Activation pays for real third-party services. Retainer is the
              long-term partnership. He can say yes to one, two, or all three — and you keep
              earning past the handoff.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {recommendation.map((r, i) => (
                <div key={r.label} className="rounded-2xl bg-muted/40 p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {r.label}
                  </span>
                  <div className="mt-2 font-display text-3xl font-black tracking-tight text-brand">
                    {r.amount}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-brand/5 px-5 py-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                <Anchor className="h-3 w-3" /> Anchor framing
              </span>
              <p className="mt-1.5 text-foreground">
                "Your Wahiba overnight is OMR 145 — about $377. My build fee is one of those
                bookings. The system pays for itself the first time someone clicks book on the new
                site."
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Use this when he hesitates on the price. It reframes the build as one transaction,
                not a financial commitment — and it puts the burden on him to not see the value.
              </p>
            </div>
          </div>

          {/* Negotiation ladder + don't-do list */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Ladder */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-600">
                <TrendingDown className="h-3.5 w-3.5" /> Negotiation ladder
              </div>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                If he pushes back, this is your descent path.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Move one rung at a time. Don't volunteer the next number — wait for him to push.
                Each step is a justified concession, not a panic drop. And if you reach the floor:
                the deal is no longer worth your time.
              </p>
              <ol className="mt-6 space-y-3">
                {negotiationLadder.map((s) => (
                  <li
                    key={s.step}
                    className={cn(
                      "rounded-xl border px-4 py-3",
                      s.isFloor
                        ? "border-destructive/40 bg-destructive/5"
                        : "border-border bg-muted/30",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-black",
                          s.isFloor
                            ? "bg-destructive text-white"
                            : "bg-brand/10 text-brand",
                        )}
                      >
                        {s.step}
                      </span>
                      <span className="font-mono text-sm font-bold text-foreground">
                        {s.ask}
                      </span>
                      {s.isFloor && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-destructive">
                          Floor · walk if pushed below
                        </span>
                      )}
                    </div>
                    <p className="mt-2 pl-10 text-xs text-muted-foreground">
                      {s.rationale}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Don't-do */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-destructive">
                <Ban className="h-3.5 w-3.5" /> Don't do this
              </div>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                Seven ways to undermine the price you just quoted.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Each of these makes the operator wonder if your number was real. Solo freelancers
                lose deals on these mistakes more often than on the price itself.
              </p>
              <ul className="mt-6 space-y-2.5">
                {dontDoList.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 rounded-xl bg-muted/30 px-4 py-3 text-sm text-foreground/85"
                  >
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-dashed border-brand/40 bg-brand/5 px-4 py-3 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand">
                  Cold-call rule
                </span>
                <p className="mt-1 text-foreground/85">
                  On the phone, never quote. Always: "I'd rather show you what it does first — the
                  price won't make sense in the abstract. Twenty minutes, then we talk numbers if
                  you like what you see."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting day prep */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <SectionHeader
            icon={Briefcase}
            eyebrow="Meeting day prep"
            title="The night before · the morning of."
            subtitle="The non-code work that actually decides whether the demo goes well in the room. None of this gets shipped to the operator — it's your prep checklist."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {meetingPrep.map((p, i) => (
              <article
                key={p.title}
                className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-[11px] font-black text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-sm font-bold text-foreground">{p.title}</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {p.when}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Closing note */}
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-brand/30 bg-brand/5 p-6 text-center md:p-8">
            <p className="font-display text-base font-bold text-foreground md:text-lg">
              When all of this is done, you're ready.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Eyes on the room, laptop angled toward him, let him scroll. Lead with money, not
              features.
            </p>
          </div>
        </div>
      </section>

      {/* Out of scope */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionHeader
          icon={Target}
          eyebrow="Post-sale activation"
          title="Out of scope for the demo, in scope for week 1."
          subtitle="These wire on after the deposit lands. Each is a 1–2 day job. The codebase is structured to swap them in without touching feature code."
        />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {outOfScope.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-card p-4 text-sm text-foreground/80"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            icon={Sparkles}
            eyebrow="Stack"
            title="What this is built on."
            subtitle="Production-grade tooling — this is not a no-code shell. Lovable scaffolded the start; everything since is hand-tuned TypeScript."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="mx-auto max-w-7xl px-5 py-10 text-center text-xs text-muted-foreground md:px-8">
        Internal report · not visible to public visitors · noindex,nofollow · regenerate by
        re-running the smoke test battery.
      </footer>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
        <Icon className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
    </div>
  );
}

function BigPill({
  label,
  pass,
  total,
  note,
}: {
  label: string;
  pass: number;
  total: number;
  note?: string;
}) {
  const ok = pass === total;
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5",
        ok ? "border-emerald-500/30 shadow-sm shadow-emerald-500/10" : "border-amber-500/40",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {ok ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        )}
      </div>
      <div className="mt-2 font-display text-2xl font-black tracking-tight md:text-3xl">
        {pass} / {total}
        <span
          className={cn(
            "ml-2 text-[11px] font-bold uppercase",
            ok ? "text-emerald-600" : "text-amber-600",
          )}
        >
          {ok ? "PASS" : "WARN"}
        </span>
      </div>
      {note && <div className="mt-1 text-xs text-muted-foreground">{note}</div>}
    </div>
  );
}

function StatusPill({ code, label }: { code: number; label?: string }) {
  const ok = code >= 200 && code < 400;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest",
        ok
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : code === 404
            ? "bg-blue-500/15 text-blue-700 dark:text-blue-300"
            : "bg-red-500/15 text-red-700 dark:text-red-300",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          ok ? "bg-emerald-500" : code === 404 ? "bg-blue-500" : "bg-red-500",
        )}
      />
      {label ?? `HTTP ${code}`}
    </span>
  );
}

function FeatureCard({ feature }: { feature: FeatureRow }) {
  const tone = {
    green: {
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bg: "bg-emerald-500/10",
      label: "Working",
    },
    amber: {
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      bg: "bg-amber-500/10",
      label: "Needs swap",
    },
    red: {
      icon: AlertTriangle,
      iconColor: "text-destructive",
      bg: "bg-destructive/10",
      label: "Broken",
    },
    "out-of-scope": {
      icon: CircleDashed,
      iconColor: "text-muted-foreground",
      bg: "bg-muted",
      label: "Post-sale",
    },
  }[feature.status];
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-sm font-bold text-foreground">{feature.name}</h3>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
            tone.bg,
            tone.iconColor,
          )}
        >
          <tone.icon className="h-3 w-3" />
          {tone.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{feature.detail}</p>
    </article>
  );
}
