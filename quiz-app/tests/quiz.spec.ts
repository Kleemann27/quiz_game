import { test, expect } from "@playwright/test";

test.describe("Eesti viktoriin", () => {
  test("avaleht avaneb ja esimene küsimus on nähtav", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Pane oma teadmised proovile" })
    ).toBeVisible();

    await expect(page.getByText("Mis on Eesti pealinn?")).toBeVisible();
    await expect(page.getByTestId("live-score")).toContainText("Punktid: 0");
  });

  test("õige vastus annab tagasiside", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Tallinn").click();
    await expect(page.getByRole("button", { name: "Vasta" })).toBeEnabled();
    await page.getByRole("button", { name: "Vasta" }).click();

    await expect(page.getByTestId("feedback")).toBeVisible();
    await expect(page.getByTestId("feedback")).toContainText("Õige vastus");
  });

  test("vale vastus näitab veateadet", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Tartu").click();
    await expect(page.getByRole("button", { name: "Vasta" })).toBeEnabled();
    await page.getByRole("button", { name: "Vasta" }).click();

    await expect(page.getByTestId("feedback")).toBeVisible();
    await expect(page.getByTestId("feedback")).toContainText("Vale vastus");
    await expect(page.getByTestId("live-score")).toContainText("Punktid: 0");
  });

  test("saab liikuda järgmise küsimuse juurde", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Tallinn").click();
    await page.getByRole("button", { name: "Vasta" }).click();
    await page.getByRole("button", { name: "Järgmine küsimus" }).click();

    await expect(
      page.getByText("Milline lind on Eesti rahvuslind?")
    ).toBeVisible();

    await expect(page.getByTestId("live-score")).toContainText("Punktid: 1");
  });

  test("kasutaja saab viktoriini lõpuni teha ja näeb tulemusi", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Tallinn").click();
    await page.getByRole("button", { name: "Vasta" }).click();
    await page.getByRole("button", { name: "Järgmine küsimus" }).click();

    await page.getByText("Suitsupääsuke").click();
    await page.getByRole("button", { name: "Vasta" }).click();
    await page.getByRole("button", { name: "Järgmine küsimus" }).click();

    await page.getByText("Hunt").click();
    await page.getByRole("button", { name: "Vasta" }).click();
    await page.getByRole("button", { name: "Vaata tulemusi" }).click();

    await expect(
      page.getByRole("heading", { name: "Tulemused" })
    ).toBeVisible();

    await expect(page.getByTestId("final-score")).toContainText("Lõppskoor: 3 / 3");
    await expect(page.getByRole("table")).toBeVisible();
  });
});