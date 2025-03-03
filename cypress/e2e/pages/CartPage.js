class Cart
    {

    logo() { return cy.get(".app_logo"); }
    //cartBtn() { return cy.get(".shopping_cart_link"); }
    pageTitle() { return cy.get(".title"); }
    productCtnr() { return cy.get(".cart_item"); }
  
    productName() { return cy.get(".inventory_item_name"); }
    productDesc() { return cy.get(".inventory_item_desc"); }
    productPrice() { return cy.get(".inventory_item_price"); }

    removeToCartBtn() { return cy.get("button.cart_button"); }
    
    continueToShopping() { return cy.get ("#continue-shopping"); }
    checkoutBtn() { return cy.get ("#checkout"); }

    }
    export default Cart;