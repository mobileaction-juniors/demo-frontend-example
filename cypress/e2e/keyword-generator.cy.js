describe('Keyword Generator', () => {
    beforeEach(() => {
        cy.visit('/keyword-generator')
    })

    it('enters text and generates keywords on button click', () => {
        const inputText = 'Quick brown fox jump over fox'

        cy.get('input[placeholder="Enter text..."]')
            .should('be.visible')
            .type(inputText)

        cy.contains('Generate').click()

        cy.contains('Select option...').click()
        cy.contains('1-Gram').should('be.visible').click()

        cy.get('body').click(0, 0)

        cy.contains('quick').should('be.visible')
        cy.contains('brown').should('be.visible')
        cy.contains('fox').should('be.visible')
    })

    it('filters generated keywords by n-gram multi-select', () => {
        const inputText = 'Quick brown fox jump over fox'

        cy.get('input[placeholder="Enter text..."]')
            .should('be.visible')
            .type(inputText)

        cy.contains('Generate').click()

        cy.contains('Select option...').click()
        cy.contains('1-Gram').should('be.visible').click()
        cy.contains('3-Gram').should('be.visible').click()
        cy.contains('5-Gram').should('be.visible').click()
        cy.get('body').click(0, 0)

        cy.contains('Generate').click()

        cy.contains('1-Gram:').should('be.visible')
        cy.contains('3-Gram:').should('be.visible')
        cy.contains('5-Gram:').should('be.visible')
        cy.contains('4-Gram').should('not.be.visible')
    })
})
