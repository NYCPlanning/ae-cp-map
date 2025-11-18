import { test, expect } from "@playwright/test";

test("Capital Planning Data Panel shows by default on desktop", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByLabel("Capital Planning Data")).toBeVisible();
});
