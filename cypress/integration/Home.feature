Feature: Home Page

  Background:
    Given I open the Home page

  Scenario: I want to see the title
    Then I see La Cocina Leon in the title

  Scenario: I want correct meta tags
    Then I see Recetas de la familia Leon as the meta description
    And I see cocina, leon, recetas, recipes as the meta keywords

  Scenario: I want the Home button in the navbar to be active
    Then I see the Home button in the navbar is active

  Scenario: I want to see recipes
    Then I see recipes
