/// <reference types="Cypress" />

import LoginPage from "../pages/LoginPage";

const logIn = new LoginPage();

before(()=>{
    cy.clearAppData();
})

 beforeEach(()=>{ 
    cy.visit("/");
 })

describe("Login Page Test Suite", ()=>{

    it("Validate Login page",()=>{
        logIn.logo().should("be.visible");
        logIn.usernameInput().should("be.visible");
        logIn.passwordInput().should("be.visible");
        logIn.loginBtn().should("be.visible");
    });

    it("Validate Successful Login",()=>{
            cy.login();
    });

    it("Validate Invalid Credentials",()=>{
        cy.fixture("users").then((users) => {
            const username = users.invalidUser.invalidUsername;
            const password = users.invalidUser.invalidPassword;
    
                logIn.usernameInput().clear().type(username);
                logIn.passwordInput().clear().type(password);
                logIn.loginBtn().click();
                logIn.errorMsg().should("be.visible")
                logIn.usernameInput().should("have.class", "input_error");
                logIn.passwordInput().should("have.class", "input_error");
                cy.url().should("not.include", "/inventory");
        });
});


});