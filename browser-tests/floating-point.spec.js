
const { test, expect } = require("@playwright/test");


test("13.25 displays correct IEEE 754 representation",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#number").fill("13.25");

    // Verify the 32-bit binary fields.
    await expect(page.locator("#sign"))
        .toHaveText("0");

    await expect(page.locator("#exponent"))
        .toHaveText("10000010");

    await expect(page.locator("#fraction"))
        .toHaveText("10101000000000000000000");

    // Verify all 32 interactive bits appear.
    await expect(page.locator(".bit-cell"))
        .toHaveCount(32);

    // Verify the calculation breakdown.
    await expect(page.locator("#calc-exponent"))
        .toContainText("130 - 127 = 3");

    await expect(page.locator("#calc-significand"))
        .toContainText("1.65625");

    await expect(page.locator("#calc-result"))
        .toHaveText("13.25");
});


test("0.1 demonstrates 32-bit and 64-bit precision",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#number").fill("0.1");

    // Verify the stored 32-bit approximation.
    await expect(page.locator("#float32-value"))
        .toHaveText("0.10000000149011612");

    // JavaScript uses a shorter display for float64.
    await expect(page.locator("#float64-value"))
        .toHaveText("0.1");

    // Verify the exponent field lengths.
    const exponent32 = page.locator(
        "#float32-bits .precision-exponent"
    );

    const exponent64 = page.locator(
        "#float64-bits .precision-exponent"
    );

    await expect(exponent32).toHaveText("01111011");
    await expect(exponent64).toHaveText("01111111011");

    // Verify fraction field lengths.
    const fraction32 = await page.locator(
        "#float32-bits .precision-fraction"
    ).textContent();

    const fraction64 = await page.locator(
        "#float64-bits .precision-fraction"
    ).textContent();

    expect(fraction32).toHaveLength(23);
    expect(fraction64).toHaveLength(52);
});


test("negative floating-point values set sign bit",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#number").fill("-2.5");

    // The sign bit should indicate negative.
    await expect(page.locator("#sign"))
        .toHaveText("1");

    // Verify the reconstructed value.
    await expect(page.locator("#calc-result"))
        .toHaveText("-2.5");

    // Verify the calculation explanation.
    await expect(page.locator("#calc-sign"))
        .toContainText("negative");
});


test("invalid floating-point input clears results",
    async ({ page }) => {

    await page.goto("/");

    await page.locator("#number").fill("abc");

    // Verify the validation message.
    await expect(page.locator("#message"))
        .toContainText("Please enter a valid finite number");

    // Verify the calculation is cleared.
    await expect(page.locator("#calc-result"))
        .toHaveText("—");

    // Verify the comparison fields are cleared.
    await expect(page.locator("#float32-value"))
        .toHaveText("—");

    await expect(page.locator("#float64-value"))
        .toHaveText("—");

    // Invalid input should remove the bit buttons.
    await expect(page.locator(".bit-cell"))
        .toHaveCount(0);
});
