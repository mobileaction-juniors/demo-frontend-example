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

  it("selects an n-gram size and generates keywords", () => {
    cy.get("textarea").type("hello world hello");
    cy.contains("Select n-gram sizes").click();
    cy.get('.antd-select-item-option').contains("1-Gram").click();
    cy.get("body").type("{esc}");
    cy.contains("button", "Generate").click();
    cy.contains("h3", "1-Gram Keywords")
      .should("be.visible")
      .parent()
      .should("contain", "hello")
      .and("contain", "world");
  });

  it("selects n-gram sizes 1 through 5 and displays all sections at once", () => {
    // 10 words: the 5-word sequence repeated, so duplicate n-grams get deduped.
    cy.get("textarea").type("apple orange banana grape mango apple orange banana grape mango");

    cy.contains("Select n-gram sizes").click();
    cy.get(".antd-select-item-option").contains("1-Gram").click();
    cy.get(".antd-select-item-option").contains("2-Gram").click();
    cy.get(".antd-select-item-option").contains("3-Gram").click();
    cy.get(".antd-select-item-option").contains("4-Gram").click();
    cy.get(".antd-select-item-option").contains("5-Gram").click();
    cy.get("body").type("{esc}");

    cy.contains("button", "Generate").click();

    // All five n-gram sections render at the same time.
    cy.contains("h3", "1-Gram Keywords").should("be.visible");
    cy.contains("h3", "2-Gram Keywords").should("be.visible");
    cy.contains("h3", "3-Gram Keywords").should("be.visible");
    cy.contains("h3", "4-Gram Keywords").should("be.visible");
    cy.contains("h3", "5-Gram Keywords").should("be.visible");

    cy.contains("h3", "1-Gram Keywords")
      .parent()
      .should("contain", "apple")
      .and("contain", "mango");

    cy.contains("h3", "2-Gram Keywords")
      .parent()
      .should("contain", "apple orange")
      .and("contain", "mango apple");

    cy.contains("h3", "3-Gram Keywords")
      .parent()
      .should("contain", "apple orange banana")
      .and("contain", "banana grape mango");

    cy.contains("h3", "4-Gram Keywords")
      .parent()
      .should("contain", "apple orange banana grape")
      .and("contain", "orange banana grape mango");

    cy.contains("h3", "5-Gram Keywords")
      .parent()
      .should("contain", "apple orange banana grape mango");
  });
});
