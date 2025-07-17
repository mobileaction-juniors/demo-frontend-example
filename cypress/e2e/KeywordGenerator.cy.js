/// <reference types="cypress" />

describe('Keyword Generator Page E2E Tests', () => {
  const route = '/keyword-generator'

  beforeEach(() => {
    cy.visit(route)
  })

  it('loads page with main UI elements', () => {
    cy.get('h1').contains('Keyword Generator')
    cy.get('p').contains('Generate n-gram keywords from your text')
    cy.get('textarea').should('exist')
    cy.contains('button', 'Apply').should('be.disabled')
    cy.contains('button', 'Clear').should('be.disabled')
  })

  it('enables Apply when input is provided', () => {
    cy.get('textarea').type('test generator')
    cy.contains('button', 'Apply').should('not.be.disabled')
  })

  it('clears input and results when Clear is clicked', () => {
    cy.get('textarea').type('one two three')
    cy.contains('button', 'Apply').click()
    cy.contains('button', 'Clear').should('not.be.disabled').click()

    cy.get('textarea').should('have.value', '')
    cy.contains('button', 'Apply').should('be.disabled')
    cy.get('.ma-ngram-container').should('not.exist')
    cy.contains('div', 'No keywords generated')
  })

  it('applies keyword generation and shows badges', () => {
    const text = 'apple banana cherry'
    cy.get('textarea').clear().type(text)
    cy.contains('button', 'Apply').click()

    cy.get('.ma-ngram-container').should('be.visible')
    cy.get('.ma-ngram-item').first().within(() => {
      cy.contains('1-gram')
      cy.get('.ma-ngram-item-keywords')
        .find('.ma-ngram-item-keyword-badge')
        .should('have.length', 3)
      cy.get('.ma-ngram-item-keywords')
        .should('contain.text', 'apple')
        .and('contain.text', 'banana')
        .and('contain.text', 'cherry')
    })
  })

  it('removes stop words when toggled', () => {
    const text = 'the quick brown fox jumps over the lazy dog'
    cy.get('textarea').clear().type(text)
    cy.contains('.ma-checkbox2-text', 'Remove common stop words')
      .closest('label')
      .find('input[type="checkbox"]')
      .uncheck({ force: true })
    cy.contains('button', 'Apply').click()

    cy.get('.ma-ngram-item').first()
      .find('.ma-ngram-item-keywords')
      .should('contain.text', 'the')
  })

  it('toggles n-gram options on desktop', () => {
    cy.viewport(1280, 800)
    const text = 'one two three four'
    cy.get('textarea').clear().type(text)

    cy.contains('label.ma-checkbox2', '2-gram')
      .find('input[type="checkbox"]')
      .uncheck({ force: true })

    cy.contains('button', 'Apply').click()

    cy.get('.ma-ngram-item').should('not.contain.text', '2-gram')
    cy.get('.ma-ngram-item').contains('1-gram')
  })

  it('opens modal on mobile for n-gram selection', () => {
    cy.viewport('iphone-6')
    const text = 'a b c'
    cy.get('textarea').clear().type(text)

    cy.contains('button', 'Choose n-grams').should('be.visible').click()
    cy.get('.antd-modal-body').should('be.visible')

    cy.get('.antd-modal-body')
      .contains('.ma-checkbox2-text', '3-gram')
      .closest('label')
      .find('input[type="checkbox"]')
      .uncheck({ force: true })

    cy.get('button.ak-modal__ok-button').click()

    cy.contains('button', 'Apply').click()
    cy.get('.ma-ngram-item').should('not.contain.text', '3-gram')
  })
})
