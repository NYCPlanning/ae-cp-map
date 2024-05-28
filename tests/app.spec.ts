import { test, expect } from "@playwright/test";

test("filter by geography button on mobile", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.setViewportSize({
    width: 375,
    height: 812,
  });
  await page.getByText("Filter by Geography").click();
  await expect(page.getByText("Geography Type")).toBeVisible();
});

test("filter menu shows by default on desktop", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByRole("button", { name: "Filter by Geography", exact: true }),
  ).not.toBeVisible();
  await page.getByText("Filter by Geography").click();
  await expect(page.getByText("Geography Type")).toBeVisible();
});

test("selecting City Council District hides borough select input", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByLabel("Borough")).toBeVisible();
  await page.getByLabel("Geography Type").selectOption("City Council District");
  await expect(page.getByLabel("Borough")).not.toBeVisible();
});
