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

  it("accepts a description", () => {
    cy.get("textarea").type("hello world hello");
    cy.get("textarea").should("have.value", "hello world hello");
  });

  it("toggles the generate button label", () => {
    cy.contains("button", "Generate").click();
    cy.contains("button", "Hide").should("be.visible");
  });

  it("navigates to the keyword count density page", () => {
    cy.contains("button", "Keyword Count Density").click();
    cy.url().should("include", "/keyword-count-density");
  });
});
