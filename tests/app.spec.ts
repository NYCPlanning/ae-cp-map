import { test } from "@playwright/test";

test("filter menu shows by default on desktop", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
