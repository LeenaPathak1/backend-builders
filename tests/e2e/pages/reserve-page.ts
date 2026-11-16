import type { Locator, Page } from "@playwright/test";
import type { ReservationInput } from "../data/reservation";

/**
 * Page object for /reserve (src/routes/reserve.tsx).
 * Holds locators and actions only; assertions live in the tests.
 */
export class ReservePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly title: Locator;
  readonly organization: Locator;
  readonly advisor: Locator;
  readonly attendance: Locator;
  readonly purpose: Locator;
  readonly date: Locator;
  readonly startTime: Locator;
  readonly endTime: Locator;
  readonly room: Locator;
  readonly submitButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Reserve an event space" });
    // Each input is wrapped in a <label> (FormField), so getByLabel finds it.
    this.title = page.getByLabel("Event Title");
    this.organization = page.getByLabel("Organization");
    this.advisor = page.getByLabel("Faculty Advisor");
    this.attendance = page.getByLabel("Expected Attendance");
    this.purpose = page.getByLabel("Event Purpose");
    // Anchored regexes: a plain "End" would also match "Expected Attendance" (substring, case-insensitive).
    this.date = page.getByLabel(/^Date\b/);
    this.startTime = page.getByLabel(/^Start\b/);
    this.endTime = page.getByLabel(/^End\b/);
    this.room = page.getByLabel("Choose Room");
    this.submitButton = page.getByRole("button", { name: "Submit Request" });
    this.successHeading = page.getByRole("heading", { name: "Request submitted!" });
  }

  async goto() {
    await this.page.goto("/reserve");
  }

  async fill(data: ReservationInput) {
    await this.title.fill(data.title);
    await this.organization.fill(data.organization);
    await this.advisor.fill(data.advisor);
    await this.attendance.fill(data.attendance);
    await this.purpose.fill(data.purpose);
    await this.date.fill(data.date);
    await this.startTime.fill(data.startTime);
    await this.endTime.fill(data.endTime);
    // Room options are filtered by availability once date and time are set,
    // so choose the room last.
    await this.room.selectOption(data.room);
  }

  async submit() {
    await this.submitButton.click();
  }
}
