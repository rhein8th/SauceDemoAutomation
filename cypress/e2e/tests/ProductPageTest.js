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
});

describe("Product Page Test Suite", () => {

    it("Validate Product Page if same details with the clicked product", () => {
        cy.proceedProductpage();
    });

    //validate product page button
    it("Validate Product Page", () => {
        cy.proceedProductpage();
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

    //validate back button
    it("Validate Add Product to Cart", () => {
    cy.proceedProductpage();
    
        //validate adding to cart & cart button text
        product.addToCartBtn().click();
        cart.cartBtn().should("have.text", "1");
        product.addToCartBtn().should("have.text", "Remove");
    });

    //validate back button
    it("Validate Remove Product to Cart", () => {
    cy.proceedProductpage();
        //validate removing to cart & cart button text
        product.addToCartBtn().dblclick();
        //product.addToCartBtn().click();
        cart.cartBtn().should("not.have.text");
        product.addToCartBtn().should("have.text", "Add to cart");
    
    });

        //validate back button
    it("Validate Product Page Back Button", () => {
        cy.proceedProductpage();
        product.backBtn().click();
        cy.url().should("include","inventory");
   
    });

  
    
});
