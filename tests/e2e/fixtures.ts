import { test as base } from "@playwright/test";
import { ReservePage } from "./pages/reserve-page";

type Pages = {
  reservePage: ReservePage;
};

/** Import `test` and `expect` from here, not from @playwright/test, to get page-object fixtures. */
export const test = base.extend<Pages>({
  reservePage: async ({ page }, use) => {
    await use(new ReservePage(page));
  },
});

export { expect } from "@playwright/test";
