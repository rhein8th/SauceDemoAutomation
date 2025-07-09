/// <reference types="cypress" />
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import CartNavigation from "../sharedComponents/CartNavigation";

const product = new ProductPage(); 
const productList = new ProductListPage();
const cart = new CartNavigation();

before(() => {
    cy.clearAppData();
});

beforeEach(() => {
    cy.login();
    
    cy.proceedProductpage(); 
});

describe("Product Page Test Suite", { tags: ["@regression"] }, () => {

    it("Validate Product Page", () => {
        // cy.validateHamburgerMenu();
        // cy.validateCartButton().go("back");
        // cy.validateFooter();
        product.logo().should("be.visible");
        product.backBtn().should("be.visible");
        product.productCtnr().should("be.visible");
        product.productImg().should("be.visible");
        product.productName().should("be.visible");
        product.productDesc().should("be.visible");
        product.productPrice().should("be.visible");
        product.addToCartBtn().should("be.visible");
    });

    it("Validate Add Product to Cart", { tags: ["@smoke"] }, () => {
        
        product.addToCartBtn().click();
        cart.cartBtn().should("have.text", "1");
        product.addToCartBtn().should("have.text", "Remove");
    });


    it("Validate Remove Product to Cart", () => {
        product.addToCartBtn().dblclick();
        cart.cartBtn().should("not.have.text");
        product.addToCartBtn().should("have.text", "Add to cart");
    });

    it("Validate Product Page Back Button", () => {
        product.backBtn().click();
        cy.url().should("include","inventory");
    });

    
});
