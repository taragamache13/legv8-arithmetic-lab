
const { test, expect } = require("@playwright/test");


test("13 divided by 3 produces quotient 4 and remainder 1",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#div-dividend").fill("13");
    await page.locator("#div-divisor").fill("3");

    // Execute all division steps.
    await page.locator("#div-run").click();

    // Verify quotient and remainder.
    await expect(
        page.locator("#div-quotient")
    ).toHaveText("4");

    await expect(
        page.locator("#div-remainder")
    ).toHaveText("1");

    // Binary 13 (1101) requires four steps.
    await expect(
        page.locator("#div-trace-body tr")
    ).toHaveCount(4);
});


test("division step controls work", async ({ page }) => {
    await page.goto("/");

    await page.locator("#div-dividend").fill("13");
    await page.locator("#div-divisor").fill("3");

    // First step.
    await page.locator("#div-next").click();

    await expect(page.locator("#div-quotient"))
        .toHaveText("0");

    await expect(page.locator("#div-remainder"))
        .toHaveText("1");

    // Second step.
    await page.locator("#div-next").click();

    await expect(page.locator("#div-quotient"))
        .toHaveText("4");

    // Go backward one step.
    await page.locator("#div-prev").click();

    await expect(page.locator("#div-quotient"))
        .toHaveText("0");

    // Reset.
    await page.locator("#div-reset").click();

    await expect(page.locator("#div-quotient"))
        .toHaveText("0");

    await expect(page.locator("#div-remainder"))
        .toHaveText("0");

    await expect(page.locator("#div-trace-body tr"))
        .toHaveCount(0);
});


test("division by zero is rejected", async ({ page }) => {
    await page.goto("/");

    await page.locator("#div-dividend").fill("13");
    await page.locator("#div-divisor").fill("0");

    await expect(page.locator("#div-message"))
        .toContainText("Division by zero is not allowed");

    await expect(page.locator("#div-run"))
        .toBeDisabled();
});


test("division handles dividend smaller than divisor",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#div-dividend").fill("9");
    await page.locator("#div-divisor").fill("20");

    await page.locator("#div-run").click();

    await expect(page.locator("#div-quotient"))
        .toHaveText("0");

    await expect(page.locator("#div-remainder"))
        .toHaveText("9");
});
