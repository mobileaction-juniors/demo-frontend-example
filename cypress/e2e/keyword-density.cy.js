describe('Keyword Count & Density', () => {
    beforeEach(() => {
        cy.visit('/keyword-density');
    });

    it('should show keyword counts and density percentages after submitting text', () => {
        cy.get('textarea[placeholder="Paste an app description..."]')
            .type('Quick brown fox fox');

        cy.contains('button', 'Submit').click();

        cy.get('.ag-root-wrapper').within(() => {
            cy.contains(/^fox$/).should('exist');
            cy.contains(/^2$/).should('exist');
            cy.contains(/^50%$/).should('exist');
            
            cy.contains(/^quick$/).should('exist');
            cy.contains(/^brown$/).should('exist');
            cy.contains(/^25%$/).should('exist');
        });
    });
});