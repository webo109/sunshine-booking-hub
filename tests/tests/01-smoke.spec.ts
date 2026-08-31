import { test, expect } from "@playwright/test";

test.describe("Smoke — All routes load", () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/tours", label: "Tours" },
    { path: "/tours/wadi-shab-emerald-pools", label: "Tour Detail" },
    { path: "/book/wadi-shab-emerald-pools", label: "Booking Wizard" },
    { path: "/transfers", label: "Transfers" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
    { path: "/faq", label: "FAQ" },
    { path: "/booking-lookup", label: "Booking Lookup" },
    // Operator routes render without the public navbar/footer by design —
    // see OPERATOR_ROUTES in src/routes/__root.tsx.
    { path: "/admin", label: "Admin", operator: true },
    { path: "/admin-preview", label: "Admin Preview", operator: true },
    { path: "/unsubscribe", label: "Unsubscribe" },
    { path: "/nonexistent-route-xyz", label: "404 Page" },
  ];

  for (const { path, label, operator } of routes) {
    test(`${label} (${path}) loads without crash`, async ({ page }) => {
      await page.goto(path);
      // No JS errors that break the page
      await expect(page.locator("body")).toBeVisible();
      if (operator) {
        // No site chrome here on purpose, so assert the route rendered its own
        // content instead — otherwise this test would demand a navbar the app
        // intentionally withholds.
        // .first() — /admin-preview renders its own <main> inside the root one.
        await expect(page.locator("main").first()).not.toBeEmpty();
      } else {
        // Navbar always visible (use .first() to avoid strict-mode multiple-match error)
        await expect(page.locator("nav, header").first()).toBeVisible();
      }
      console.log(`✅ ${label} — OK`);
    });
  }

  test("404 page shows 'Lost in the dunes'", async ({ page }) => {
    await page.goto("/nonexistent-route-xyz");
    await expect(page.getByText(/lost in the dunes/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
  });

  test("priceOnRequest tour redirects from /book to /tours", async ({ page }) => {
    // Find a priceOnRequest tour slug from the data — zahra-spring-blossom
    await page.goto("/book/zahra-spring-blossom");
    // Should redirect to the tour detail page
    await expect(page).toHaveURL(/\/tours\//);
  });
});
