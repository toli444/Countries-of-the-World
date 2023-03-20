describe('List view', () => {
    const filterResults = {
        FULL: [ 'react',
            'webpack',
            'angularjs',
            'spring',
            'vaadin',
            'vue',
            'node',
            'backbone',
            'graphql',
            'junit',
            'ratpack',
            'django',
            'nextjs',
            'gatsbyjs',
            'express',
            'sinatra',
            'typescript',
            'gem',
            'graphiql',
            'gradle'
        ],
        sh: [
            'react',
            'angularjs',
            'graphql',
            'nextjs',
            'gatsbyjs',
            'gem',
            'graphiql',
            'gradle'
        ],
        shonnan1: [
            'angularjs',
            'nextjs',
            'gatsbyjs',
            'gradle'
        ],
        on: [
            'angularjs',
            'junit',
            'nextjs',
            'gatsbyjs',
            'gradle'
        ]
    };

    function checkReposList(expected) {
        cy.get('[data-testid="repo-name"]')
            .should('have.length', expected.length)
            .each((li, index) => {
                cy.wrap(li).should('contain.text', expected[index]);
            });
    }

    it('displays all repositories', () => {
        cy.visit('/');
        checkReposList(filterResults.FULL);
    });

    it('filters repositories',  () => {
        cy.visit('/');
        cy.get('[id="filter-by-owner-input"').type('sh');
        checkReposList(filterResults.sh);
        cy.get('[id="filter-by-owner-input"').type('on');
        checkReposList(filterResults.shonnan1);
        cy.get('[id="filter-by-owner-input"').type('nan1');
        checkReposList(filterResults.shonnan1);
        cy.get('[data-testid="no-results-message"').should('not.exist');
        cy.get('[id="filter-by-owner-input"').type('1');
        cy.get('[data-testid="repo-name"]').should('have.length', 0);
        cy.get('[data-testid="no-results-message"')
            .should('contain.text', 'No repositories match the specified owner name');
        cy.get('[id="filter-by-owner-input"').clear();
        cy.get('[data-testid="no-results-message"').should('not.exist');
        checkReposList(filterResults.FULL);
    });

    it('handles special characters', () => {
        cy.visit('/');
        cy.get('[id="filter-by-owner-input"').type('привет');
        cy.get('[data-testid="repo-name"]').should('have.length', 0);
        cy.get('[id="filter-by-owner-input"').clear();
        checkReposList(filterResults.FULL);
    });

    it('updates query params', () => {
        cy.visit('/');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('');
        });
        cy.get('[id="filter-by-owner-input"').type('on');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?owner=on');
        });
        cy.get('[id="filter-by-owner-input"').clear();
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?owner=');
        });
    });

    it('applies query params', () => {
        cy.visit('/?owner=on');
        checkReposList(filterResults.on);
        cy.get('[id="filter-by-owner-input"').type('nan1');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?owner=onnan1');
        });
        checkReposList(filterResults.shonnan1);
    });
});
