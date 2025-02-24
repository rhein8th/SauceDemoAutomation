class Cart
    {

    logo() { return cy.get(".app_logo"); }
    cartBtn() { return cy.get(".shopping_cart_link"); }
    backBtn() { return cy.get("#back-to-products"); }
    productCtnr() { return cy.get(".inventory_details_container"); }
    productImg() { return cy.get(".inventory_details_img"); }
    productName() { return cy.get(".inventory_details_name"); }
    productDesc() { return cy.get(".inventory_details_desc"); }
    productPrice() { return cy.get(".inventory_details_price"); }
    addToCartBtn() { return cy.get("button.btn_inventory"); }
    
    }
    export default Cart;