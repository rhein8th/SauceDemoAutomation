/// <reference types="cypress" />
import ProductPage from "../pages/ProductPage";
import ProductListPage from "../pages/ProductListPage";
import CartNavigation from "../sharedComponents/CartNavigation";
import CartPage from "../pages/CartPage";

const product = new ProductPage(); 
const productList = new ProductListPage();
const cart = new CartNavigation();
const cartPage = new CartPage();

before(() => {
    cy.clearAppData();
});

beforeEach(() => {
    cy.login();
});

describe("Cart Page Test Suite", () => {

    it("Validate Adding Product to Cart and Cart Details", () => {
        let clickCount = 0;
        const addedProducts = []; // Array to store added product details
    
        cy.fixture("product.json").as("prod");
        cy.get("@prod").then((product) => {
            product.productNames.forEach((element) => {
                cy.selectProduct(element);
                clickCount++;
    
                // Store product details
                productList.productName().each(($el, index) => {
                    productList.productDesc().eq(index).invoke("text").then((descText) => {
                        productList.productPrice().eq(index).invoke("text").then((priceText) => {
                            addedProducts.push({
                                name: $el.text().trim(),
                                desc: descText.trim(),
                                price: priceText.trim()
                            });
                        });
                    });
                });
            });
    
            cart.cartBtn().should("have.text", clickCount.toString());
    
            // Navigate to cart
            cy.validateCartButton();
            
            // Validate cart details
            cartPage.productCtnr().should("have.length", clickCount);// Verify correct number of items in cart 

    
            addedProducts.forEach((addedProduct, index) => {
                cartPage.productName().eq(index).should("have.text", addedProduct.name);
                cartPage.productDesc().eq(index).should("have.text", addedProduct.desc);
                cartPage.productPrice().eq(index).should("have.text", addedProduct.price);
            });
        });
    });
   
  // Verify Cart Page from Product page
    
});
