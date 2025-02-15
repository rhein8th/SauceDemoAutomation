class HamburgerMenu
    {
        socialMedias() { return cy.get("li > a"); }
        copyrightNotice() { return cy.get(".footer_copy"); }
    }
    export default HamburgerMenu;