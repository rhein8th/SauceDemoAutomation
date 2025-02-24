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
});

describe("Cart Page Test Suite", () => {

    it("Validate Adding Product to Cart", () => {
        let clickCount = 0;
        cy.fixture("product.json").as("prod");
        cy.get("@prod").then((product) => {
            product.productNames.forEach((element, index) => {
                cy.log(`Adding product: <span class="math-inline">\{element\} \(</span>{index + 1})`);
                cy.selectProduct(element);
                clickCount++;
            });
            cart.cartBtn().invoke("text").then((text) => cy.log("Cart count:", text));
            cart.cartBtn().should("have.text", clickCount.toString());
        });
    });

   
  
    
});
