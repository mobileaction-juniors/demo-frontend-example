/// <reference types="cypress" />

describe('Basic Tests For Keyword Generator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/keyword-generator');
  });

  it('should generate tags based on selected n-grams and validate tag content', () => {
    const sampleSentence = 'This is a sample sentence. Another sentence for testing.';
    const selectedSampleNGrams = [1, 2, 3];

    cy.get('#input-text').type(sampleSentence); // Enter the sample input sentence

    cy.get('.ma-select input').click(); // Open the dropdown

    selectedSampleNGrams.forEach((nGram) => {
      cy.contains('.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item', `${nGram}-gram`).click(); // Select the sample n-grams
    });

    cy.get('.convertButton').click(); // Generate

    const expectedTags = [
      [' sample ', ' sentence ', ' another ', ' testing '],
      [' sample sentence ', ' sentence another ', ' another sentence ', ' sentence testing '],
      [' sample sentence another ', ' sentence another sentence ', ' another sentence testing '],
    ];

    // Assert tag content for each n-gram
    selectedSampleNGrams.forEach((nGram, index) => {
      cy.get('.ma-keywords .ma-keyword-group')
        .eq(index)
        .find('.ant-tag')
        .each(($tag, tagIndex) => {
          cy.wrap($tag).should('have.text', expectedTags[nGram - 1][tagIndex]);
        });
    });
  });
});
