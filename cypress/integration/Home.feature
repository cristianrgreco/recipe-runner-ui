Feature: Home Page

  Background:
    Given I open the App

  Scenario: I want to see the title
    Then I see La Cocina Leon in the title

  Scenario: I want correct meta tags
    Then I see Recetas de la familia Leon as the meta description
    And I see cocina, leon, recetas, recipes as the meta keywords
