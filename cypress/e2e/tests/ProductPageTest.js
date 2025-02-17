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

    it("Validate Product Page", () => {
        cy.fixture("product.json").then((productData) => {
            const targetProduct = productData.productName;
            productList.productCtnr().should("be.visible");
    
            productList.productName().each(($el, index) => {
                if ($el.text() == targetProduct) {
                    productList.productName().eq(index).then(($nameElement) => { //get name
                        const expectedName = $nameElement.text();
    
                        productList.productDesc().eq(index).then(($descElement) => { //get desc
                            const expectedDesc = $descElement.text();
    
                            productList.productPrice().eq(index).then(($priceElement) => { //get price
                                const expectedPrice = $priceElement.text();
    
                                productList.productName().eq(index).click(); //click the product that match
                                product.productCtnr().should("be.visible");
    
                                product.productName().then(($productPageNameElement) => { //validation name
                                    const actualName = $productPageNameElement.text();
                                    expect(actualName).to.equal(expectedName);
                                });
    
                                product.productDesc().then(($productPageDescElement) => { //validation desc
                                    const actualDesc = $productPageDescElement.text();
                                    expect(actualDesc).to.equal(expectedDesc);
                                });
    
                                product.productPrice().then(($productPagePriceElement) => { //validation price
                                    const actualPrice = $productPagePriceElement.text();
                                    expect(actualPrice).to.equal(expectedPrice);
                                });
                            });
                        });
                    }); 
                } 
            }); 
        }); 
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
        product.addToCartBtn().should("be.visible")
    }); 
  

    //validate adding to cart & cart button text
    //validate removing to cart & cart button text
    //validate back button
});
