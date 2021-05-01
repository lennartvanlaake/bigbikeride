Feature: Blog crud operations

  Scenario: Create a text blog
    Given I am logged in
    And I POST a "text" blog with title "test"
    When I GET all blogs
    Then I find the blog id of the created blog in the blogs response
    When I GET the created blog
    Then the blog in the response has title "test"

  Scenario: Create an image blog
    Given I am logged in
    And I POST a "images" blog with title "test"
    When I upload an image
    And I link the image to the blog
    # And I change the description of the image to "things"
    And I GET the created blog
    #Then the blog in the response has an image with description "things"
