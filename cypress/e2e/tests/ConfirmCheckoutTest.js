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

describe("Checkout Page Test Suite", { tags: ["@regression"] }, () => {

    it("Validate Confirm Checkout page", { tags: ["@smoke"] }, () => {
        cy.fillUpCheckoutPage();
      
        confirmPage.logo().should("be.visible");
        confirmPage.pageTitle().should("be.visible");
        confirmPage.qtyLbl().should("be.visible");
        confirmPage.descLbl().should("be.visible");

            cy.get('@addedProducts').then((addedProducts) => {
                addedProducts.forEach((addedProduct, index) => {
                    confirmPage.productName().eq(index).should('have.text', addedProduct.name);
                    confirmPage.productDesc().eq(index).should('have.text', addedProduct.desc);
                    confirmPage.productPrice().eq(index).should('have.text', addedProduct.price);
                });
            });

        confirmPage.summaryInfo().should("be.visible");
        confirmPage.paymentInfo().should("be.visible");
        confirmPage.paymentVal().should("be.visible");
        confirmPage.shippingInfo().should("be.visible");
        confirmPage.shippingVal().should("be.visible");
        confirmPage.totalPriceLbl().should("be.visible");
        confirmPage.subTotal().should("be.visible");
        confirmPage.tax().should("be.visible");
        confirmPage.totalPrice().should("be.visible");
        confirmPage.cancelBtn().should("be.visible");
        confirmPage.finishBtn().should("be.visible");
        
    });

    it("Validate Sub Total, Tax, and Total Price", { tags: ["@smoke"] }, () => {
        cy.fillUpCheckoutPage();
        confirmPage.subTotal().should("be.visible");
        confirmPage.tax().should("be.visible");

        let subtotalPrice = 0;
        const taxRate = 0.0801;
    
        confirmPage.productPrice().each(($el) => {
            const priceText = $el.text().replace("$", "").trim();
            const price = parseFloat(priceText);
            subtotalPrice += price;

        }).then(() => {
            const subtotal = parseFloat(subtotalPrice.toFixed(2));
            const totalTax = parseFloat((subtotal * taxRate).toFixed(2)); 
            const totalPrice = parseFloat((subtotal + totalTax).toFixed(2)); 


            confirmPage.subTotal().invoke("text").then((text) => {
                const subTotal = parseFloat(text.replace("Item total: $", "").trim())
                expect(subTotal).to.equal(subtotalPrice);
            });

            confirmPage.tax().invoke("text").then((text) => {
                const tax = parseFloat(text.replace("Tax: $", "").trim())
                expect(tax).to.equal(totalTax);
            });

            confirmPage.totalPrice().invoke("text").then((text) => {
                const total = parseFloat(text.replace("Total: $", "").trim())
                expect(total).to.equal(totalPrice);
            });

        });

    });

    it("Validate Back and Finish buttons", () => {
        cy.fillUpCheckoutPage();
        confirmPage.cancelBtn().click();
        cy.url().should("includes", "/inventory.html").go("back");
        confirmPage.finishBtn().click();
        cy.url().should("includes", "/checkout-complete");
       
     

    });
    


    
});
