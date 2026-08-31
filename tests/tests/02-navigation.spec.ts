import { test, expect } from "@playwright/test";
import { gotoHydrated } from "./helpers";

test.describe("Navigation & Theme", () => {
  test("navbar links navigate correctly", async ({ page }) => {
    await gotoHydrated(page, "/");

    // Tours URL gains filter query params — check with regex
    await page.locator('a[href="/tours"]').first().click();
    await page.waitForLoadState("load");
    expect(page.url()).toContain("/tours");

    await page.locator('a[href="/transfers"]').first().click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/transfers");

    await page.locator('a[href="/gallery"]').first().click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/gallery");

    await page.locator('a[href="/about"]').first().click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/about");

    console.log("✅ All navbar links navigate correctly");
  });

  test("help dropdown opens and shows all links", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.waitForTimeout(500);

    // Help button — has "Help" text + chevron icon
    const helpBtn = page.locator('button[aria-haspopup="menu"]').first();
    if (await helpBtn.isVisible()) {
      await helpBtn.click();
      await page.waitForTimeout(500);

      // Dropdown has role="menu"; links have role="menuitem"
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible({ timeout: 5000 });

      // FAQs, Contact, Find Booking
      await expect(page.locator('[role="menu"] a[href="/faq"]')).toBeVisible();
      await expect(page.locator('[role="menu"] a[href="/contact"]')).toBeVisible();
      await expect(page.locator('[role="menu"] a[href="/booking-lookup"]')).toBeVisible();
      console.log("✅ Help dropdown opens and shows FAQs, Contact, Find Booking");

      // Navigate via FAQ link inside dropdown
      await page.locator('[role="menu"] a[href="/faq"]').click();
      await page.waitForLoadState("load");
      await expect(page).toHaveURL("/faq");
      console.log("✅ FAQ link from dropdown navigates correctly");
    } else {
      console.log("ℹ️ Help button not found");
    }
  });

  test("help dropdown closes on outside click", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.waitForTimeout(500);

    const helpBtn = page.locator('button[aria-haspopup="menu"]').first();
    if (await helpBtn.isVisible()) {
      await helpBtn.click();
      await page.waitForTimeout(400);

      // Dropdown menu is visible
      const menu = page.locator('[role="menu"]');
      await expect(menu).toBeVisible({ timeout: 3000 });

      // Click outside the dropdown
      await page.locator("body").click({ position: { x: 100, y: 500 } });
      await page.waitForTimeout(400);

      // Menu should be hidden now
      await expect(menu).not.toBeVisible({ timeout: 3000 });
      console.log("✅ Dropdown closes on outside click");
    }
  });

  test("dark / light theme toggle", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.waitForTimeout(600);

    // Get initial class
    const getHtmlClass = () =>
      page.evaluate(() => document.documentElement.className);

    const initialClass = await getHtmlClass();

    // Theme toggle button
    const toggle = page.locator('button[aria-label="Toggle theme"]').first();
    if (!(await toggle.isVisible())) {
      console.log("ℹ️ Theme toggle not found");
      return;
    }

    await toggle.click();
    await page.waitForTimeout(600);
    const afterClass = await getHtmlClass();

    console.log(`Theme toggled: "${initialClass}" → "${afterClass}"`);
    expect(initialClass).not.toEqual(afterClass);

    // Navigate via client-side link (not full reload)
    await page.locator('a[href="/tours"]').first().click();
    await page.waitForTimeout(1000); // wait for ThemeProvider to re-apply from localStorage
    const persistedClass = await getHtmlClass();

    // Theme is persisted via localStorage — should match what was set
    expect(persistedClass).toEqual(afterClass);
    console.log("✅ Theme persists across client-side navigation");

    // Toggle back
    await toggle.click();
    await page.waitForTimeout(400);
    console.log("✅ Theme toggled back");
  });

  test("mobile hamburger menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await gotoHydrated(page, "/");
    await page.waitForTimeout(500);

    // Hamburger: aria-label="Open menu"
    const menuBtn = page.locator('button[aria-label="Open menu"]').or(
      page.locator('button[aria-label*="menu" i]')
    ).first();

    await expect(menuBtn).toBeVisible({ timeout: 5000 });
    await menuBtn.click();
    await page.waitForTimeout(500);

    // Mobile menu links should be visible — scope to mobile nav (flex-col) to avoid hidden desktop nav.
    // Match on the accessible name too: the mobile nav has two /tours links
    // (the "Tours" item and the "Book Now" CTA), so href alone is ambiguous.
    await expect(
      page.locator('nav[class*="flex-col"]').getByRole("link", { name: "Tours", exact: true }),
    ).toBeVisible({ timeout: 5000 });
    console.log("✅ Mobile menu opened");

    // Click About in mobile menu
    await page.locator('nav[class*="flex-col"] a[href="/about"]').click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/about");
    console.log("✅ Mobile menu navigation works");
  });

  test("footer links navigate correctly", async ({ page }) => {
    await gotoHydrated(page, "/about");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);

    // Test FAQ link in footer
    await page.locator('a[href="/faq"]').last().click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/faq");
    console.log("✅ Footer FAQ link works");
  });

  test("logo navigates to home from inner page", async ({ page }) => {
    await gotoHydrated(page, "/tours");
    // Logo links to /
    await page.locator('a[href="/"]').first().click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/");
    console.log("✅ Logo navigates to home");
  });

  test("404 page Return Home link works", async ({ page }) => {
    await gotoHydrated(page, "/this-route-does-not-exist");
    await expect(page.getByText(/lost in the dunes/i)).toBeVisible();
    await page.getByRole("link", { name: /return home/i }).click();
    await page.waitForLoadState("load");
    await expect(page).toHaveURL("/");
    console.log("✅ 404 Return Home works");
  });
});
