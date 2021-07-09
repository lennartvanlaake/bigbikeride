Feature: Blog crud operations

  Scenario: Send mail
    Then I send an email
	
  Scenario: Create a text blog
    Given I am logged in
    And I POST a blog with title "test"
    When I GET all blogs
    Then I find the blog id of the created blog in the blogs response

    When I change the title of the blog to "newtitle" and the content to "newcontent"
    And I GET the created blog
    Then the blog in the response has title "newtitle"
    And the blog in the response has content "newcontent"
   
    When I delete the created blog
    Then the blog is no longer returned

  Scenario: Create an image blog
    Given I am logged in
    And I POST a blog with title "test"
    When I upload an image
    And I link the image to the blog
    And I change the description of the image to "things"
    And I GET the created blog
    Then the blog in the response has an image with description "things"

    And I delete the image
