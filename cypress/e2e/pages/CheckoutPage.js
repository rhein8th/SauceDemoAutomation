class Checkout
    {
    logo() { return cy.get(".app_logo"); }
    pageTitle() { return cy.get(".title"); }
    infoCntr() { return cy.get(".checkout_info"); }
    fNameInput() {  return cy.get("#first-name"); };
    lNameInput() {  return cy.get("#last-name"); };
    zipCodeInput() {  return cy.get("#postal-code"); };
    cancelBtn() { return cy.get("#cancel"); }
    continueBtn() { return cy.get("#continue"); }
    errorMsg() { return cy.get("h3"); }

    }
 export default Checkout;