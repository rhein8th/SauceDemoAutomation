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

            // Retrieve addedProducts from the alias
            cy.get('@addedProducts').then((addedProducts) => {
                confirmPage.totalPrice().should("be.visible");
    
                // Validate product details on the confirmation page
                addedProducts.forEach((addedProduct, index) => {
                    confirmPage.productName().eq(index).should('have.text', addedProduct.name);
                    confirmPage.productDesc().eq(index).should('have.text', addedProduct.desc);
                    confirmPage.productPrice().eq(index).should('have.text', addedProduct.price);
                });
            });
        
        //confirmPage.totalPrice().should("be.visible");
    });

    
});
