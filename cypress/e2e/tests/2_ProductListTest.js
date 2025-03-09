/// <reference types="cypress" />

import ProductListPage from "../pages/ProductListPage";
import CartNavigation from "../sharedComponents/CartNavigation";

    const productList = new ProductListPage();
    const cart = new CartNavigation();

before(()=>{
    cy.clearAppData();
})

beforeEach(() => {
    cy.login();
  
});

describe("Product List Page Test Suite", ()=>{

    
    it("Validate Product List Page",()=>{
        cy.validateHamburgerMenu();
        cy.validateCartButton().go("back");
        cy.validateFooter();

        productList.logo().should("be.visible");
        productList.pageTitle().should("be.visible");
        productList.sortBtn().should("be.visible");
        productList.invetoryList().should("be.visible");
        productList.productCtnr().should("be.visible");
        productList.productImg().should("be.visible");
        productList.productName().should("be.visible");
        productList.productDesc().should("be.visible");
        productList.productPrice().should("be.visible");
        productList.addToCartBtn().should("be.visible");
    })

    
    //validate sort functionality by name asc & desc and  by price asc & desc
    it("Validate Sorting by Name (A to Z)", () => { // name asc
       
        let originalNames = [];
        productList.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);

        });
       
        productList.sortBtn().select("Name (A to Z)");
        productList.sortBtn().should("have.value", "az");
       
        let sortedNames = [];
        productList.productName().then(($elements) => {
            sortedNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(sortedNames);
           
            const expectedNames = [...originalNames].sort();
            console.log(expectedNames);
          
            expect(sortedNames).to.deep.equal(expectedNames);
        });
    });
    
   
    it("Validate Sorting by Name (Z to A)", () => { // name desc
        
        let originalNames = [];
        productList.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);
        });
       
        productList.sortBtn().select("Name (Z to A)");
        productList.sortBtn().should("have.value", "za");
       
        let sortedNames = [];
        productList.productName().then(($elements) => {
            sortedNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(sortedNames);
            
            const expectedNames = [...originalNames].sort().reverse();
            console.log(expectedNames);
            
            expect(sortedNames).to.deep.equal(expectedNames);
        });
    });

    
    it("Validate Sorting by Price (Low to High)", () => { 
      
        productList.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

           
            productList.sortBtn().select("Price (low to high)");
            productList.sortBtn().should("have.value", "lohi");
          
            productList.productPrice().then(($elements) => {
                const sortedPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
                console.log(sortedPrices);
             
                const expectedPrices = [...originalPrices].sort((a, b) => a - b);
                console.log(expectedPrices);
            
                expect(sortedPrices).to.deep.equal(expectedPrices);
            
            });
        });
 
    });
    
    it("Validate Sorting by Price (High to Low)", () => { 
    
        productList.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

            productList.sortBtn().select("Price (high to low)");
            productList.sortBtn().should("have.value", "hilo");
          
            productList.productPrice().then(($elements) => {
                const sortedPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
                console.log(sortedPrices);
             
                const expectedPrices = [...originalPrices].sort((a, b) => b - a);
                console.log(expectedPrices);
            
                expect(sortedPrices).to.deep.equal(expectedPrices);
            
            });
        });
 
    });
    
    it("Validate Adding Product to Cart", () => {
        let clickCount = 0;
        cy.fixture("product.json").as("prod");
        cy.get("@prod").then((product) => {
            product.productNames.forEach((element, index) => {
                cy.selectProduct(element);
                clickCount++;
            });
            cart.cartBtn().should("have.text", clickCount.toString());
        });
    });
    
    
   
    it("Validate Removing Products from Cart", () => {
       
        productList.addToCartBtn()
            .filter((index, btn) => btn.innerText.trim() === "Add to cart")
            .then(($addBtns) => {
                const totalButtons = $addBtns.length; //initially 6 since static data product
                const randomCount = Math.floor(Math.random() * totalButtons) + 1; //select 1 to 6 randomly
                const randomIndexes = Cypress._.shuffle([...Array(totalButtons).keys()]).slice(0, randomCount); //shuffle and pick
    
                cy.wrap($addBtns).each(($btn, index) => {
                    if (randomIndexes.includes(index)) {
                        cy.wrap($btn).click();
                    }
                });
                return cy.wrap(randomCount);
            })

            .then((randomCount) => { //get stored selected count
                productList.addToCartBtn()
                    .filter((index, btn) => btn.innerText.trim() === "Remove")
                    .then(($removeBtns) => {
                        let initialCount = $removeBtns.length; //Number of products in the cart
    
                        cart.cartBtn().should("have.text", initialCount.toString());
    
                        if (initialCount > 0) {
                            cy.wrap($removeBtns).each(($btn, index) => {
                                cy.wrap($btn).click();
                                initialCount--;
                                cart.cartBtn().should("have.text", initialCount > 0 ? initialCount.toString() : ""); 
                            });
                        }
                    });
            });
    });
    
       
});

   
