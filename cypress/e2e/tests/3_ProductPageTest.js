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
    // cy.visit("/inventory");
    cy.proceedProductpage(); 
});

describe("Product Page Test Suite", () => {

    //@regression
    //validate product page button
    it("Validate Product Page", () => {
        cy.validateHamburgerMenu();
        cy.validateCartButton().go("back");
        cy.validateFooter();
        product.logo().should("be.visible");
        product.backBtn().should("be.visible");
        product.productCtnr().should("be.visible");
        product.productImg().should("be.visible");
        product.productName().should("be.visible");
        product.productDesc().should("be.visible");
        product.productPrice().should("be.visible");
        product.addToCartBtn().should("be.visible");
    });

    //@regression @smoke
    it("Validate Add Product to Cart", () => {
        //validate adding to cart & cart button text
        product.addToCartBtn().click();
        cart.cartBtn().should("have.text", "1");
        product.addToCartBtn().should("have.text", "Remove");
    });

    //@regression
    it("Validate Remove Product to Cart", () => {
        //validate removing to cart & cart button text
        product.addToCartBtn().dblclick();
        //product.addToCartBtn().click();
        cart.cartBtn().should("not.have.text");
        product.addToCartBtn().should("have.text", "Add to cart");
    });

    //@regression
    it("Validate Product Page Back Button", () => {
        product.backBtn().click();
        cy.url().should("include","inventory");
    });

    
});
