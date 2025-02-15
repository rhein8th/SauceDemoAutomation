import LoginPage from "../e2e/pages/LoginPage";
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

const logIn = new LoginPage();

Cypress.Commands.add("clearAppData", () => {
    cy.clearCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
});

Cypress.Commands.add("login", () => {
    cy.fixture("users").then((users) => {
        const username = users.validUser.validUsername;
        const password = users.validUser.validPassword;

            cy.visit("/");
            logIn.usernameInput().clear().type(username);
            logIn.passwordInput().clear().type(password);
            logIn.loginBtn().click();
            cy.url().should("include", "/inventory");
    });
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })