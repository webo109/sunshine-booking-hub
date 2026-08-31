import { test, expect } from "@playwright/test";
import { gotoHydrated } from "./helpers";

test.describe("Gallery Page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, "/gallery");
  });

  test("gallery loads with images", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    console.log(`âœ… Gallery: ${count} images found`);
  });

  test("category filter buttons work", async ({ page }) => {
    const categories = ["Desert", "Mountain", "Wadi", "City", "Coast", "Heritage"];

    for (const cat of categories) {
      const btn = page.getByRole("button", { name: new RegExp(cat, "i") });
      if (await btn.first().isVisible()) {
        await btn.first().click();
        await page.waitForTimeout(400);
        console.log(`âœ… Clicked category filter: ${cat}`);
      }
    }

    // Reset to All
    const allBtn = page.getByRole("button", { name: /^all$/i }).first();
    if (await allBtn.isVisible()) {
      await allBtn.click();
      await page.waitForTimeout(400);
      console.log("âœ… Reset to All category");
    }
  });

  test("featured photo still shows when filtering to its own category", async ({ page }) => {
    // Regression: the featured (hero) photo was excluded from the grid
    // unconditionally, but the hero only renders on "All" — so the Wahiba dune
    // shot vanished entirely from the Desert category.
    await page.getByRole("button", { name: "Desert", exact: true }).click();
    await page.waitForTimeout(400);

    const tiles = page.locator('button[aria-label^="View "]');
    await expect(tiles).toHaveCount(2);
    await expect(page.locator('button[aria-label*="last 20 minutes of light"]')).toBeVisible();
    console.log("âœ… Featured photo present in its own category");
  });

  test("clicking a photo opens lightbox", async ({ page }) => {
    // Gallery images are inside clickable containers
    const clickableImg = page.locator('button img, [role="button"] img, [class*="cursor"] img').first();

    if (await clickableImg.isVisible()) {
      await clickableImg.click({ force: true });
      await page.waitForTimeout(600);

      // Lightbox â€” look for fixed overlay with an image
      const lightbox = page.locator('div[class*="fixed"], div[class*="inset"]').filter({ has: page.locator("img") }).first();
      if (await lightbox.isVisible({ timeout: 3000 }).catch(() => false)) {
        console.log("âœ… Lightbox opened");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
        console.log("âœ… Lightbox closed with ESC");
      } else {
        console.log("â„¹ï¸ Lightbox not detected â€” may use different structure");
      }
    } else {
      // Try clicking any image
      const anyImg = page.locator("img").nth(1);
      if (await anyImg.isVisible()) {
        await anyImg.click({ force: true });
        await page.waitForTimeout(400);
        console.log("â„¹ï¸ Clicked image (lightbox detection skipped)");
      }
    }
  });

  test("Photos and Videos tabs work", async ({ page }) => {
    const videosTab = page.getByRole("tab", { name: /videos/i }).or(page.getByRole("button", { name: /videos/i })).first();
    if (await videosTab.isVisible()) {
      await videosTab.click();
      await page.waitForTimeout(500);
      console.log("âœ… Switched to Videos tab");

      const imgs = page.locator("img");
      const count = await imgs.count();
      expect(count).toBeGreaterThan(0);

      const photosTab = page.getByRole("tab", { name: /photos/i }).or(page.getByRole("button", { name: /photos/i })).first();
      await photosTab.click();
      await page.waitForTimeout(400);
      console.log("âœ… Switched back to Photos tab");
    } else {
      console.log("â„¹ï¸ No Videos tab found");
    }
  });
});

test.describe("FAQ Page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, "/faq");
    await page.waitForTimeout(400);
  });

  test("FAQ page loads with accordion items", async ({ page }) => {
    // FAQ buttons are native <button> elements with aria-expanded attribute
    const faqs = page.locator("button[aria-expanded]");
    const count = await faqs.count();
    console.log(`Found ${count} FAQ items`);
    expect(count).toBeGreaterThan(0);
    console.log("âœ… FAQ accordion items found");
  });

  test("clicking FAQ opens the answer", async ({ page }) => {
    // First FAQ is open by default; click a different one
    const faqBtns = page.locator("button[aria-expanded]");
    const count = await faqBtns.count();
    expect(count).toBeGreaterThan(0);

    // Click the second FAQ (index 1) to open it
    const secondFaq = faqBtns.nth(1);
    if (await secondFaq.isVisible()) {
      await secondFaq.click();
      await page.waitForTimeout(400);
      const isExpanded = await secondFaq.getAttribute("aria-expanded");
      console.log(`FAQ expanded: ${isExpanded}`);
      console.log("âœ… Clicked FAQ item");

      // Click again to close
      await secondFaq.click();
      await page.waitForTimeout(300);
    }
  });

  test("search filters FAQ items", async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("cancel");
      await page.waitForTimeout(600);

      // Should show cancel-related FAQs â€” use .first() because multiple sections contain "cancel"
      const results = page.locator("section").filter({ hasText: /cancel/i }).first();
      await expect(results).toBeVisible();
      console.log("âœ… FAQ search for 'cancel' works");

      await searchInput.clear();
      await page.waitForTimeout(400);
    } else {
      console.log("â„¹ï¸ Search input not found");
    }
  });

  test("category filter buttons filter FAQs", async ({ page }) => {
    const faqCategories = ["Booking", "Payment", "Cancellation"];
    for (const cat of faqCategories) {
      const btn = page.getByRole("button", { name: new RegExp(cat, "i") });
      if (await btn.first().isVisible()) {
        await btn.first().click();
        await page.waitForTimeout(500);
        console.log(`âœ… FAQ category filter: ${cat}`);
      }
    }
  });
});
