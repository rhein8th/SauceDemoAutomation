/// <reference types="cypress" />
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ConfirmCheckoutPage from "../pages/ConfirmCheckoutPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";

const product = new ProductPage(); 
const productList = new ProductListPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const confirmPage = new ConfirmCheckoutPage();
const completePage = new CheckoutCompletePage();

before(() => {
    cy.clearAppData();
});

beforeEach(() => {
    cy.login();
});

describe("Checkout Complete Page Test Suite", { tags: ["@regression"] }, () => {

    it("Validate Checkout Complete Page", { tags: ["@smoke"] },() => {
        cy.fillUpCheckoutPage();
        confirmPage.finishBtn().click();
        cy.url().should("includes", "/checkout-complete");

        completePage.logo().should("be.visible");
        completePage.headerLbl().should("be.visible");
        completePage.msgLbl().should("be.visible");

        cy.fixture("messages").then((messages) => {
            const head = messages.completeMsgs.head;
            const body = messages.completeMsgs.body;

            completePage.headerLbl().invoke("text").then((text) => {
                expect(text.trim()).to.equal(head);
            })

            completePage.msgLbl().invoke("text").then((text) => {
                expect(text.trim()).to.equal(body);
            })
        })
        completePage.homeBtn().should("be.visible").click();
        cy.url().should("includes", "/inventory.html");

    });
    
    
});
