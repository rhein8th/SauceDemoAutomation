import LoginPage from "../e2e/pages/LoginPage";
import HamburgerMenu from "../e2e/sharedComponents/HamburgerMenu";
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

const logIn = new LoginPage();
const hamburger = new HamburgerMenu();

Cypress.Commands.add("clearAppData", () => {
    cy.clearCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
});

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