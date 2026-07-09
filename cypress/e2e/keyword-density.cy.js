/* eslint-env mocha */
/* global cy */

describe('Keyword count and density', () => {
    // Covers the keyword count and density submission flow.
    it('shows keyword counts and density after submission', () => {
        cy.visit('/keyword-density');
        cy.get('textarea#keyword-density-text').clear().type('apple banana apple cherry');
        cy.contains('button', 'Count').click();

        cy.contains('[role="row"]', 'apple')
            .should('contain.text', '2')
            .and('contain.text', '50.0%');
        cy.contains('[role="row"]', 'banana')
            .should('contain.text', '1')
            .and('contain.text', '25.0%');
        cy.contains('[role="row"]', 'cherry')
            .should('contain.text', '1')
            .and('contain.text', '25.0%');
    });
});
