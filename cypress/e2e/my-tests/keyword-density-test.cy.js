/// <reference types="cypress" />

describe('Basic Tests For Keyword Density', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/keyword-density')
    });

    it("should correctly get the text input by the user", () => {

        cy.get(".ma-text-area textarea").clear();

        const userInput = "This is a sample sentence. Another sentence for testing.";

        cy.get(".ma-text-area textarea").type(userInput);

        cy.get(".ma-convert-button").click();





        cy.get(".ma-character-counter").should("have.text", `Total Characters: ${userInput.length}`)



        const expectedData = [
            { keyword: "sample , another , testing", count: 1, density: "11.1" },
            { keyword: "sentence", count: 2, density: "22.2" }
        ];


        cy.get(".ant-table-row").each(($row, index) => {
            cy.wrap($row).find('td').eq(0).should("contain.text", expectedData[index].keyword);
            cy.wrap($row).find("td").eq(1).should("contain.text", expectedData[index].count);
            cy.wrap($row).find("td").eq(2).should("contain.text", expectedData[index].density);
        });

        const selectedCopies = ("Keywords,Count,Density\nsample - another - testing, 1, 11.1\nsentence, 2, 22.2")

        Cypress.Commands.add(selectedCopies, value => {
            cy.window().then(win => {
                win.navigator.clipboard.readText().then(text => {
                    expect(text).to.eq(value)
                })
            })
        })
    });



    it("should display alerts correctly", () => {
        // Test for empty input
        cy.get(".ma-text-area textarea").clear();
        cy.get(".ma-convert-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.equal("Please write your text! The textbox is empty!");
        });
    });
    // Test for single-character input

    it("should display alerts correctly second", () => {
        cy.get(".ma-text-area textarea").clear();
        cy.get(".ma-text-area textarea").type("a");
        cy.get(".ma-convert-button").click();
        cy.on("window:alert", (message) => {
            expect(message).to.equal("Please write a word!");
        });
    });



})