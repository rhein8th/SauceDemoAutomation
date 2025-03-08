/// <reference types="cypress" />
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ConfirmCheckoutPage from "../pages/ConfirmCheckoutPage";

const product = new ProductPage(); 
const productList = new ProductListPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const confirmPage = new ConfirmCheckoutPage();

before(() => {
    cy.clearAppData();
});

beforeEach(() => {
    cy.login();
});

describe("Checkout Page Test Suite", () => {

    it("Validate Confirm Checkout page", () => {
        
        cy.fillUpCheckoutPage();
        confirmPage.totalPrice().should("be.visible");
    });

    
});
