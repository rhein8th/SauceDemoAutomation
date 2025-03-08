import LoginPage from "../e2e/pages/LoginPage";
import HamburgerMenu from "../e2e/sharedComponents/HamburgerMenu";
import CartNavigation from "../e2e/sharedComponents/CartNavigation";
import Footer from "../e2e/sharedComponents/Footer";
import ProductListPage from "../e2e/pages/ProductListPage";
import ProductPage from "../e2e/pages/ProductPage";
import CartPage from "../e2e/pages/CartPage";
import CheckoutPage from "../e2e/pages/CheckoutPage";

// -- This is a parent command --

const logIn = new LoginPage();
const hamburger = new HamburgerMenu();
const cart = new CartNavigation();
const footer = new Footer();
const productList = new ProductListPage();
const product = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

//Clearing App Data
Cypress.Commands.add("clearAppData", () => {
    cy.clearCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
});


//Login
Cypress.Commands.add("login", () => {
    cy.fixture("users").then((users) => {
        const username = users.validUser.validUsername;
        const password = users.validUser.validPassword;

        cy.visit("/");

        logIn.usernameInput().clear().type(username);
        logIn.passwordInput().clear().type(password);
        logIn.loginBtn().click();
        cy.url().should("include", "/inventory");
    });
});


//Hamburger Menu Validation
Cypress.Commands.add("validateHamburgerMenu", () =>{

    cy.fixture("menu.json").as("navs");
    
        //Verifying Navigation Sidebar if visible
    hamburger.hamburgerMenu().click();
    hamburger.sideMenu().should("be.visible");

    //Verifying Hamburger Menu Text if equal to the Menu Data in fixtures
        cy.get("@navs").then((menu) => {
        const menuItems = menu.menuItems;
            
            //Iterate through the menu items
            menuItems.forEach((item, index) => {
                // Validate main menu item text
                hamburger.menuList().eq(index)
                .invoke("text")
                .then((text) => {
                    expect(text.trim()).to.equal(item);
                    //cy.log(item)
                });
            });
                
         })
    hamburger.closeSideMenuBtn().click();
    hamburger.sideMenu().should("not.be.visible");

})

//Cart Button Validation
Cypress.Commands.add("validateCartButton", () =>{
    cart.cartBtn().should("be.visible").click();
    cy.url().should("include", "/cart");
})

//Footer Validation
Cypress.Commands.add("validateFooter", () => {

    footer.socialMedias().should("be.visible");
    footer.copyrightNotice().should("be.visible");

    cy.fixture("footer.json").as("footer");

    cy.get("@footer").then((footerData) => {
        const socialMediaLinks = footerData.socialMediaLinks; 

        // Validate if URLs are equal to footer fixture
        footer.socialMedias().each(($link, index) => {
            cy.wrap($link)
                .invoke("attr", "href") 
                .then((href) => {
                    expect(href).to.equal(socialMediaLinks[index].link);
                });
        });

        footer.copyrightNotice() // Validate copyright text
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.equal(footerData.copyright.notice);
            });
    });
});

//Adding product to cart
Cypress.Commands.add("selectProduct", (productNameFT) => {
    productList.productName().each(($el, index) => {
        if ($el.text().trim() === productNameFT) {
        //if ($el.text().includes(productNameFT)) {
            productList.addToCartBtn().eq(index).click();
            productList.addToCartBtn().eq(index).should("have.text", "Remove");
        }
    });
});


//Proceeding to Product page from fixture data
Cypress.Commands.add("proceedProductpage", () => {
    cy.fixture("product.json").then((productData) => {
        const targetProduct = productData.productName;
        productList.productCtnr().should("be.visible");

        productList.productName().each(($el, index) => {
            if ($el.text().trim() === targetProduct) {
                cy.wrap($el).invoke("text").then((expectedName) => {
                    productList.productDesc().eq(index).should("be.visible").invoke("text").then((expectedDesc) => {
                        productList.productPrice().eq(index).should("be.visible").invoke("text").then((expectedPrice) => {
                            productList.productName().eq(index).click(); 

                            product.productCtnr().should("be.visible");

                            product.productName().should("have.text", expectedName.trim());
                            product.productDesc().should("have.text", expectedDesc.trim());
                            product.productPrice().should("have.text", expectedPrice.trim());
                        });
                    });
                });
            }
        });
    });
});


//Validate Cart page
Cypress.Commands.add("validateCartPage", () => {
    cy.validateHamburgerMenu();
    cy.validateCartButton().go("back");
    cy.validateFooter();
    cartPage.logo().should("be.visible");
    cartPage.pageTitle().should("be.visible");
    cartPage.productCtnr().should("be.visible");
    cartPage.removeToCartBtn().should("be.visible");
    cartPage.continueToShopping().should("be.visible");
    cartPage.checkoutBtn().should("be.visible");   
});

Cypress.Commands.add("validateCartPageButtons", () => {

    cartPage.continueToShopping().click();
    cy.url().should("include", "/inventory").go("back");
    cartPage.checkoutBtn().click();
    cy.url().should("include", "/checkout-step-one");
    
});

Cypress.Commands.add("validateCheckoutpage", () => {
    const addedProducts = [];

    cy.fixture("product.json").as("prod");
    cy.get("@prod").then((product) => {

        product.productNames.forEach((element) => {
            cy.selectProduct(element);

            productList.productName().each(($el, index) => {
                if ($el.text().trim() === element) {
                    
                    productList.productName().eq(index).invoke("text").then((name) => {
                        productList.productDesc().eq(index).invoke("text").then((desc) => {
                            productList.productPrice().eq(index).invoke("text").then((price) => {
                               //cy.log(`Captured: ${name}, ${desc}, ${price}`);
                                addedProducts.push({
                                    name: name.trim(),
                                    desc: desc.trim(),
                                    price: price.trim(),
                                });
                            });
                        });
                    });
                }
            });
        });
    });
    cy.wrap(addedProducts).as('addedProducts');

     cy.validateCartButton();
     cartPage.checkoutBtn().click();

});

Cypress.Commands.add("fillUpCheckoutPage",  () => {

    cy.fixture("users").then((users) => {
        const fName = users.userInfo.firstName;
        const lName = users.userInfo.lastName;
        const zCode = users.userInfo.zipCode;

        cy.validateCheckoutpage();

        checkoutPage.fNameInput().type(fName);
        checkoutPage.lNameInput().type(lName);
        checkoutPage.zipCodeInput().type(zCode);

        checkoutPage.continueBtn().click();
        cy.url().should("include","/checkout-step-two");
    });

})
