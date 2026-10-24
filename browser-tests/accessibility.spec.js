
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("homepage meets automated WCAG accessibility checks",
    async ({ page }) => {

    // Open the LEGv8 Arithmetic Lab.
    await page.goto("/");

    // Run WCAG 2.1 Level A and AA checks.
    const results = await new AxeBuilder({ page })
        .withTags([
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa"
        ])
        .analyze();

    // Report detected issues.
    for (const violation of results.violations) {
        console.log(
            `${violation.id}: ${violation.help}`
        );

        console.log(
            `Affected elements: ${violation.nodes.length}`
        );
    }

    // Fail if accessibility violations are detected.
    expect(results.violations).toEqual([]);
});


test("mobile layout meets automated WCAG accessibility checks",
    async ({ page }) => {

    // Simulate a mobile screen.
    await page.setViewportSize({
        width: 375,
        height: 812
    });

    // Open the Arithmetic Lab.
    await page.goto("/");

    // Run accessibility checks at mobile width.
    const results = await new AxeBuilder({ page })
        .withTags([
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa"
        ])
        .analyze();

    // Check for accessibility violations.
    expect(results.violations).toEqual([]);
});
