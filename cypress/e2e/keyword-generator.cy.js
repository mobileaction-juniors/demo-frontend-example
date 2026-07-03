describe('Keyword Generator', () => {
  beforeEach(() => {
    cy.visit('/keyword-generator')
  })

  it('generates keywords correctly', () => {

    cy.get('textarea[placeholder*="Enter your text here"]').type('This is a test application for testing the generation of keywords and n-grams.')
    
    cy.contains('button', 'Generate Keywords').should('not.be.disabled').click()
    
    cy.contains('Keywords Generated').should('exist')

    cy.contains('test').should('exist')
    cy.contains('application').should('exist')
    cy.contains('testing').should('exist')
    cy.contains('generation').should('exist')
    cy.contains('keywords').should('exist')
  })

  it('can clear text', () => {
    cy.get('textarea[placeholder*="Enter your text here"]').type('Some test data')
    cy.contains('button', 'Clear Text').click()
    
    cy.get('textarea[placeholder*="Enter your text here"]').should('have.value', '')
    cy.contains('Text Cleared').should('exist')
  })
})
