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

    it("Validate Product List Page",()=>{
        cy.validateHamburgerMenu();
        cy.validateCartButton();
        cy.validateFooter()

        product.logo().should("be.visible");
        product.pageTitle().should("be.visible");
        product.sortBtn().should("be.visible");
        product.invetoryList().should("be.visible");
        product.productCtnr().should("be.visible");
        product.productImg().should("be.visible");
        product.productName().should("be.visible");
        product.productDesc().should("be.visible");
        product.productPrice().should("be.visible");
        product.addToCartBtn().should("be.visible");
    })
    //validate sort functionality by name asc & desc and  by price asc & desc

    it("Validate Sorting by Name (A to Z)", () => { // name asc
        //Storing the product names in array before sorting
        let originalNames = [];
        product.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);

        });
        //sort via button
        product.sortBtn().select("Name (A to Z)");
        product.sortBtn().should("have.value", "az");
        //Get product names after sort via button
        let sortedNames = [];
        product.productName().then(($elements) => {
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
        product.productName().then(($elements) => {
            originalNames = $elements.toArray().map(el => el.innerText.trim());
            console.log(originalNames);
        });
        //sort via button
        product.sortBtn().select("Name (Z to A)");
        product.sortBtn().should("have.value", "za");
        //Get product names after sort via button
        let sortedNames = [];
        product.productName().then(($elements) => {
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
        product.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

            //sort via button
            product.sortBtn().select("Price (low to high)");
            product.sortBtn().should("have.value", "lohi");
            //Get prices after sort via button
            product.productPrice().then(($elements) => {
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
        product.productPrice().then(($elements) => {
            const originalPrices = $elements.toArray().map(el => parseFloat(el.innerText.replace("$", "").trim()));
            console.log(originalPrices);

            //sort via button
            product.sortBtn().select("Price (high to low)");
            product.sortBtn().should("have.value", "hilo");
            //Get prices after sort via button
            product.productPrice().then(($elements) => {
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


    

});