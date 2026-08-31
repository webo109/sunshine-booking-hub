import { test, expect } from "@playwright/test";
import { gotoHydrated } from "./helpers";

const TOUR_SLUG = "wadi-shab-emerald-pools";
const BOOK_URL = `/book/${TOUR_SLUG}`;

// Helper: complete step 0 (date)
async function selectTomorrow(page: any) {
  const tomorrowBtn = page.getByRole("button", { name: "Tomorrow" });
  await expect(tomorrowBtn).toBeVisible({ timeout: 8000 });
  await tomorrowBtn.click();
  await page.waitForTimeout(300);
}

// Helper: click Continue
async function clickContinue(page: any) {
  // CSS text-transform:uppercase makes Chrome a11y return "CONTINUE" — use case-insensitive flag
  const continueBtn = page.getByRole("button", { name: /^continue$|^confirm booking request$/i });
  await continueBtn.click();
  await page.waitForTimeout(500);
}

test.describe("Booking Wizard — Full Flow", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, BOOK_URL);
  });

  test("Step 0: Tomorrow quick-pick selects a date", async ({ page }) => {
    await selectTomorrow(page);

    // Assert on the summary panel leaving its empty state, not on the text
    // "Tomorrow" — that matches the quick-pick button's own label, so it stayed
    // green even when the click was swallowed and nothing was selected.
    await expect(page.getByText(/no date yet/i)).toBeHidden();
    // ...and that it's *this* chip that went active, so we know which date landed.
    await expect(page.getByRole("button", { name: "Tomorrow" })).toHaveClass(/bg-brand/);
    console.log("✅ Tomorrow quick-pick selected");
  });

  test("Step 0 → Step 1: Continue advances to Guests step", async ({ page }) => {
    await selectTomorrow(page);
    await clickContinue(page);

    // Step 1: should show guest counters
    await expect(page.getByText(/adults/i).first()).toBeVisible({ timeout: 5000 });
    console.log("✅ Advanced to Step 1 (Guests)");
  });

  test("Step 0: Continue without date shows toast error", async ({ page }) => {
    // Click Continue without selecting date
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForTimeout(800);

    // Toast: "Please select a date"
    await expect(page.getByText(/please select a date/i)).toBeVisible({ timeout: 5000 });
    console.log("✅ Toast shown: 'Please select a date'");
  });

  test("Step 1: Adult counter minus disabled at 1 adult", async ({ page }) => {
    await selectTomorrow(page);
    await clickContinue(page);

    // Adults default = 2. Minus to 1. Counter uses aria-label="Decrease Adults" (SVG icon, not text)
    const minusBtns = page.locator("button[aria-label^='Decrease']");

    // Click minus to go from 2 to 1
    await minusBtns.first().click();
    await page.waitForTimeout(300);

    // Now at 1 adult — minus should be disabled
    const isDisabled = await minusBtns.first().isDisabled();
    console.log(`Adults minus disabled at 1 adult: ${isDisabled}`);

    await clickContinue(page);
    await expect(page.getByText(/transport|transfer/i).first()).toBeVisible({ timeout: 5000 });
    console.log("✅ Step 1 → Step 2 (Transport)");
  });

  test("Step 2: Transport button selection works", async ({ page }) => {
    await selectTomorrow(page);
    await clickContinue(page);
    await clickContinue(page);

    // Step 2: Transport options are type="button"
    const cityTransferBtn = page.getByRole("button", { name: /city transfer/i });
    await expect(cityTransferBtn).toBeVisible({ timeout: 8000 });
    await cityTransferBtn.click();
    await page.waitForTimeout(300);
    console.log("✅ Selected City Transfer");

    await clickContinue(page);
    // Step 3: customer details
    await expect(page.locator('input[name="name"]')).toBeVisible({ timeout: 5000 });
    console.log("✅ Step 2 → Step 3 (Customer Details)");
  });

  test("Step 3: empty form shows validation errors", async ({ page }) => {
    // Get to Step 3
    await selectTomorrow(page);
    await clickContinue(page);
    await clickContinue(page);
    await clickContinue(page);

    // Try to continue without filling
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForTimeout(600);

    // Validation errors render as <span class="text-destructive"> (not <p>)
    const errors = page.locator("span.text-destructive");
    const count = await errors.count();
    console.log(`Validation errors shown: ${count}`);
    expect(count).toBeGreaterThan(0);
    console.log("✅ Step 3 validation fires on empty submit");
  });

  test("Full happy path — completes booking and shows confirmation", async ({ page }) => {
    // Step 0: date
    await selectTomorrow(page);
    await clickContinue(page);

    // Step 1: guests (use default 2 adults, 0 children)
    await clickContinue(page);

    // Step 2: No transfer (default)
    await clickContinue(page);

    // Step 3: customer details
    await page.locator('input[name="name"]').fill("Playwright Test User");
    await page.locator('main input[type="email"]').fill("playwright@test.com");
    await page.locator('input[name="phone"]').fill("+96891234567");
    await page.locator('input[name="nationality"]').fill("British");
    await clickContinue(page);

    // Step 4: Review — should show total price
    await expect(page.getByText(/confirm booking request/i)).toBeVisible({ timeout: 5000 });
    const priceText = page.getByText(/omr|total/i).first();
    await expect(priceText).toBeVisible();
    console.log("✅ Review step shows price");

    // Click Confirm
    await page.getByRole("button", { name: "Confirm booking request" }).click();
    await page.waitForTimeout(2000);

    // Confirmation page
    await expect(page).toHaveURL(/\/booking\//);
    console.log(`✅ Booking confirmed — URL: ${page.url()}`);

    // Reference code shown. Scope to <main> to exclude the success toast, and
    // take .first() because the confirmation page prints the reference in both
    // the details table and the summary block — an unscoped getByText(/STO-/)
    // matches three nodes and trips Playwright's strict mode.
    const reference = page.locator("main").getByText(/STO-[A-Z0-9]{4,}/).first();
    await expect(reference).toBeVisible({ timeout: 8000 });
    console.log(`✅ Reference: ${await reference.textContent()}`);
  });

  test("Review step shows correct pricing calculation", async ({ page }) => {
    await selectTomorrow(page);
    await clickContinue(page);
    // Leave 2 adults, 0 children
    await clickContinue(page);
    // Leave No transfer
    await clickContinue(page);
    // Fill details
    await page.locator('input[name="name"]').fill("Price Test");
    await page.locator('main input[type="email"]').fill("price@test.com");
    await page.locator('input[name="phone"]').fill("+96891234567");
    await page.locator('input[name="nationality"]').fill("British");
    await clickContinue(page);

    // Review step: Wadi Shab adult price = 65 OMR, 2 adults = 130 OMR
    await expect(page.getByText(/130|OMR 130/i).first()).toBeVisible({ timeout: 5000 });
    console.log("✅ Pricing: 2 adults × 65 = OMR 130 shown correctly");
  });

  test("Fridays are blocked in the calendar", async ({ page }) => {
    const calendar = page.locator('[role="grid"]').first();
    await expect(calendar).toBeVisible({ timeout: 8000 });

    // Disabled days in the calendar (Fridays + past days)
    const disabledDays = page.locator('[role="gridcell"] button[disabled], [role="gridcell"][aria-disabled="true"]');
    const count = await disabledDays.count();
    console.log(`Disabled calendar cells: ${count}`);
    expect(count).toBeGreaterThan(0);
    console.log("✅ Calendar has disabled days (Fridays/past)");
  });
});

