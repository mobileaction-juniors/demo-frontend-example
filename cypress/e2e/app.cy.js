const openPage = (name) => {
    cy.get('[data-cy="menu-button"]').click();
    cy.get('[data-cy="menu"]').contains(name).click();
};

describe('App shell', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('navigates between pages through the menu', () => {
        openPage('Keyword Generator');
        cy.url().should('include', '/keyword-generator');

        openPage('Keyword Density');
        cy.url().should('include', '/keyword-density');
    });

    it('closes the menu with escape', () => {
        cy.get('[data-cy="menu-button"]').click();
        cy.get('[data-cy="menu"]').should('be.visible');

        cy.get('body').type('{esc}');
        cy.get('[data-cy="menu"]').should('not.exist');
    });

    it('shares the input text between the two pages', () => {
        openPage('Keyword Generator');
        cy.get('[data-cy="generator-text"]').clear().type('hello world');

        openPage('Keyword Density');
        cy.get('[data-cy="density-text"]').should('have.value', 'hello world');
    });

    it('toggles the dark theme', () => {
        cy.get('[data-cy="theme-toggle"]').click();
        cy.get('html').should('have.class', 'dark');

        cy.get('[data-cy="theme-toggle"]').click();
        cy.get('html').should('not.have.class', 'dark');
    });

    it('keeps the chosen theme after a reload', () => {
        cy.get('[data-cy="theme-toggle"]').click();
        cy.get('html').should('have.class', 'dark');

        cy.reload();
        cy.get('html').should('have.class', 'dark');
    });
});
