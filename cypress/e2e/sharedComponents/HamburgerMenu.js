class HamburgerMenu
    {
        hamburgerMenu() { return cy.get("#react-burger-menu-btn"); }
        sideMenu() { return cy.get(".bm-menu"); }
        menuList() { return cy.get(".bm-item-list a[href]"); }
        closeSideMenuBtn() { return cy.get("#react-burger-cross-btn"); }
    }
    export default HamburgerMenu;