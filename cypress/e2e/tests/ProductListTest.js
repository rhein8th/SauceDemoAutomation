/// <reference types="cypress" />

import ProductListPage from "../pages/ProductListPage";
    const product = new ProductListPage();

before(()=>{
    cy.clearAppData();
    //cy.login();
})

beforeEach(() => {
    cy.login();
    // cy.visit("/inventory"); 
});

describe("Product List Page Test Suite", ()=>{

    it("Validate Hamburger Menu",()=>{
       cy.validateHamburgerMenu();
    })

    it("Validate Cart Button",()=>{
        cy.validateCartButton();
     })

    it("Validate Footer",()=>{
    cy.validateFooter();
    })

    it("Validate Product List Page",()=>{
        product.pageTitle().should("be.visible");
    })

});