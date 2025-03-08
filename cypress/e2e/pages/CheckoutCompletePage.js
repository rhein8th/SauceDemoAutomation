class Complete
    {
    logo() { return cy.get(".app_logo"); }
    pageTitle() { return cy.get(".title"); }
    headerLbl() { return cy.get("h2[data-test='complete-header']"); }
    msgLbl() { return cy.get("div[data-test='complete-text']"); }
    homeBtn() { return cy.get("#back-to-products"); }
    }
 export default Complete;