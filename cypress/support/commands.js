import LoginPage from "../e2e/pages/LoginPage";
import HamburgerMenu from "../e2e/sharedComponents/HamburgerMenu";
import CartNavigation from "../e2e/sharedComponents/CartNavigation";
import Footer from "../e2e/sharedComponents/Footer";
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

const logIn = new LoginPage();
const hamburger = new HamburgerMenu();
const cart = new CartNavigation();
const footer = new Footer();

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

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })