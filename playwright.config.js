
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./browser-tests",

    use: {
        baseURL: "http://127.0.0.1:8000",
        browserName: "chromium",
        headless: true
    },

    webServer: {
        command: "python -m http.server 8000 --directory web",
        url: "http://127.0.0.1:8000",
        reuseExistingServer: !process.env.CI,
        timeout: 30000
    }
});
