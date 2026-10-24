
const { test, expect } = require("@playwright/test");

test("13 multiplied by 5 produces 65", async ({ page }) => {

    // Open the Arithmetic Lab website.
    await page.goto("/");

    // Enter the multiplication values.
    await page.locator("#mult-a").fill("13");
    await page.locator("#mult-b").fill("5");

    // Execute all multiplication steps.
    await page.locator("#mult-run").click();

    // Verify the final multiplication result.
    await expect(
        page.locator("#mult-result")
    ).toHaveText("65");

    // Verify that three steps were executed.
    await expect(
        page.locator("#mult-trace-body tr")
    ).toHaveCount(3);

});


test("multiplication step controls work", async ({ page }) => {
    await page.goto("/");

    // Begin with 13 x 5.
    await page.locator("#mult-a").fill("13");
    await page.locator("#mult-b").fill("5");

    // Execute the first step.
    await page.locator("#mult-next").click();
    await expect(page.locator("#mult-result")).toHaveText("13");

    // Execute the remaining steps.
    await page.locator("#mult-next").click();
    await page.locator("#mult-next").click();

    await expect(page.locator("#mult-result")).toHaveText("65");

    // Move backward one step.
    await page.locator("#mult-prev").click();
    await expect(page.locator("#mult-result")).toHaveText("13");

    // Reset the simulator.
    await page.locator("#mult-reset").click();

    await expect(page.locator("#mult-result")).toHaveText("0");
    await expect(page.locator("#mult-trace-body tr")).toHaveCount(0);
});


test("multiplication rejects negative inputs", async ({ page }) => {
    await page.goto("/");

    await page.locator("#mult-a").fill("-5");
    await page.locator("#mult-b").fill("3");

    // Invalid inputs should prevent execution.
    await expect(page.locator("#mult-message"))
        .toContainText("Enter two whole numbers");

    await expect(page.locator("#mult-run")).toBeDisabled();
});


test("multiplication handles zero multiplier", async ({ page }) => {
    await page.goto("/");

    await page.locator("#mult-a").fill("13");
    await page.locator("#mult-b").fill("0");

    await expect(page.locator("#mult-result")).toHaveText("0");

    await expect(page.locator("#mult-progress"))
        .toContainText("Multiplier is zero");

    await expect(page.locator("#mult-trace-body tr")).toHaveCount(0);
});
