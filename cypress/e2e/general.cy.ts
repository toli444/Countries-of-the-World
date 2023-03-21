describe('General', () => {
  it('list view successfully loads', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Repositories');
  });

  it('grouped view successfully loads', () => {
    cy.visit('/by-owner');

    cy.get('h1').should('contain', 'Repositories');
  });

  it('redirects between pages', () => {
    cy.visit('/');
    cy.url().should('include', '/');
    cy.contains('nav a', 'Grouped').click();
    cy.url().should('include', '/by-owner');
    cy.contains('nav a', 'List').click();
    cy.url().should('include', '/');
  });

  it('handles request error (list view)', () => {
    cy.intercept(
        'GET',
        '/api/repos.json',
        { statusCode: 500 }
    );
    cy.visit('/');
    cy.get('h1').should('contain', 'Oops!');
    cy.get('[data-testid="error"').should('contain.text', "Couldn't load repositories");
  });

  it('handles request error (grouped view)', () => {
    cy.intercept(
        'GET',
        '/api/repos.json',
        { statusCode: 500 }
    );
    cy.visit('/by-owner');
    cy.get('h1').should('contain', 'Oops!');
    cy.get('[data-testid="error"').should('contain.text', "Couldn't load repositories");
  });

  it('handles 404', () => {
    cy.visit('/random');
    cy.get('h1').should('contain', 'Oops!');
    cy.get('[data-testid="error"').should('contain.text', 'Not Found');
  });
});