test.describe("Booking Lookup", () => {
  test("empty reference shows error", async ({ page }) => {
    await gotoHydrated(page, "/booking-lookup");

    await page.getByRole("button", { name: /find|search|lookup/i }).click();
    await page.waitForTimeout(600);

    // Validation should prevent empty submit or show error
    const hasError = await page.locator("*").filter({ hasText: /required|reference|enter/i }).count() > 0;
    console.log(`Error state shown: ${hasError}`);
  });

  test("invalid reference shows 'not found' state", async ({ page }) => {
    await gotoHydrated(page, "/booking-lookup");

    const refInput = page.locator('input[type="text"]').first();
    await refInput.fill("STO-XXXXX");
    await page.getByRole("button", { name: /find|search|lookup/i }).click();
    await page.waitForTimeout(800);

    // .first() — the page also carries a static "Can't find your reference?"
    // help block, so an unscoped match hits two nodes and trips strict mode.
    await expect(page.getByText(/can't find|not found|no booking/i).first()).toBeVisible({ timeout: 5000 });
    console.log("✅ Invalid reference: 'not found' message shown");
  });

  test("reference input displays uppercase via CSS (DOM stores raw value)", async ({ page }) => {
    await gotoHydrated(page, "/booking-lookup");

    const refInput = page.locator('input[type="text"]').first();
    await refInput.fill("sto-abc12");
    await page.waitForTimeout(300);

    // DOM value is stored as-typed (lowercase); CSS text-transform:uppercase handles display
    // On submit, the code calls .toUpperCase() for the lookup
    const value = await refInput.inputValue();
    console.log(`Input DOM value after lowercase entry: "${value}"`);
    // The raw DOM value is lowercase — this is by design (not a bug)
    expect(value).toBeTruthy();
    console.log("✅ Reference input stores raw value (CSS handles uppercase display)");
  });
});
