describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the welcome message', () => {
    cy.contains('h1', 'Welcome to Onboarding Progress')
  })

  it('navigates to Keyword Generator', () => {
    cy.contains('Open Keyword Generator').click()
    cy.url().should('include', '/keyword-generator')
    cy.contains('Keyword Generator')
  })

  it('navigates to Keyword Density', () => {
    cy.contains('Open Keyword Density').click({ force: true })
    cy.url().should('include', '/keyword-density')
    cy.contains('Keyword Density')
  })
})
