describe('Keyword Generator', () => {
    beforeEach(() => {
        cy.visit('/keyword-generator');
    });

    it('should generate keywords after clicking the generate button', () => {
        cy.contains('label', 'N-grams to show:').parent().click();
        cy.contains('1-gram').click();
        cy.contains('label', 'N-grams to show:').parent().click();

        cy.get('textarea[placeholder="Paste an app description..."]')
            .type('Quick brown fox jump over fox');
        
        cy.contains('1-gram:').should('not.exist');
        cy.contains(/^quick$/).should('not.exist');

        cy.contains('button', 'Generate Keywords').click();

        cy.contains('1-gram:').should('exist');
        cy.contains(/^quick$/).should('exist');
        cy.contains(/^brown$/).should('exist');
        cy.contains(/^fox$/).should('exist');
    });

    it('should filter generated keywords by selected n-grams', () => {
        cy.contains('label', 'N-grams to show:').parent().click();
        cy.contains('2-gram').click();
        cy.contains('label', 'N-grams to show:').parent().click();

        cy.get('textarea[placeholder="Paste an app description..."]')
            .type('Quick brown fox jump over fox');
        
        cy.contains('button', 'Generate Keywords').click();

        cy.contains('2-gram:').should('exist');
        cy.contains('1-gram:').should('not.exist');
        cy.contains('3-gram:').should('not.exist');
        
        cy.contains(/^quick brown$/).should('exist');
        cy.contains(/^brown fox$/).should('exist');

        cy.contains(/^quick$/).should('not.exist');
        cy.contains(/^brown$/).should('not.exist');
        cy.contains(/^fox$/).should('not.exist');
    });

    it('should remove stop words from generated keywords', () => {
        cy.contains('label', 'N-grams to show:').parent().click();
        cy.contains('1-gram').click();
        cy.contains('label', 'N-grams to show:').parent().click();

        cy.get('textarea[placeholder="Paste an app description..."]')
            .type('The quick brown fox jump over fox');
        
        cy.contains('button', 'Generate Keywords').click();

        cy.contains('1-gram:').should('exist');

        cy.contains(/^quick$/).should('exist');
        cy.contains(/^brown$/).should('exist');
        cy.contains(/^fox$/).should('exist');

        cy.contains(/^the$/).should('not.exist');
        cy.contains(/^over$/).should('not.exist');
    });
});
