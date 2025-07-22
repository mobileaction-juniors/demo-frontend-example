describe('Keyword Generator', () => {
  beforeEach(() => {
    cy.visit('/keyword-generator')
  })

  it('should load the page correctly', () => {
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Generator')
    cy.get('textarea').should('be.visible')
    cy.get('button').contains('Generate Keywords').should('be.visible')
    cy.get('button').contains('Clear').should('be.visible')
    cy.get('button').contains('Analyze Density').should('be.visible')
  })

  it('should have disabled buttons when no text is entered', () => {
    cy.get('textarea').clear()
    
    cy.get('button').contains('Generate Keywords').click({ force: true }).then(() => {
      cy.get('.ma-results-content').should('not.exist')
    })
    
    cy.get('button').contains('Clear').click({ force: true }).then(() => {
      cy.get('textarea').should('have.value', '')
    })
    
    cy.get('button').contains('Analyze Density').click({ force: true }).then(() => {
      cy.url().should('not.include', 'keyword-density')
    })
  })

  it('should enable buttons when text is entered', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      cy.url().should('include', 'keyword-density')
      
      cy.go('back')
      cy.get('button').contains('Clear').click()
      cy.get('textarea').should('have.value', '')
    })
  })

  it('should generate keywords when clicking Generate Keywords button', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.complex)
      cy.get('button').contains('Generate Keywords').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-ngram-section').should('exist')
      cy.get('.ma-keyword-badge').should('have.length.at.least', 1)
    })
  })

  it('should test n-gram selection functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      
      cy.get('button').contains('1-gram').should('be.visible')
      cy.get('button').contains('2-gram').should('be.visible')
      cy.get('button').contains('3-gram').should('be.visible')
      
      const ngramButtonsBefore = []
      cy.get('button').contains('4-gram').then(($btn) => {
        ngramButtonsBefore.push($btn.attr('class'))
      })
      
      cy.get('button').contains('4-gram').click()
      cy.get('button').contains('4-gram').should('be.visible')
      
      cy.get('button').contains('1-gram').click()
      cy.get('button').contains('1-gram').should('be.visible')
      
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('.ma-ngram-heading').should('exist')
      cy.get('.ma-ngram-heading').should('contain.text', 'gram')
    })
  })

  it('should test unwanted words removal functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.withStopWords)
      
      cy.get('input[type="checkbox"]').should('be.checked')
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      const keywordsWithFilter = []
      cy.get('.ma-keyword-badge').then(($badges) => {
        $badges.each((index, badge) => {
          keywordsWithFilter.push(badge.textContent)
        })
      })
      
      cy.get('input[type="checkbox"]').uncheck({ force: true })
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('.ma-keyword-badge').should('have.length.at.least', keywordsWithFilter.length)
    })
  })

  it('should clear input and results when clicking Clear button', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('button').contains('Clear').click()
      cy.get('textarea').should('have.value', '')
      cy.get('.ma-empty-state').should('be.visible')
    })
  })

  it('should test keyword count display', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.complex)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('.ma-keyword-badge').each(($badge) => {
        cy.wrap($badge).should('contain.text', '(')
        cy.wrap($badge).should('contain.text', ')')
      })
    })
  })

  it('should navigate to keyword density page when clicking Analyze Density', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      
      cy.url().should('include', '/keyword-density')
      cy.get('textarea').should('contain.value', data.sampleTexts.simple)
    })
  })

  it('should show empty state when no keywords are generated', () => {
    cy.get('.ma-empty-state').should('be.visible')
    cy.get('.ma-empty-state').should('contain.text', 'Keywords will appear here once generated')
  })

  it('should display different n-gram sections correctly', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').type(data.sampleTexts.complex)
      cy.get('button').contains('Generate Keywords').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('.ma-ngram-heading').should('contain.text', '1-gram')
      cy.get('.ma-ngram-heading').should('contain.text', '2-gram')
      cy.get('.ma-ngram-heading').should('contain.text', '3-gram')
    })
  })
})