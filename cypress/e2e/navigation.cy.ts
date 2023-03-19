describe('Navigation', () => {
  it('list view successfully loads', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Repositories');
  });

  it('grouped view successfully loads', () => {
    cy.visit('/');

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
});
