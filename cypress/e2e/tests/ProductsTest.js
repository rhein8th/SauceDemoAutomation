import ProductsPage from "../pages/ProductsPage";
    const product = new ProductsPage();

    before(()=>{
        cy.clearAppData();
    })

    beforeEach(() => {
        cy.login();
        // cy.visit("/inventory"); 
    });

    describe("Cart Page Test Suite", ()=>{

        it("Test 1",()=>{
            product.pageTitle().should("be.visible");
        })

    });