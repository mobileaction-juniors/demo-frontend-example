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

    it('remove stop words', () => {
        const inputText = 'Quick they brown fox a to jump this over fox it are hello was'

        cy.get('input[placeholder="Enter text..."]')
            .should('be.visible')
            .type(inputText)

        cy.contains('Generate').click()

        cy.contains('Select option...').click()
        cy.contains('1-Gram').should('be.visible').click()
        cy.get('body').click(0, 0)

        cy.contains('Generate').click()

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

        cy.get('input[placeholder="Enter text..."]')
            .should('be.visible')
            .type(inputText)

        cy.contains('Submit').click()

        cy.contains('Keyword Count & Density').should('be.visible')
        cy.get('section').eq(1).should('contain.text', 'Keyword')
        cy.get('section').eq(1).should('contain.text', 'Count')
        cy.get('section').eq(1).should('contain.text', 'Density %')
        cy.get('section').eq(1).should('contain.text', 'fox')
        cy.get('section').eq(1).should('contain.text', '2')
        cy.get('section').eq(1).should('contain.text', '33')
        cy.get('section').eq(1).should('contain.text', 'Quick')
        cy.get('section').eq(1).should('contain.text', 'brown')
        cy.get('section').eq(1).should('contain.text', 'jump')
        cy.get('section').eq(1).should('contain.text', 'over')
    })
})
