class HamburgerMenu
    {
        socialMedias() { return cy.get(".social >li"); }
        copyrightNotice() { return cy.get(".footer_copy"); }
    }
    export default HamburgerMenu;