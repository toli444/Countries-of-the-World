import React, {useState, useMemo} from 'react';
import {useRouteLoaderData, useSearchParams} from "react-router-dom";
import {RepositoriesData} from "../types/Repository";
import groupBy from "lodash.groupby";

function Grouped() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [languageFilter, setLanguageFilter] = useState(searchParams.get('lang') || '');
    const {repositories} = useRouteLoaderData('root') as RepositoriesData;
    const languages = useMemo(
        () => Array.from(new Set(repositories.flatMap(r => r.languages))),
        [repositories]
    );
    const filteredRepositories = languageFilter ?
        repositories.filter(r => r.languages.includes(languageFilter)) :
        repositories;
    const groupedFilteredRepositories = groupBy(filteredRepositories, 'owner');

    return (
        <main>
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <label htmlFor="filter-by-language-select">Filter by language</label>
                    <select
                        id="filter-by-language-select"
                        value={languageFilter} onChange={e => {
                            setLanguageFilter(e.target.value);
                            setSearchParams({ lang: e.target.value})
                        }}
                    >
                        <option value="">Choose a language</option>
                        {languages.map(l => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="repositories-list">
                {Object.entries(groupedFilteredRepositories).map(([owner, ownerRepositories]) => (
                    <section
                        key={owner}
                        className="owner-repositories"
                        data-testid="repo-info"
                    >
                        <h2 className="owner-name" data-testid="repo-owner">
                            <span className="screen-reader-text">Owner: </span>
                            {owner}
                        </h2>
                        <ul>
                            {ownerRepositories.map(repo => (
                                <li key={repo.name}>
                                    <dl className="repository-info">
                                        <dt>Name</dt>
                                        <dd data-testid="repo-name">{repo.name}</dd>
                                        <dt>Languages</dt>
                                        <dd data-testid="repo-languages">{repo.languages.join(', ')}</dd>
                                    </dl>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default Grouped;
