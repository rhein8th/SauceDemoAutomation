const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 50000,
  env:{
    url: "https://www.saucedemo.com/"
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  }, 
  e2e: {
    // Default base URL for the application under test
    baseUrl: "https://www.saucedemo.com/",

    setupNodeEvents(on, config) {
      // Dynamically set the base URL or other configurations based on the environment
      const environment = config.env.environment || "dev"; // Default to 'staging'
      const environments = {
        dev: "https://www.saucedemo.com/"
        //production: "https://www.saucedemo.com/",
      };

      config.baseUrl = environments[environment] || environments.dev; // Use appropriate URL
      return config;
    },

    viewportWidth: 1920,
    viewportHeight: 1080,

    env: {
      environment: "dev", // Default environment
    },

    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
  },
});