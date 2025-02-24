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

describe("Cart Page Test Suite", () => {

    it("Validate Proceeding to Cart page", () => {
        cy.fixture("product.json").as("prod");
        cy.get("@prod").then((product) => {
            product.productName.forEach(function(element){
            cy.selectProduct(element)
          });
        })
  
    });

   
  
    
});
