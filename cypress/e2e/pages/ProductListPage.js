class Products
    {

    logo() { return cy.get(".app_logo"); }
    cartBtn() { return cy.get(".shopping_cart_link"); }
    pageTitle() { return cy.get(".title"); }
    sortBtn() { return cy.get(".product_sort_container"); }
    invetoryList() { return cy.get(".inventory_list"); }
    productCtnr() { return cy.get(".inventory_item"); }
    productImg() { return cy.get(".inventory_item > .inventory_item_img"); }
    productName() { return cy.get(".inventory_item_name"); }
    //productName() { return cy.get("div[data-test='inventory-item-name']"); }
    //productName() { return cy.get("a>div[class='inventory_item_name ']"); }
    productDesc() { return cy.get(".inventory_item_desc"); }
    productPrice() { return cy.get(".inventory_item_price"); }
    addToCartBtn() { return cy.get("button.btn_inventory"); }
    
    }
    export default Products;