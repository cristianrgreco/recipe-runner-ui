import { Before, Given, Then } from "cypress-cucumber-preprocessor/steps";
import recipes from "../../fixtures/example";

Before(() => {
  cy.fixture("recipes.json").as("recipes");
  cy.intercept("GET", "**/recipes", { fixture: "recipes.json" });
});

Given("I open the Home page", () => {
  cy.visit("/");
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

Then("I see the {} button in the navbar is active", (button) => {
  cy.get("nav").contains(button).should("have.attr", "class").and("include", "Active");
});

Then("I see recipes", () => {
  cy.getBySel("recipe-preview").its("length").should("be.gte", 1);
  cy.getBySel("recipe-preview-heading").first().should("have.text", "Pancakes");
  cy.getBySel("recipe-preview-details")
    .first()
    .should("include.text", "2Serves")
    .and("include.text", "4mDuration")
    .and("include.text", "5Ingredients");
});
