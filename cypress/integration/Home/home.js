import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open the App", () => {
  cy.visit("http://localhost:3000");
});

Then("I see {} in the title", (title) => {
  cy.title().should("equal", title);
});

Then("I see {} as the meta description", (description) => {
  cy.get("meta[name=description]").should("have.attr", "content").and("equal", description);
});

Then("I see {} as the meta keywords", (keywords) => {
  cy.get("meta[name=keywords]").should("have.attr", "content").and("deep.equal", keywords);
});