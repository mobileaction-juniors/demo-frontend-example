/// <reference types="cypress" />

describe('Basic Tests For NavBar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })
    
    it('should navigate to the correct pages', () => {
        cy.contains('Keyword Density').click(); //click keyword density link
        cy.url().should('include', '/keyword-density'); //now url must be 'http://localhost:8080/keyword-density'
        cy.go('back'); //back to the home page
        cy.contains('Keyword Generator').click(); //click keyword generator link
        cy.url().should('include', '/keyword-generator'); // now url must be 'http://localhost:8080/keyword-generator'
      });
}) 