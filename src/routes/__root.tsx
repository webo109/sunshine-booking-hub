import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AgentChat } from "@/components/AgentChat";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Lost in the dunes</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has wandered off the map.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-transform hover:scale-105"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sunshine Tours Oman | Private Guided Adventures" },
      {
        name: "description",
        content:
          "Discover Oman with private guided tours through wadis, deserts, mountains and coastlines. Book trusted small-group adventures in OMR.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "author", content: "Sunshine Tours Oman" },
      { property: "og:title", content: "Sunshine Tours Oman | Private Guided Adventures" },
      {
        property: "og:description",
        content: "Private guided journeys through the Sultanate of Oman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Operator-facing surfaces. These render standalone: the public navbar,
 * marketing footer, "Book Now" CTA and customer WhatsApp/chat widgets all
 * belong to the visitor site and are noise (or actively confusing) on a
 * staff dashboard.
 */
const OPERATOR_ROUTES = ["/admin", "/admin-preview"];

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOperator = OPERATOR_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        {!isOperator && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isOperator && (
          <>
            <Footer />
            <WhatsAppButton />
            <AgentChat />
          </>
        )}
        <Toaster richColors position="top-center" />
      </div>
    </ThemeProvider>
  );
}
