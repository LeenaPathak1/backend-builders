import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright end-to-end tests. See https://playwright.dev/docs/test-configuration.
 *
 * Specs are named `*.e2e.ts` so Vitest's default `*.test.*` / `*.spec.*` glob never
 * picks them up; `npm test` stays unit-only.
 */
const PORT = 8080; // @lovable.dev/vite-tanstack-config always serves the dev app on 8080.
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Add more browsers once the suite is stable:
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  /* Start the dev server before the tests (reuses one you already have running locally). */
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
