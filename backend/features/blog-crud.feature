Feature: Blog crud operations

  Scenario: Create and edit blog
    Given I am logged in
    And I POST a blog with body
    | body                                          |
    | { }                                           |