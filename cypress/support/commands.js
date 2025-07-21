Cypress.Commands.add('visitKeywordGenerator', () => {
  cy.visit('/keyword-generator')
})

Cypress.Commands.add('visitKeywordDensity', () => {
  cy.visit('/keyword-density')
})

Cypress.Commands.add('enterText', (text) => {
  cy.get('textarea').clear().type(text)
})

Cypress.Commands.add('clickAnalyzeButton', () => {
  cy.get('button:contains("Analyze Density")').click()
})

Cypress.Commands.add('clickGenerateButton', () => {
  cy.get('button:contains("Generate Keywords")').click()
})

Cypress.Commands.add('waitForResults', () => {
  cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('clearDefaultText', () => {
  cy.get('textarea').clear()
})

Cypress.Commands.add('checkButtonDisabled', (buttonText) => {
  cy.get('button').contains(buttonText).should('satisfy', ($el) => {
    return $el.attr('disabled') !== undefined || $el.hasClass('disabled') || $el.is(':disabled') || $el.hasClass('ak-button--disabled')
  })
})

Cypress.Commands.add('checkButtonEnabled', (buttonText) => {
  cy.get('button').contains(buttonText).should('satisfy', ($el) => {
    return $el.attr('disabled') === undefined && !$el.hasClass('disabled') && !$el.is(':disabled') && !$el.hasClass('ak-button--disabled')
  })
})

Cypress.Commands.add('checkButtonVariant', (buttonText, variant) => {
  cy.get('button').contains(buttonText).should('satisfy', ($el) => {
    return $el.attr('variant') === variant || $el.hasClass(variant) || $el.hasClass(`ak-button--${variant}`)
  })
})