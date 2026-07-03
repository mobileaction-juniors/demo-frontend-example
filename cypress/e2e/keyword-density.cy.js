describe('Keyword Density', () => {
  beforeEach(() => {
    cy.visit('/keyword-density')
  })

  it('calculates density correctly', () => {

    cy.get('textarea[placeholder*="Enter your text here"]').type('apple banana apple orange banana apple')
    
    cy.contains('button', 'Calculate Density').should('not.be.disabled').click()
    
    cy.contains('Density Calculated').should('exist')

    cy.get('.ag-theme-alpine').should('exist')

    cy.get('.ag-cell-value').contains('apple').should('exist')
    cy.get('.ag-cell-value').contains('banana').should('exist')
    cy.get('.ag-cell-value').contains('orange').should('exist')
  })
})
