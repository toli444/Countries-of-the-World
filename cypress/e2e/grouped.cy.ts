describe('Grouped view', () => {
    const filterResults = {
        FULL: [
            {
                owner: 'afishlee0',
                repos: [
                    'react',
                    'graphql',
                    'gem',
                    'graphiql'
                ]
            },
            {
                owner: 'kwenger5',
                repos: [
                    'webpack',
                    'sinatra'
                ]
            },
            {
                owner: 'shonnan1',
                repos: [
                    'angularjs',
                    'nextjs',
                    'gatsbyjs',
                    'gradle'
                ]
            },
            {
                owner: 'hmalicki6',
                repos: [
                    'spring',
                    'typescript'
                ]
            },
            {
                owner: 'mtheaker8',
                repos: [
                    'vaadin',
                    'vue',
                    'backbone',
                    'ratpack',
                    'django',
                    'express'
                ]
            },
            {
                owner: 'dgarz2',
                repos: [
                    'node'
                ]
            },
            {
                owner: 'bmutton4',
                repos: [
                    'junit'
                ]
            }
        ],
        'C#': [
            {
                owner: 'afishlee0',
                repos: ['react']
            },
            {
                owner: ' dgarz2',
                repos: ['node']
            },
            {
                owner: 'mtheaker8',
                repos: ['express']
            },
            {
                owner: 'shonnan1',
                repos: ['gradle']
            }
        ],
        'C++': [
            {
                owner: 'bmutton4',
                repos: ['junit']
            },
            {
                owner: 'shonnan1',
                repos: ['nextjs', 'gatsbyjs', 'gradle']
            },
            {
                owner: 'kwenger5',
                repos: ['sinatra']
            }
        ],
        JavaScript: [
            {
                owner: 'shonnan1',
                repos: ['nextjs']
            }
        ]
    }

    function checkReposList(expected) {
        cy.get('[data-testid="repo-info"]')
            .should('have.length', expected.length)
            .each((item, index) => {
                cy.wrap(item)
                    .find('[data-testid="repo-owner"]')
                    .should('contain.text', expected[index].owner);

                cy.wrap(item)
                    .find('[data-testid="repo-name"]')
                    .should('have.length', expected[index].repos.length)
                    .each((repo, repoIndex) => {
                        cy.wrap(repo).should('contain.text', expected[index].repos[repoIndex]);
                    });
            });
    }

    it('displays all repositories', () => {
        cy.visit('/by-owner');
        checkReposList(filterResults.FULL);
    });

    it('filters repositories',  () => {
        cy.visit('/by-owner');
        cy.get('[id="filter-by-language-select"').select('C#');
        checkReposList(filterResults['C#']);
        cy.get('[id="filter-by-language-select"').select('C++');
        checkReposList(filterResults['C++']);
        cy.get('[id="filter-by-language-select"').select('Choose a language');
        checkReposList(filterResults.FULL);
    });

    it('updates query params', () => {
        cy.visit('/by-owner');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('');
        });
        cy.get('[id="filter-by-language-select"').select('C#');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?lang=C%23');
        });
        cy.get('[id="filter-by-language-select"').select('C++');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?lang=C%2B%2B');
        });
        cy.get('[id="filter-by-language-select"').select('Choose a language');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?lang=');
        });
    });

    it('applies query params', () => {
        cy.visit('/by-owner?lang=C%2B%2B');
        checkReposList(filterResults["C++"]);
        cy.get('[id="filter-by-language-select"').select('JavaScript');
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?lang=JavaScript');
        });
        checkReposList(filterResults.JavaScript);
    });
});
