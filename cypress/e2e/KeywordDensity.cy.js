/// <reference types="cypress" />
import defaultText from "../../src/constants/DefaultText"

describe('Keyword Density Page E2E Tests', () => {
  const route = '/keyword-density'

  beforeEach(() => {
    cy.visit(route)
  })

  it('loads the page with key UI elements', () => {
    cy.get('h1').contains('Keyword Density')
    cy.get('p').contains('Analyze keyword frequency and density in your text')
    cy.get('textarea').should('exist')
    cy.get('button').contains('Analyze Keywords').should('exist')
    cy.get('button').contains('Clear').should('exist')
    cy.get('textarea').should('have.value', defaultText)
  })

  it('enables Analyze button when input is provided', () => {
    cy.get('textarea').type('hello world')
    cy.get('button').contains('Analyze Keywords').should('not.be.disabled')
  })

  it('analyzes keywords and displays results', () => {
    const text = 'Mobile Action is great. Mobile Action is amazing. Mobile Action is master at mobile apps.'
    cy.get('textarea').clear().type(text)
    cy.get('button').contains('Analyze Keywords').click()

    cy.get('table').should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)

    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain.text', 'mobile')
      cy.get('td').eq(1).should('contain.text', '4')
      cy.get('td').eq(2).should('contain.text', '%')
    })

    cy.get('.ma-stats-list').first().within(() => {
      cy.contains('Total Words').siblings().should('contain.text', '11')
      cy.contains('Unique Keywords').siblings().should('contain.text', '6')
      cy.contains('Characters').siblings().should('contain.text', '89')
    })

    cy.get('.ma-stats-list').last().within(() => {
      cy.contains('Most Frequent').siblings().should('contain.text', 'mobile')
      cy.contains('Highest Density').siblings().should('contain.text', '36.4%')
    })
  })

  it('clears input and results when Clear is clicked', () => {
    cy.get('textarea').type('test clear')
    cy.get('button').contains('Analyze Keywords').click()
    cy.get('button').contains('Clear').should('not.be.disabled').click()

    cy.get('textarea').should('have.value', '')
    cy.contains('button', 'Analyze Keywords').should('be.disabled')
    cy.contains('button', 'Clear').should('be.disabled')
    cy.get('table').should('not.exist')
    cy.get('div').contains('No keywords found')
  })

  it('toggles removal of stop words', () => {
    const text = 'the quick brown fox jumps over the lazy dog'
    cy.get('textarea').clear().type(text)
    cy.get('button').contains('Analyze Keywords').click()
    cy.get('tbody').should('not.contain.text', 'the')

    cy.get('input[type="checkbox"]').uncheck({ force: true })
    cy.get('button').contains('Analyze Keywords').click()
    cy.get('tbody').should('contain.text', 'the')
  })

  it('paginates results correctly', () => {
    const words = Array.from({ length: 15 }, (_, i) => `word${i}`).join(' ')
    cy.get('textarea').clear().type(words)
    cy.get('button').contains('Analyze Keywords').click()

    cy.get('tbody tr').should('have.length', 10)
    cy.get('li[aria-label="Go to next page"]').click()
    cy.get('tbody tr').should('have.length', 5)
    cy.get('li[aria-label="Go to previous page"]').click()
    cy.get('tbody tr').should('have.length', 10)
  })

  it('changes per page count', () => {
    const words = Array.from({ length: 25 }, (_, i) => `word${i}`).join(' ')
    cy.get('textarea').clear().type(words)
    cy.get('button').contains('Analyze Keywords').click()

    cy.get('li[aria-label="Go to next page"]').click()
    cy.get('.antd-select-selector').click()
    cy.get('div[title="50 / page"]').click()

    cy.get('.page-item.active').should('contain.text', '1')
    cy.get('tbody tr').should('have.length', 25)
  })

  it('copies results to clipboard', () => {
    const text = 'copy test copy'
    cy.get('textarea').clear().type(text)
    cy.get('button').contains('Analyze Keywords').click()

    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').as('writeText')
    })

    cy.get('button').contains('Copy Results').click()
    cy.get('@writeText').should('have.been.called')
  })
})
