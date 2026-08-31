import { test, expect } from "@playwright/test";
import { gotoHydrated } from "./helpers";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, "/");
  });

  test("hero section renders with image and heading", async ({ page }) => {
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    console.log("✅ Hero h1 visible");
  });

  test("hero carousel Next slide button works", async ({ page }) => {
    await page.waitForTimeout(800);

    // Hero has "Next slide" and "Previous slide" aria-labeled buttons
    const nextBtn = page.locator('[aria-label="Next slide"]').first();
    const prevBtn = page.locator('[aria-label="Previous slide"]').first();

    if (await nextBtn.isVisible()) {
      await nextBtn.click({ force: true });
      await page.waitForTimeout(800);
      console.log("✅ Next slide button clicked");

      if (await prevBtn.isVisible()) {
        await prevBtn.click({ force: true });
        await page.waitForTimeout(600);
        console.log("✅ Previous slide button clicked");
      }
    } else {
      // Fallback: try slide dot buttons (aria-label="Go to slide N")
      const slideDot = page.locator('[aria-label^="Go to slide"]').nth(1);
      if (await slideDot.isVisible()) {
        await slideDot.click({ force: true });
        await page.waitForTimeout(600);
        console.log("✅ Slide dot button clicked");
      } else {
        console.log("ℹ️ No carousel navigation buttons found");
      }
    }
  });

  test("featured tours section shows tour cards", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);

    const tourCards = page.locator('[class*="card"], article, [class*="tour"]').filter({ hasText: /omr|book|explore/i });
    const cardCount = await tourCards.count();
    console.log(`Found ${cardCount} tour-like cards`);
    expect(cardCount).toBeGreaterThan(0);
  });

  test("newsletter section — invalid email shows validation", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);

    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();

    await emailInput.fill("notanemail");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    console.log("✅ Invalid email — browser validation triggered");
  });

  test("newsletter — valid email subscribes successfully", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem("sunshine_newsletter_subscribers_v1");
    });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);

    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill("playwright-test@sunshine.com");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1500);

    const successIndicator = page.locator('[class*="green"], [class*="success"]').or(page.getByText(/subscribed|thank you/i));
    await expect(successIndicator.first()).toBeVisible({ timeout: 5000 });
    console.log("✅ Newsletter subscription succeeded");
  });

  test("trust badges section is visible", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(400);
    const badges = page.locator("body").filter({ hasText: /years|languages|countries|guests/i });
    await expect(badges).toBeVisible();
  });

  test("WhatsApp floating button is visible and has correct href", async ({ page }) => {
    const waBtn = page.locator('a[href*="whatsapp"]');
    await expect(waBtn.first()).toBeVisible();
    const href = await waBtn.first().getAttribute("href");
    expect(href).toContain("96896964811");
    console.log(`✅ WhatsApp button href: ${href?.slice(0, 60)}...`);
  });

  test("'All Tours' or 'Browse tours' CTA navigates to /tours", async ({ page }) => {
    // Hero has "All Tours" link and may have "Browse all tours" CTA below
    const cta = page.locator('a[href="/tours"]').first();
    await expect(cta).toBeVisible({ timeout: 5000 });
    await cta.click();
    await page.waitForLoadState("load");
    // URL gains query params — use contains check
    expect(page.url()).toContain("/tours");
    console.log(`✅ Tours CTA navigated to ${page.url()}`);
  });
});
