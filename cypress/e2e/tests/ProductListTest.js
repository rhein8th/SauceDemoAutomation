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
        cy.validateFooter()

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
        //Storing the product names in array before sorting
        let originalNames = [];
        productList.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);

        });
        //sort via button
        productList.sortBtn().select("Name (A to Z)");
        productList.sortBtn().should("have.value", "az");
        //Get product names after sort via button
        let sortedNames = [];
        productList.productName().then(($elements) => {
            sortedNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(sortedNames);
            //sorting stored originalNames for comparison
            const expectedNames = [...originalNames].sort();
            console.log(expectedNames);
            //Assertion
            expect(sortedNames).to.deep.equal(expectedNames);
        });
    });
    
    it("Validate Sorting by Name (Z to A)", () => { // name desc
        //Storing the product names in array before sorting
        let originalNames = [];
        productList.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);
        });
        //sort via button
        productList.sortBtn().select("Name (Z to A)");
        productList.sortBtn().should("have.value", "za");
        //Get product names after sort via button
        let sortedNames = [];
        productList.productName().then(($elements) => {
            sortedNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(sortedNames);
            //sorting in reverse stored originalNames for comparison
            const expectedNames = [...originalNames].sort().reverse();
            console.log(expectedNames);
            //Assertion
            expect(sortedNames).to.deep.equal(expectedNames);
        });
    });

    it("Validate Sorting by Price (Low to High)", () => { // price asc
        //Storing the prices in array before sorting
        productList.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

            //sort via button
            productList.sortBtn().select("Price (low to high)");
            productList.sortBtn().should("have.value", "lohi");
            //Get prices after sort via button
            productList.productPrice().then(($elements) => {
                const sortedPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
                console.log(sortedPrices);
                //sorting in reverse stored originalPrices for comparison
                const expectedPrices = [...originalPrices].sort((a, b) => a - b);
                console.log(expectedPrices);
            
                //Assertion
                expect(sortedPrices).to.deep.equal(expectedPrices);
            
            });
        });
 
    });

    it("Validate Sorting by Price (High to Low)", () => { // price desc
        //Storing the prices in array before sorting
        productList.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

            //sort via button
            productList.sortBtn().select("Price (high to low)");
            productList.sortBtn().should("have.value", "hilo");
            //Get prices after sort via button
            productList.productPrice().then(($elements) => {
                const sortedPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
                console.log(sortedPrices);
                //sorting in reverse stored originalPrices for comparison
                const expectedPrices = [...originalPrices].sort((a, b) => b - a);
                console.log(expectedPrices);
            
                //Assertion
                expect(sortedPrices).to.deep.equal(expectedPrices);
            
            });
        });
 
    });

    //validate adding product to cart
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
    

    //validate removing product to cart
    it("Validate Removing Products from Cart", () => {
        //randomly select and click "Add to cart" buttons
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
                return cy.wrap(randomCount); //store selected count
            })

            .then((randomCount) => { //get stored selected count
                productList.addToCartBtn()
                    .filter((index, btn) => btn.innerText.trim() === "Remove")
                    .then(($removeBtns) => {
                        let initialCount = $removeBtns.length; //Number of products in the cart
    
                        //validate cart count matches initial count
                        cart.cartBtn().should("have.text", initialCount.toString());
    
                        if (initialCount > 0) {
                            cy.wrap($removeBtns).each(($btn, index) => {
                                cy.wrap($btn).click();
                                initialCount--; //decrement count after each click
                                cart.cartBtn().should("have.text", initialCount > 0 ? initialCount.toString() : ""); //validate cart count after removal
                            });
                        }
                    });
            });
    });
    
       
});

   
