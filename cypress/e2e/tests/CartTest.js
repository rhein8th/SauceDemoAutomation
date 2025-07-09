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

describe("Cart Page Test Suite", { tags: ["@regression"] }, () => {

    it("Validate Adding Products to Cart from Product List page", { tags: ["@smoke"] }, () => {
        let clickCount = 0;
        const addedProducts = [];
    
        cy.fixture("product.json").as("prod");
        cy.get("@prod").then((product) => {
            product.productNames.forEach((element) => {
                cy.selectProduct(element);
                clickCount++;

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
            cy.validateCartButton();
            cartPage.productCtnr().should("have.length", clickCount); 
    
            addedProducts.forEach((addedProduct, index) => {
                cartPage.productName().eq(index).should("have.text", addedProduct.name);
                cartPage.productDesc().eq(index).should("have.text", addedProduct.desc);
                cartPage.productPrice().eq(index).should("have.text", addedProduct.price);
            });
            cy.validateCartPage();
            cy.validateCartPageButtons();
        });
    });
 
    it("Validate Adding Product to Cart from Product page", { tags: ["@smoke"] }, () => {
        cy.proceedProductpage();

        cy.wrap({}).then((obj) => {
            return product.productName().invoke("text").then((name) => {
                obj.nameText = name;
                return product.productDesc().invoke("text");
            }).then((desc) => {
                obj.descText = desc;
                return product.productPrice().invoke("text");
            }).then((price) => {
                obj.priceText = price;

                cy.log("Product Name:", obj.nameText);
                cy.log("Product Description:", obj.descText);
                cy.log("Product Price:", obj.priceText);

                product.addToCartBtn().click();
                cy.validateCartButton();

                cartPage.productName().should("have.text", obj.nameText);
                cartPage.productDesc().should("have.text", obj.descText);
                cartPage.productPrice().should("have.text", obj.priceText);
            });
        });
        cy.validateCartPage();
        cart.cartBtn().should("have.text", "1");
        cy.validateCartPageButtons();
    });
    
});
