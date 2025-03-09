const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 50000,
  env: {
    url: "https://www.saucedemo.com/",
    environment: "dev",
  },

  e2e: {
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: ["**/pages/**", "**/sharedComponents/**"],
  },
});
