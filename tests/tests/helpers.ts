import type { Page } from "@playwright/test";

/**
 * The site is server-rendered (TanStack Start), so the markup — buttons included —
 * is painted and clickable roughly 700ms before React attaches its event handlers.
 * A click that lands in that window hits inert HTML and is silently swallowed:
 * no error, no state change, and the test only fails later at an assertion that
 * looks unrelated. That was the cause of the booking-wizard failures.
 *
 * `waitForLoadState("load")` does not close that window — it fires while the
 * client bundle is still evaluating.
 *
 * ThemeProvider writes `sunshine_theme` to localStorage from a mount effect
 * (src/components/ThemeProvider.tsx), and effects only run on the client after
 * hydration. So the presence of that key is a reliable "this page is interactive
 * now" signal that costs nothing and touches no React internals.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(() => window.localStorage.getItem("sunshine_theme") !== null, null, {
    timeout: 15_000,
  });
}

/**
 * Navigate and don't hand back control until the page can actually respond to
 * input. Clears localStorage via an init script — i.e. before app code runs —
 * so the app boots from a clean slate. Clearing after load (the previous
 * approach) let the app boot against leftover state and only wiped it afterwards.
 *
 * Note this only re-runs on real document navigations, so a client-side route
 * change (e.g. the wizard navigating to the confirmation page) keeps whatever
 * the app just saved.
 */
export async function gotoHydrated(page: Page, url: string) {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(url);
  await page.waitForLoadState("load");
  await waitForHydration(page);
}
