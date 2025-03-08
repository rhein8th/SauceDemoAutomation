/// <reference types="cypress" />
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const product = new ProductPage(); 
const productList = new ProductListPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

before(() => {
    cy.clearAppData();
});

beforeEach(() => {
    cy.login();
});

describe("Checkout Page Test Suite", () => {

    it("Validate Checkout page", () => {
        cy.validateCheckoutpage();
    });

    it("Validate Text Fields", () => {
        cy.fixture("users").then((users) => {
            const fName = users.userInfo.firstName;
            const lName = users.userInfo.lastName;
           
            cy.validateCheckoutpage();
            checkoutPage.continueBtn().click();
            checkoutPage.fNameInput().should("have.class", "form_input error");
            checkoutPage.lNameInput().should("have.class", "form_input error");
            checkoutPage.zipCodeInput().should("have.class", "form_input error");
            checkoutPage.errorMsg().should("be.visible").should("have.text", "Error: First Name is required");


            checkoutPage.fNameInput().type(fName);
            checkoutPage.continueBtn().click();
            checkoutPage.errorMsg().should("be.visible").should("have.text", "Error: Last Name is required");

            checkoutPage.lNameInput().type(lName);
            checkoutPage.continueBtn().click();
            checkoutPage.errorMsg().should("be.visible").should("have.text", "Error: Postal Code is required");
        });
     })



     it("Validate Proceeding to Confirm Checkout page", () => {
        cy.fillUpCheckoutPage();
     })

    
});
