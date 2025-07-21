describe('Mobile View Tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  })

  it('should test keyword generator on mobile', () => {
    cy.visit('/keyword-generator')
    
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Generator')
    cy.get('textarea').should('be.visible')
    cy.get('button').contains('Generate Keywords').should('be.visible')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Generate Keywords').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-keyword-badge').should('have.length.at.least', 1)
    })
  })

  it('should test keyword density analyzer on mobile', () => {
    cy.visit('/keyword-density')
    
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Density')
    cy.get('textarea').should('be.visible')
    cy.get('button').contains('Analyze Density').should('be.visible')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-density-table').should('be.visible')
    })
  })

  it('should test responsive layout on mobile', () => {
    cy.visit('/keyword-generator')
    
    cy.get('.ma-container').should('exist')
    cy.get('.ma-controls').should('be.visible')
    cy.get('.ma-ngram-grid').should('be.visible')
    
    cy.get('button').contains('1-gram').should('be.visible')
    cy.get('button').contains('2-gram').should('be.visible')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Generate Keywords').should('be.visible').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
    })
  })

  it('should test mobile navigation between pages', () => {
    cy.visit('/keyword-generator')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      
      cy.url().should('include', '/keyword-density')
      cy.get('textarea').should('contain.value', data.sampleTexts.simple)
    })
  })

  it('should test table responsiveness on mobile', () => {
    cy.visit('/keyword-density')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      cy.get('button').contains('Analyze Density').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-table-container').should('be.visible')
      cy.get('.ma-density-table').should('be.visible')
      
      cy.get('table thead th').should('be.visible')
      cy.get('table tbody tr').should('have.length.at.least', 1)
    })
  })

  it('should test controls layout on mobile', () => {
    cy.visit('/keyword-generator')
    
    cy.get('.ma-controls').should('be.visible')
    cy.get('button').contains('Generate Keywords').should('be.visible')
    cy.get('button').contains('Clear').should('be.visible')
    cy.get('button').contains('Analyze Density').should('be.visible')
    
    cy.get('.ma-ngram-grid button').should('have.length.at.least', 3)
  })

  it('should test pagination on mobile', () => {
    cy.visit('/keyword-density')
    
    const longText = 'word '.repeat(100) + 'another '.repeat(50) + 'test '.repeat(25)
    cy.get('textarea').clear().type(longText)
    cy.get('button').contains('Analyze Density').click()
    cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
    
    cy.get('table tbody tr').then(($rows) => {
      if ($rows.length >= 10) {
        cy.get('.ma-pagination').should('be.visible')
      }
    })
    cy.get('.ma-pagination-info').should('be.visible')
  })

  it('should test mobile scrolling behavior', () => {
    cy.visit('/keyword-generator')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.complex)
      cy.get('button').contains('Generate Keywords').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.scrollTo('bottom')
      cy.get('.ma-results-card').should('be.visible')
      
      cy.scrollTo('top')
      cy.get('.ma-input-card').should('be.visible')
    })
  })
})