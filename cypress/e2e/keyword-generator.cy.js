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

        cy.get('[data-testid="gram-size-select"]').click();
        cy.contains('.ma-select-option', /^1$/).click();
        cy.contains('.ma-select-option', /^3$/).click();
        cy.contains('h1', 'Keyword Generator').click();
        cy.get('.ma-select-option').should('not.exist');

        cy.contains('button', 'Generate Keywords').click();

        cy.contains(/2-gram/i).should('be.visible');
        cy.contains(/1-gram/i).should('not.exist');
        cy.contains(/3-gram/i).should('not.exist');
        cy.contains(/2-gram/i).parent().should('contain.text', 'alpha beta');
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

    // Covers deduplication of repeated words in 1-gram results.
    it('does not render duplicate keywords multiple times in 1-gram results', () => {
        cy.get('textarea#keyword-input').type('apple apple banana apple');
        cy.contains('button', 'Generate Keywords').click();

        cy.contains('h2', '1-Gram').parent().within(() => {
            cy.get('.single-tag').should('have.length', 2);
            cy.get('.single-tag').filter(':contains("apple")').should('have.length', 1);
            cy.get('.single-tag').filter(':contains("banana")').should('have.length', 1);
        });
    });
});
