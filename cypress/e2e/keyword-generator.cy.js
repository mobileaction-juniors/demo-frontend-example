/* eslint-env mocha */
/* global cy */

describe("Keyword Generator", () => {
  beforeEach(() => {
    cy.visit("/keyword-generator");
  });

  it("renders the page", () => {
    cy.contains("h1", "Generator").should("be.visible");
    cy.get("textarea").should("be.visible");
  });

  it("renders the controls", () => {
    cy.contains("button", "Generate").should("be.visible");
    cy.contains("button", "Keyword Count Density").should("be.visible");
    cy.contains("Select n-gram sizes").should("be.visible");
  });

  it("accepts a description", () => {
    cy.get("textarea").type("hello world");
    cy.get("textarea").should("have.value", "hello world");
  });

  it("toggles the generate button label", () => {
    cy.contains("button", "Generate").click();
    cy.contains("button", "Hide").should("be.visible");
  });

  it("navigates to the keyword count density page", () => {
    cy.contains("button", "Keyword Count Density").click();
    cy.url().should("include", "/keyword-count-density");
  });

  it("removes stop words from the description", () => {
    cy.get("textarea").type("myself and the keyword generator");
    cy.contains("button", "Generate").click();
    cy.contains("p", "Cleaned and Filtered Description:")
      .should("be.visible")
      .and("contain", "keyword generator")
      .and("not.contain", "myself");
  });
});
