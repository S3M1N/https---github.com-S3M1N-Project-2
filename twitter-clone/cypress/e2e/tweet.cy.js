// cypress/integration/feed_actions_spec.js

describe('Feed Actions', () => {
    beforeEach(() => {
      // Login before each test to ensure we are authenticated
      cy.visit('/login'); // Replace with actual login page URL
      cy.get('input[name="email"]').type('seminamiti5@gmail.com'); // Replace with valid credentials
      cy.get('input[name="password"]').type('123123123');
      cy.get('input[type="submit"]').click();
      cy.contains('Logout').should('be.visible'); // Assuming successful login redirects to feed or has a visible logout button
    });
  
    it('should share an idea by clicking the share button in the feed', () => {
      // Navigate to the feed page where the share button exists
      cy.visit('http://127.0.0.1:8000/feed'); // Correct usage of full URL
  
      // Assuming there is a share button associated with each idea or post
      cy.get('.idea-item')
        .first() // Selecting the first idea or post in the feed (adjust as per your UI)
        .within(() => {
          cy.contains('Share').click(); // Assuming 'Share' is the button text or label
        });
  
      // Optionally, assert that sharing action results in expected behavior, e.g., a success message
      cy.contains('Idea shared successfully').should('be.visible');
    });
  });
  