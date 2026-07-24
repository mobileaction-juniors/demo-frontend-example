/* eslint-env mocha */
/* global cy */

describe("Keyword Count Density", () => {
  beforeEach(() => {
    cy.visit("/keyword-count-density");
  });

  it("renders the page", () => {
    cy.get("textarea").should("be.visible");
  });

  it("renders the controls", () => {
    cy.contains("button", "Keyword Count Density").should("be.visible");
  });

  it("renders the grid columns", () => {
    cy.get(".ag-header-cell").should("have.length", 3);
    cy.contains(".ag-header-cell", "Keyword").should("be.visible");
    cy.contains(".ag-header-cell", "Count").should("be.visible");
    cy.contains(".ag-header-cell", "Density").should("be.visible");
  });

  it("generates keywords in rows", () => {
    cy.get("textarea").type("hello world hello");
    cy.contains("button", "Keyword Count Density").click();
    cy.get(".ag-row").should("have.length", 2);
    cy.contains(".ag-cell-value", "hello").should("be.visible");
    cy.contains(".ag-cell-value", "world").should("be.visible");
  });

  it("generates correct counts and densities", () => {
    cy.get("textarea").type("hello world hello");
    cy.contains("button", "Keyword Count Density").click();
    cy.contains(".ag-cell-value", "hello")
      .parent()
      .within(() => {
        cy.get(".ag-cell-value").eq(1).should("contain", "2");
        cy.get(".ag-cell-value").eq(2).should("contain", "0.67");
      });
    cy.contains(".ag-cell-value", "world")
      .parent()
      .within(() => {
        cy.get(".ag-cell-value").eq(1).should("contain", "1");
        cy.get(".ag-cell-value").eq(2).should("contain", "0.33");
      });
  });
});
