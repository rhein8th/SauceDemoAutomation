const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 50000,
  env: {
    url: "https://www.saucedemo.com/",
    environment: "dev",
    grepFilterSpecs: true,
    grepOmitFiltered: true
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: false,
  },

  video: true,
  videosFolder: "cypress/reports/videos",
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    //specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    specPattern: [
      "cypress/e2e/tests/LoginTest.js",
      "cypress/e2e/tests/ProductListTest.js",
      "cypress/e2e/tests/ProductPageTest.js",
      "cypress/e2e/tests/CartTest.js",
      "cypress/e2e/tests/CheckoutTest.js",
      "cypress/e2e/tests/ConfirmCheckoutTest.js",
      "cypress/e2e/tests/CheckoutCompleteTest.js"
    ],
    excludeSpecPattern: ["**/pages/**", "**/sharedComponents/**"],

    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
