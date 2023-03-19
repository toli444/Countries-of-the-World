describe('The List Page', () => {
    it('displays all repositories', () => {
        cy.visit('/');

        cy.get('[data-testid="repo-name"]').should('have.length', 20);
    });

    describe('filters repositories', () => {
        it('case 1');

        it('case 2');

        it('clear');

        it('not existing');
    });

    it('updates query params');

    it('applies query params');
});
