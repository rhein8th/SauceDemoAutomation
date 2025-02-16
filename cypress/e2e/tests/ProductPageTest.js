/// <reference types="cypress" />
import ProductPage from "../pages/ProductListPage";
import ProductListPage from "../pages/ProductPage";
import CartNavigation from "../sharedComponents/CartNavigation";

    const product = new ProductListPage(); 
    const productList = new ProductListPage();
    const cart = new CartNavigation();

before(()=>{
    cy.clearAppData();
})

beforeEach(() => {
    cy.login();
    // cy.visit("/inventory"); 
});

describe("Product Page Test Suite", ()=>{

    it("Validate Product Page",()=>{ //validate page elements and should be equal to what was clicked (name, desc, price)

        cy.contains("Sauce Labs Backpack").click();
        cy.validateHamburgerMenu();
        cy.validateCartButton();
        cy.validateFooter()

        product.logo().should("be.visible");
        product.backBtn().should("be.visible");
        product.productCtnr().should("be.visible");
        product.productImg().should("be.visible");
        product.productName().should("be.visible");
        product.productDesc().should("be.visible");
        product.productPrice().should("be.visible");
        product.addToCartBtn().should("be.visible");


    })
    
    //validate adding to cart & cart button text
    //validate removing to cart & cart button text
    //validate back button
 
       
});

   
