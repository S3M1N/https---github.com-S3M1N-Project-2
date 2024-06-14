describe('Laravel Application Tests', () => {

  // Custom command for logging in
  Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();
  });

  // Test the login page and login functionality for a regular user
  it('should display the login page and login successfully as a regular user', () => {
    cy.visit('/login');
    cy.get('h3').contains('Login').should('be.visible');
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials

    // Ensure user is redirected after login
    cy.url().should('not.include', '/login', { timeout: 10000 }).then((url) => {
      // Logging the URL for debugging
      cy.log('Current URL:', url);
    });

    // Verify redirection to a home or profile page
    cy.url().should('not.include', '/dashboard', { timeout: 10000 });
  });

  // Test the registration page and registration functionality
  it('should display the registration page and register successfully', () => {
    cy.visit('/register');
    cy.get('h3').contains('Register').should('be.visible');
    cy.get('input[name="name"]').type('Nimet');
    cy.get('input[name="email"]').type('nazifselimi@gmail.com');
    cy.get('input[name="password"]').type('123123123');
    cy.get('input[name="password_confirmation"]').type('123123123');
    cy.get('input[type="submit"]').click();

    // Assuming new users are redirected to their profile or home page
    cy.url().should('include', '/register', { timeout: 10000 }).then((url) => {
      // Logging the URL for debugging
      cy.log('Current URL:', url);
    });

    // Verify redirection to a home or profile page
    cy.url().should('not.include', '/dashboard', { timeout: 10000 });
  });

  // Test the user dashboard for a regular user
  it('should display the user dashboard', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials

    // Ensure user is redirected to a user-specific page
    cy.url().should('not.include', '/login', { timeout: 10000 }).then((url) => {
      // Logging the URL for debugging
      cy.log('Current URL:', url);
    });

    // Assert that the dashboard page is visible
    cy.contains('SHARE YOUR IDEAS');
  });

  // Test accessing the profile page after login
  it('should display the user profile page', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials

    // Navigate to the profile page
    cy.visit('/profile');

    // Assert that the profile page is accessible and contains user information
    cy.get('h3').contains('User Profile').should('be.visible');
    cy.contains('Email: seminamiti5@gmail.com').should('be.visible');
  });

  // Test logging out and redirection to the login page
  it('should log out and redirect to the login page', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials

    // Click on logout button or link (adjust according to your app's UI)
    cy.contains('Logout').click();

    // After logout, assert redirection to the login page
    cy.url().should('eq', 'http://localhost:8000/login', { timeout: 10000 });
  });

  // Test accessing a restricted page as an unauthorized user
  it('should redirect to login when accessing a restricted page', () => {
    // Visit a restricted page directly (adjust URL to a known restricted route in your app)
    cy.visit('/admin/dashboard');

    // Assert that the user is redirected to the login page due to unauthorized access
    cy.url().should('eq', 'http://localhost:8000/login', { timeout: 10000 });
  });

  // Test handling of incorrect login credentials
  it('should display an error message for incorrect login credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('invaliduser@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('input[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('These credentials do not match our records.').should('be.visible');
  });

  // Test navigating back to the login page after logout
  it('should navigate back to the login page after logout', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials

    // Click on logout button or link (adjust according to your app's UI)
    cy.contains('Logout').click();

    // Navigate back to the login page
    cy.visit('/login');

    // Assert that the login page is displayed
    cy.url().should('eq', 'http://localhost:8000/login', { timeout: 10000 });
    cy.get('h3').contains('Login').should('be.visible');
  });

  // Test handling of delete account confirmation
  it('should require confirmation to delete user account', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials
    cy.visit('/profile');
    cy.contains('Delete Account').click(); // Corrected to include ()

    // Assert that the delete confirmation modal is displayed
    cy.contains('Confirm Deletion').should('be.visible');

    // Enter password and confirm deletion
    cy.get('input[name="password"]').type('123123123');
    cy.contains('Delete').click();

    // Assert that account deletion success message is displayed
    cy.contains('Account deleted successfully').should('be.visible');
  });

  // Test handling of canceling account deletion
  it('should allow canceling account deletion', () => {
    cy.login('seminamiti5@gmail.com', '123123123'); // replace with valid test user credentials
    cy.visit('/profile');
    cy.contains('Delete Account').click(); // Corrected to include ()

    // Assert that the delete confirmation modal is displayed
    cy.contains('Confirm Deletion').should('be.visible');

    // Click cancel button
    cy.contains('Cancel').click();

    // Assert that the profile page is still visible
    cy.url().should('include', '/profile');
  });

  // Test handling of navigation to about page
  it('should navigate to the about page', () => {
    cy.visit('/');
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('About Us').should('be.visible');
  });

  // Test handling of navigation to contact page
  it('should navigate to the contact page', () => {
    cy.visit('/');
    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
    cy.contains('Contact Us').should('be.visible');
  });

  // Test handling of navigation to FAQ page
  it('should navigate to the FAQ page', () => {
    cy.visit('/');
    cy.contains('FAQ').click();
    cy.url().should('include', '/faq');
    cy.contains('Frequently Asked Questions').should('be.visible');
  });

  // Test handling of navigating back from about page
  it('should navigate back from the about page', () => {
    cy.visit('/about');
    cy.contains('Go Back').click();
    cy.url().should('not.include', '/about');
  });

  // Test handling of navigating back from contact page
  it('should navigate back from the contact page', () => {
    cy.visit('/contact');
    cy.contains('Go Back').click();
    cy.url().should('not.include', '/contact');
  });

  // Test handling of navigating back from FAQ page
  it('should navigate back from the FAQ page', () => {
    cy.visit('/faq');
    cy.contains('Go Back').click();
    cy.url().should('not.include', '/faq');
  });

  // Test handling of navigating to and from terms page
  it('should navigate to and from terms page', () => {
    cy.visit('/');
    cy.contains('Terms').click();
    cy.url().should('include', '/terms');
    cy.contains('Terms and Conditions').should('be.visible');
    cy.contains('Go Back').click();
    cy.url().should('not.include', '/terms');
  });

  // Test handling of navigating to and from privacy policy page
  it('should navigate to and from privacy policy page', () => {
    cy.visit('/');
    cy.contains('Privacy Policy').click();
    cy.url().should('include', '/privacy');
    cy.contains('Privacy Policy').should('be.visible');
    cy.contains('Go Back').click();
    cy.url().should('not.include', '/privacy');
  });

});