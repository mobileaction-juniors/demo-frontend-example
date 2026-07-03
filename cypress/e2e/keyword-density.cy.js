describe('Keyword Density', () => {
    beforeEach(() => {
        cy.visit('/keyword-density');
    });

    it('shows density rows for the default text', () => {
        cy.get('[data-cy="density-grid"] .ag-row').should('have.length.greaterThan', 0);
    });

    it('recalculates density for new text', () => {
        cy.get('[data-cy="density-text"]').clear().type('apple apple banana');
        cy.get('[data-cy="calculate"]').click();

        cy.get('[data-cy="density-grid"]').contains('apple');
        cy.get('[data-cy="density-grid"]').contains('banana');
    });

    it('copies the table as csv', () => {
        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText').as('writeText').resolves();
        });

        cy.get('[data-cy="copy-csv"]').click();

        cy.get('@writeText').should('have.been.calledOnce');
        cy.get('@writeText').should('have.been.calledWithMatch', 'Keyword');
    });
});
