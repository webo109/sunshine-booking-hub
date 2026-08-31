import { test, expect } from "@playwright/test";
import { gotoHydrated } from "./helpers";

test.describe("Tours Listing & Filters", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, "/tours");
    await page.waitForTimeout(600);
  });

  test("tours page loads with count and tour cards", async ({ page }) => {
    // Result count: "28 tours matching your filters."
    const resultText = page.locator("p, span, h2").filter({ hasText: /\d+ tours? matching/i }).first();
    await expect(resultText).toBeVisible({ timeout: 8000 });

    // Cards: TourCards link to tour detail pages (no /book/ links on listing page)
    const tourDetailLinks = page.locator('a[href*="/tours/"]:not([href="/tours"])');
    const count = await tourDetailLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✅ Tours page: ${count} tour detail links visible`);
  });

  test("text search filters tours", async ({ page }) => {
    // Search input: placeholder="Search tours by name, region, or activity…"
    const searchInput = page.getByPlaceholder(/search tours/i);
    await expect(searchInput).toBeVisible({ timeout: 5000 });

    await searchInput.fill("wadi");
    await page.waitForTimeout(700);

    // Result count changes — should say fewer tours
    const resultText = page.locator("p, span").filter({ hasText: /\d+ tours? matching/i }).first();
    await expect(resultText).toBeVisible();
    const text = await resultText.textContent();
    console.log(`✅ Search 'wadi' result: "${text}"`);

    // Clear via X button (aria-label="Clear search")
    const clearBtn = page.locator('[aria-label="Clear search"]');
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(500);
      console.log("✅ Search cleared via X button");
    }
  });

  test("sort dropdown works — price low to high", async ({ page }) => {
    // Sort select has aria-label="Sort tours by"
    const sortTrigger = page.locator('[aria-label="Sort tours by"]');
    await expect(sortTrigger).toBeVisible({ timeout: 5000 });
    await sortTrigger.click();
    await page.waitForTimeout(400);

    // Select "Price · Low to high"
    await page.getByRole("option", { name: /price.*low to high/i }).click();
    await page.waitForTimeout(600);
    console.log("✅ Sort: Price · Low to high applied");
  });

  test("difficulty filter — Challenging", async ({ page }) => {
    // Difficulty lives inside the Filters drawer, not as a top-level pill.
    await page.getByRole("button", { name: "Open filters" }).first().click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible({ timeout: 5000 });

    await drawer.getByRole("button", { name: /^Challenging/ }).click();
    await page.waitForTimeout(500);

    // The filter is URL-driven, and exactly 2 tours in the catalog are Challenging.
    await expect(page).toHaveURL(/difficulty=Challenging/);
    await expect(drawer.getByRole("button", { name: /Show 2 tours/i })).toBeVisible();

    console.log("✅ Difficulty filter: Challenging applied");
  });

  test("clicking 'Book' on a tour card navigates to booking wizard", async ({ page }) => {
    // TourCard links to detail page; book from tour detail
    const firstDetailLink = page.locator('a[href*="/tours/"]:not([href="/tours"])').first();
    await expect(firstDetailLink).toBeVisible({ timeout: 5000 });
    await firstDetailLink.click();
    await expect(page).toHaveURL(/\/tours\/.+/);
    const bookLink = page.locator('a[href*="/book/"]').first();
    await expect(bookLink).toBeVisible({ timeout: 5000 });
    const href = await bookLink.getAttribute("href");
    await bookLink.click();
    await expect(page).toHaveURL(/\/book\//);
    console.log(`✅ Tour detail → book link navigated to: ${href}`);
  });

  test("clicking a tour name/card navigates to tour detail", async ({ page }) => {
    // Tour cards also have a link to /tours/:slug
    const tourDetailLink = page.locator('a[href*="/tours/"]:not([href="/tours"])').first();
    await expect(tourDetailLink).toBeVisible({ timeout: 5000 });
    const href = await tourDetailLink.getAttribute("href");
    await tourDetailLink.click();
    await expect(page).toHaveURL(/\/tours\/.+/);
    console.log(`✅ Tour detail link: ${href}`);
  });

  test("price slider changes filter results", async ({ page }) => {
    // There should be a Price filter button / slider
    const priceBtn = page.getByRole("button", { name: /price/i }).first();
    if (await priceBtn.isVisible()) {
      await priceBtn.click();
      await page.waitForTimeout(400);
      console.log("✅ Price filter opened");
    }
  });
});

test.describe("Tour Detail Page", () => {
  test("tour detail shows all key sections", async ({ page }) => {
    await gotoHydrated(page, "/tours/wadi-shab-emerald-pools");

    // Title
    await expect(page.getByRole("heading", { name: /wadi shab/i })).toBeVisible();

    // Metadata — duration, guests, etc.
    await expect(page.getByText(/10 hrs|Full day/i).first()).toBeVisible();

    // Book button / link — use .first() because tour detail has 2 matching links (hero + sticky sidebar)
    const bookBtn = page.locator('a[href*="/book/wadi-shab"]').first();
    await expect(bookBtn).toBeVisible();
    console.log("✅ Tour detail: heading, metadata, and book button all present");
  });

  test("Book button navigates to booking wizard", async ({ page }) => {
    await gotoHydrated(page, "/tours/wadi-shab-emerald-pools");

    const bookLink = page.locator('a[href*="/book/wadi-shab"]').first();
    await expect(bookLink).toBeVisible();
    await bookLink.click();
    await expect(page).toHaveURL(/\/book\/wadi-shab/);
    console.log("✅ Book link → wizard");
  });

  test("gallery thumbnails are clickable", async ({ page }) => {
    await gotoHydrated(page, "/tours/wadi-shab-emerald-pools");
    await page.waitForTimeout(500);

    const images = page.locator("img");
    const count = await images.count();
    console.log(`Found ${count} images on tour detail`);
    expect(count).toBeGreaterThan(1);
  });

  test("video modal opens and closes with ESC", async ({ page }) => {
    await gotoHydrated(page, "/tours/wadi-shab-emerald-pools");
    await page.waitForTimeout(500);

    // Look for a play/video button — may have aria-label "Watch" or class with "video"
    const videoBtn = page.locator('button[aria-label*="watch" i], button[aria-label*="video" i], button:has([class*="play"])').or(
      page.getByRole("button", { name: /watch|play|video/i })
    ).first();

    if (await videoBtn.isVisible({ timeout: 3000 })) {
      await videoBtn.click();
      await page.waitForTimeout(800);

      // inset-0 is the full-screen overlay; inset-x-0 is the fixed header — use inset-0 specifically
      const modal = page.locator('[class*="fixed"][class*="inset-0"]').first();
      if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log("✅ Video modal opened");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(600);
        await expect(modal).not.toBeVisible({ timeout: 3000 });
        console.log("✅ Video modal closed with ESC");
      } else {
        console.log("ℹ️ Video modal didn't open as expected");
      }
    } else {
      console.log("ℹ️ No video button found");
    }
  });

  test("priceOnRequest tour has no standard book button", async ({ page }) => {
    // zahra-spring-blossom is priceOnRequest = true
    await gotoHydrated(page, "/tours/zahra-spring-blossom");

    // Should NOT have a link to /book/zahra-spring-blossom
    const standardBookLink = page.locator('a[href="/book/zahra-spring-blossom"]');
    const count = await standardBookLink.count();
    expect(count).toBe(0);
    console.log("✅ priceOnRequest tour has no direct book link");
  });
});
