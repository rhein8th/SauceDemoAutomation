const { defineConfig } = require("cypress");


console.log('cypress.config.js loaded!'); // <-- Add this line


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
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: ["**/pages/**", "**/sharedComponents/**"],

    supportFile: 'cypress/support/e2e.js', // <--- Ensure this path is correct!

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require('@cypress/grep/src/plugin')(config); // ✅ THIS ONE WORKS
      return config;
    },
  },
});
