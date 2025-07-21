describe('Navigation and Redirects', () => {
  it('should navigate to keyword generator page', () => {
    cy.visit('/')
    cy.url().should('include', '/')
  })

  it('should navigate to keyword density page', () => {
    cy.visit('/keyword-density')
    cy.url().should('include', '/keyword-density')
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Density')
  })

  it('should navigate to keyword generator page', () => {
    cy.visit('/keyword-generator')
    cy.url().should('include', '/keyword-generator')
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Generator')
  })

  it('should redirect from generator to density with text', () => {
    cy.visit('/keyword-generator')
    
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      
      cy.url().should('include', '/keyword-density')
      cy.get('textarea').should('contain.value', data.sampleTexts.simple)
    })
  })

  it('should preserve state between page navigations', () => {
    cy.fixture('example').then((data) => {
      cy.visit('/keyword-generator')
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.visit('/keyword-density')
      cy.get('textarea').should('not.be.empty')
      
      cy.visit('/keyword-generator')
      cy.get('textarea').should('not.be.empty')
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
    })
  })

  it('should handle direct URL access with query parameters', () => {
    const testText = 'This is a test text for direct access'
    const encodedText = encodeURIComponent(testText)
    
    cy.visit(`/keyword-density?text=${encodedText}`)
    cy.get('textarea').should('contain.value', testText)
  })

  it('should handle browser back and forward navigation', () => {
    cy.fixture('example').then((data) => {
      cy.visit('/keyword-generator')
      cy.get('textarea').type(data.sampleTexts.simple)
      
      cy.get('button').contains('Analyze Density').click()
      cy.url().should('include', '/keyword-density')
      
      cy.go('back')
      cy.url().should('include', '/keyword-generator')
      cy.get('textarea').should('contain.value', data.sampleTexts.simple)
      
      cy.go('forward')
      cy.url().should('include', '/keyword-density')
      cy.get('textarea').should('contain.value', data.sampleTexts.simple)
    })
  })

  it('should maintain data consistency across routes', () => {
    cy.fixture('example').then((data) => {
      cy.visit('/keyword-generator')
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      
      cy.get('button').contains('2-gram').click()
      cy.get('button').contains('4-gram').click()
      
      cy.get('input[type="checkbox"]').uncheck({ force: true })
      
      cy.visit('/keyword-density')
      cy.get('textarea').should('not.be.empty')
      
      cy.visit('/keyword-generator')
      cy.get('textarea').should('not.be.empty')
      cy.get('button').contains('2-gram').should('be.visible')
      cy.get('button').contains('4-gram').should('be.visible')
      cy.get('input[type="checkbox"]').should('exist')
    })
  })

  it('should handle invalid routes gracefully', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false })
    cy.url().should('include', '/invalid-route')
  })

  it('should test cross-page functionality flow', () => {
    cy.fixture('example').then((data) => {
      cy.visit('/keyword-generator')
      cy.get('textarea').type(data.sampleTexts.complex)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('button').contains('Analyze Density').click()
      cy.url().should('include', '/keyword-density')
      
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-density-table').should('be.visible')
    })
  })

  it('should test URL encoding and decoding', () => {
    const specialText = 'Text with special characters: @#$%^&*()+=[]{}|;:,.<>?'
    cy.visit('/keyword-generator')
    cy.get('textarea').type(specialText)
    cy.get('button').contains('Analyze Density').click()
    
    cy.url().should('include', '/keyword-density')
    cy.get('textarea').should('contain.value', specialText)
  })
})