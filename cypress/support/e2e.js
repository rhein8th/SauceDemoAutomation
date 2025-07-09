// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


// Import commands.js using ES2015 syntax:

import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()
//import "@cypress/grep";
import "./commands";
import "cypress-mochawesome-reporter/register";


//GREP COMMANDS
//npx cypress run --env grepTags='@reg'
//npx cypress run --env grepTags=@smoke
//npx cypress run --spec "cypress/e2e/tests/LoginTest.js" --env grepTags=@smoke


