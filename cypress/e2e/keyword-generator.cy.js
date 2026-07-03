describe('Keyword Generator', () => {
    beforeEach(() => {
        cy.visit('/keyword-generator');
    });

    it('has defaults ready on first load', () => {
        cy.get('[data-cy="generator-text"]').should('not.have.value', '');
        cy.get('[data-cy="generate"]').should('not.be.disabled');
    });

    it('generates keyword groups for the selected n-grams', () => {
        cy.get('[data-cy="generate"]').click();

        cy.get('[data-cy="results"]').contains('1-gram');
        cy.get('[data-cy="results"]').contains('2-gram');
        cy.get('[data-cy="results"]').contains('3-gram');
    });

    it('disables generate until the input changes', () => {
        cy.get('[data-cy="generate"]').click();
        cy.get('[data-cy="generate"]').should('be.disabled');

        cy.get('[data-cy="generator-text"]').type(' more words');
        cy.get('[data-cy="generate"]').should('not.be.disabled');
    });

    it('shows an empty state text for n-grams without results', () => {
        cy.get('[data-cy="generator-text"]').clear().type('quick brown');
        cy.get('[data-cy="generate"]').click();

        cy.get('[data-cy="results"]').contains('3-gram (0)');
        cy.get('[data-cy="results"]').contains('No n-gram result');
    });

    it('resets input and results', () => {
        cy.get('[data-cy="generate"]').click();
        cy.get('[data-cy="reset"]').click();

        cy.get('[data-cy="generator-text"]').should('have.value', '');
        cy.get('[data-cy="results"]').contains('No results yet');
    });

    it('disables reset when there is nothing to reset', () => {
        cy.get('[data-cy="reset"]').should('not.be.disabled');

        cy.get('[data-cy="reset"]').click();
        cy.get('[data-cy="reset"]').should('be.disabled');
    });

    it('shows an error when the text is empty', () => {
        cy.get('[data-cy="generator-text"]').clear();
        cy.get('[data-cy="generate"]').click();

        cy.contains('Enter text!');
    });

    it('shows an error when no n-gram is selected', () => {
        cy.get('[data-cy="reset"]').click();
        cy.get('[data-cy="generator-text"]').type('quick brown fox');
        cy.get('[data-cy="generate"]').click();

        cy.contains('Select at least one n-gram size.');
    });
});
