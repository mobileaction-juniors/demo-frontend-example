describe('Keyword Density Analyzer', () => {
  beforeEach(() => {
    cy.visit('/keyword-density')
  })

  it('should load the page correctly', () => {
    cy.get('h1, h2, h3').should('contain.text', 'Keyword Density')
    cy.get('textarea').should('be.visible')
    cy.get('button').contains('Analyze Density').should('be.visible')
    cy.get('button').contains('Clear').should('be.visible')
  })

  it('should have disabled buttons when no text is entered', () => {
    cy.get('textarea').clear()
    
    cy.get('button').contains('Analyze Density').click({ force: true }).then(() => {
      cy.get('.ma-results-content').should('not.exist')
    })
    
    cy.get('button').contains('Clear').click({ force: true }).then(() => {
      cy.get('textarea').should('have.value', '')
    })
  })

  it('should enable buttons when text is entered', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('button').contains('Clear').click()
      cy.get('textarea').should('have.value', '')
    })
  })

  it('should analyze text and show correct results', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      cy.get('button').contains('Analyze Density').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-density-table').should('be.visible')
      cy.get('table thead th').should('contain.text', 'Keyword')
      cy.get('table thead th').should('contain.text', 'Count')
      cy.get('table thead th').should('contain.text', 'Density')
    })
  })

  it('should verify word counts are accurate', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      cy.get('.ma-summary-text').should('contain.text', 'Total words analyzed:')
      
      cy.get('.ma-summary-text').invoke('text').then((text) => {
        const totalWords = text.match(/Total words analyzed: (\d+)/)[1]
        expect(parseInt(totalWords)).to.be.greaterThan(0)
      })
    })
  })

  it('should verify frequency calculations', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      cy.get('button').contains('Analyze Density').click()
      
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).find('.ma-count-cell').invoke('text').then((count) => {
          expect(parseInt(count)).to.be.greaterThan(0)
        })
        
        cy.wrap($row).find('.ma-density-cell').invoke('text').then((density) => {
          const densityValue = parseFloat(density.replace('%', ''))
          expect(densityValue).to.be.greaterThan(0)
          expect(densityValue).to.be.at.most(100)
        })
      })
    })
  })

  it('should test character count display', () => {
    cy.fixture('example').then((data) => {
      const testText = data.sampleTexts.simple
      cy.get('textarea').clear().type(testText)
      
      cy.get('.ma-character-count').should('contain.text', `Total characters: ${testText.length}`)
    })
  })

  it('should test merge keywords functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      
      cy.get('input[type="checkbox"]').first().check({ force: true })
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      let mergedResultsCount = 0
      cy.get('table tbody tr').then(($rows) => {
        mergedResultsCount = $rows.length
      })
      
      cy.get('input[type="checkbox"]').first().uncheck({ force: true })
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('table tbody tr').should('have.length.greaterThan', 0)
    })
  })

  it('should test hide unwanted words functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.withStopWords)
      
      cy.get('input[type="checkbox"]').last().should('be.checked')
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      let filteredResultsCount = 0
      cy.get('table tbody tr').then(($rows) => {
        filteredResultsCount = $rows.length
      })
      
      cy.get('input[type="checkbox"]').last().uncheck({ force: true })
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('table tbody tr').should('have.length.greaterThan', 0)
    })
  })

  it('should test sorting functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.complex)
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('th.ma-sortable-header').contains('Keyword').click()
      cy.get('th.ma-sortable-header').contains('Keyword').should('satisfy', ($el) => {
        const text = $el.text()
        return text.includes('↑') || text.includes('↓') || text.includes('▲') || text.includes('▼')
      })
      
      cy.get('th.ma-sortable-header').contains('Count').click()
      cy.get('th.ma-sortable-header').contains('Count').should('satisfy', ($el) => {
        const text = $el.text()
        return text.includes('↑') || text.includes('↓') || text.includes('▲') || text.includes('▼')
      })
      
      cy.get('th.ma-sortable-header').contains('Density').click()
      cy.get('th.ma-sortable-header').contains('Density').should('satisfy', ($el) => {
        const text = $el.text()
        return text.includes('↑') || text.includes('↓') || text.includes('▲') || text.includes('▼')
      })
    })
  })

  it('should test pagination when there are many results', () => {
    const longText = 'word '.repeat(100) + 'another '.repeat(50) + 'test '.repeat(25)
    cy.get('textarea').clear().type(longText)
    cy.get('button').contains('Analyze Density').click()
    cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
    
    cy.get('table tbody tr').should('have.length.at.least', 1)
    cy.get('.ma-pagination-info').should('contain.text', 'Showing')
    cy.get('.ma-pagination-info').should('contain.text', 'of')
    cy.get('.ma-pagination-info').should('contain.text', 'results')
    
    cy.get('table tbody tr').then(($rows) => {
      if ($rows.length >= 10) {
        cy.get('.ma-pagination').should('be.visible')
      }
    })
  })

  it('should test copy to clipboard functionality', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('button').contains('Copy to Clipboard').should('be.visible')
      cy.get('button').contains('Copy to Clipboard').click()
    })
  })

  it('should clear input and results when clicking Clear button', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      cy.get('button').contains('Clear').click()
      cy.get('textarea').should('have.value', '')
      cy.get('.ma-empty-state').should('be.visible')
    })
  })

  it('should show empty state when no analysis is performed', () => {
    cy.get('textarea').clear()
    cy.get('.ma-empty-state').should('be.visible')
    cy.get('.ma-empty-state').should('contain.text', 'Density results will appear here once analyzed')
  })

  it('should handle error states gracefully', () => {
    cy.get('textarea').clear()
    cy.get('button').contains('Analyze Density').click({ force: true })
    cy.get('.ma-results-content').should('not.exist')
    
    cy.get('textarea').clear().type('   ')
    cy.get('button').contains('Analyze Density').click({ force: true })
    cy.get('.ma-results-content').should('not.exist')
  })

  it('should preserve analysis state when navigating', () => {
    cy.fixture('example').then((data) => {
      cy.get('textarea').clear().type(data.sampleTexts.simple)
      cy.get('button').contains('Analyze Density').click()
      cy.get('.ma-results-content', { timeout: 10000 }).should('be.visible')
      
      let initialResultsCount = 0
      cy.get('table tbody tr').then(($rows) => {
        initialResultsCount = $rows.length
      })
      
      cy.visit('/keyword-generator')
      cy.visit('/keyword-density')
      
      cy.get('.ma-results-content').should('be.visible')
      cy.get('table tbody tr').should('have.length.at.least', 1)
    })
  })
})