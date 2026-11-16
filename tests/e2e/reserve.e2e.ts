import { expect, test } from "./fixtures";
import { validReservation } from "./data/reservation";

test.describe("Reserve a space", () => {
  test("submits a complete reservation request", { tag: "@smoke" }, async ({ reservePage }) => {
    await reservePage.goto();
    await expect(reservePage.heading).toBeVisible();

    // The page is server-rendered, so input typed before React hydrates can be lost.
    // Re-fill until Submit enables, which happens only once React holds every field
    // in state and the existing reservations have loaded.
    await expect(async () => {
      await reservePage.fill(validReservation);
      await expect(reservePage.submitButton).toBeEnabled({ timeout: 2_000 });
    }).toPass({ timeout: 15_000 });

    await reservePage.submit();
    await expect(reservePage.successHeading).toBeVisible();
  });
});
