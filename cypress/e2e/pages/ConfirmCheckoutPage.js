class Checkout
    {

    logo() { return cy.get(".app_logo"); }

    pageTitle() { return cy.get(".title"); }
    infoCntr() { return cy.get(".checkout_info"); }
  
    qtyLbl() { return cy.get(".cart_quantity_label"); }
    descLbl() { return cy.get(".cart_desc_label"); }
    
    productCtnr() { return cy.get(".cart_item"); }
    productQty() { return cy.get(".cart_quantity"); }

    productName() { return cy.get(".inventory_item_name"); }
    productDesc() { return cy.get(".inventory_item_desc"); }
    productPrice() { return cy.get(".inventory_item_price"); }

    summaryInfo() { return cy.get(".summary_info"); }
    paymentInfo() { return cy.get("div[data-test='payment-info-label']"); }
    paymentVal() { return cy.get("div[data-test='payment-info-value']"); }
    shippingInfo() { return cy.get("div[data-test='shipping-info-label']"); }
    shippingVal() { return cy.get("div[data-test='shipping-info-value']"); }
    totalPriceLbl() { return cy.get("div[data-test='total-info-label']"); }
    subTotal() { return cy.get("div[data-test='subtotal-label']"); }
    tax() { return cy.get("div[data-test='tax-label']"); } //tax 1.0801
    totalPrice() { return cy.get("div[data-test='total-label']"); }

    

    cancelBtn() { return cy.get("#cancel"); }
    continueBtn() { return cy.get("#continue"); }
    
    errorMsg() { return cy.get("h3"); }

    }
    export default Checkout;