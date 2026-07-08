/* eslint-env mocha */
/* global cy */

describe('Keyword Generator', () => {
    beforeEach(() => {
        cy.visit('/keyword-generator');
    });

    // Covers keyword generation triggered by the submit button.
    it('generates keywords from entered text on button click', () => {
        cy.get('textarea#keyword-input').type('Bright mobile apps grow quickly');
        cy.contains('button', 'Generate Keywords').click();

        cy.contains('h2', '1-Gram').parent().should('contain.text', 'bright');
        cy.contains('h2', '2-Gram').parent().should('contain.text', 'bright mobile');
        cy.contains('h2', '3-Gram').parent().should('contain.text', 'bright mobile apps');
    });

    // Covers filtering generated results by selected n-gram sizes.
    it('filters generated results using the n-gram multi-select', () => {
        cy.get('textarea#keyword-input').type('alpha beta gamma delta');
        cy.contains('button', 'Generate Keywords').click();

        cy.get('[data-testid="gram-size-select"]').click();
        cy.contains('.ma-select-option', /^1$/).click();
        cy.contains('.ma-select-option', /^3$/).click();

        cy.contains('h2', '2-Gram').should('be.visible');
        cy.contains('h2', '1-Gram').should('not.exist');
        cy.contains('h2', '3-Gram').should('not.exist');
        cy.contains('h2', '2-Gram').parent().should('contain.text', 'alpha beta');
    });

    // Covers removing configured stop words before generation.
    it('removes configured stop words before generating keywords', () => {
        cy.get('textarea#keyword-input').type('the swift fox and the clever dog');
        cy.get('input#unwanted-words').clear().type('the, and');
        cy.contains('button', 'Generate Keywords').click();

        cy.contains('h2', '1-Gram').parent()
            .should('contain.text', 'swift')
            .and('contain.text', 'clever')
            .and('not.contain.text', 'the')
            .and('not.contain.text', 'and');
        cy.contains('h2', '2-Gram').parent().should('contain.text', 'swift fox');
    });
});
