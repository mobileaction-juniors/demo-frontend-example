describe('Keyword Generator', () => {
    beforeEach(() => {
        cy.visit('/keyword-generator')
    })

    it('enters text and generates keywords on button click', () => {
        const inputText = 'Quick brown fox jump over fox'

        cy.get('[data-cy="keyword-generator-input"] input')
            .should('be.visible')
            .type(inputText)

        cy.get('[data-cy="keyword-generator-generate"]').click()

        cy.get('[data-cy="keyword-generator-select"]').click()
        cy.contains('1-Gram').should('be.visible').click()
        // to close select options
        cy.get('body').click(0, 0)

        cy.contains('quick').should('be.visible')
        cy.contains('brown').should('be.visible')
        cy.contains('fox').should('be.visible')
    })

    it('filters generated keywords by n-gram multi-select', () => {
        const inputText = 'Quick brown fox jump over fox'

        cy.get('[data-cy="keyword-generator-input"] input')
            .should('be.visible')
            .type(inputText)

        cy.get('[data-cy="keyword-generator-generate"]').click()

        cy.get('[data-cy="keyword-generator-select"]').click()
        cy.contains('1-Gram').should('be.visible').click()
        cy.contains('3-Gram').should('be.visible').click()
        cy.contains('5-Gram').should('be.visible').click()
        // to close select options
        cy.get('body').click(0, 0)

        cy.get('[data-cy="keyword-generator-generate"]').click()

        cy.contains('1-Gram:').should('be.visible')
        cy.contains('3-Gram:').should('be.visible')
        cy.contains('5-Gram:').should('be.visible')
        cy.contains('4-Gram').should('not.be.visible')
    })

    it('removes stop words', () => {
        const inputText = 'Quick they brown fox a to jump this over fox it are hello was'

        cy.get('[data-cy="keyword-generator-input"] input')
            .should('be.visible')
            .type(inputText)

        cy.get('[data-cy="keyword-generator-generate"]').click()

        cy.get('[data-cy="keyword-generator-select"]').click()
        cy.contains('1-Gram').should('be.visible').click()

        // to close select options
        cy.get('body').click(0, 0)

        cy.get('[data-cy="keyword-generator-generate"]').click()

        cy.contains('1-Gram:').parent().within(() => {
            cy.contains('quick').should('be.visible')
            cy.contains('brown').should('be.visible')
            cy.contains('fox').should('be.visible')
            cy.contains('jump').should('be.visible')
            cy.contains('over').should('be.visible')
            cy.contains('hello').should('be.visible')

            cy.contains(/^they$/).should('not.exist')
            cy.contains(/^a$/).should('not.exist')
            cy.contains(/^to$/).should('not.exist')
            cy.contains(/^this$/).should('not.exist')
            cy.contains(/^it$/).should('not.exist')
            cy.contains(/^are$/).should('not.exist')
            cy.contains(/^was$/).should('not.exist')
        })
    })
    it('keyword counts and densities', () => {
        const inputText = 'Quick brown fox jump over fox'

        cy.get('[data-cy="keyword-density"]')
            .find('textarea')
            .should('be.visible')
            .clear()
            .type(inputText)


        cy.get('[data-cy="keyword-density-submit"]').click()

        cy.get('[data-cy="keyword-density"]').should('contain.text', 'Keyword Count & Density')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('be.visible')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'Keyword')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'Count')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'Density %')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'fox')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', '2')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', '33')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'Quick')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'brown')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'jump')
        cy.get('[data-cy="keyword-density-grid-panel"]').should('contain.text', 'over')
    })
})
