class Login
    {
        pageTitle() { return cy.get(".login_logo"); }
        usernameInput() { return cy.get("#user-name"); }
        passwordInput() { return cy.get("#password"); }
        loginBtn() { return cy.get("input[id='login-button']"); }
        errorMsg() { return cy.get("h3[data-test='error']"); }
    }
    export default Login;