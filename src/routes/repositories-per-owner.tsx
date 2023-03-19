import React, {useState, useMemo} from 'react';
import {useRouteLoaderData} from "react-router-dom";
import {RepositoriesData} from "../types/Repository";
import groupBy from "lodash.groupby";

function RepositoriesPerOwner() {
    const [languageFilter, setLanguageFilter] = useState('');
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
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <label htmlFor="filter-by-owner-input">Filter by language</label>
                    <select value={languageFilter} onChange={e => setLanguageFilter(e.target.value)}>
                        <option value="">Choose a language</option>
                        {languages.map(l => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="results">
                {Object.entries(groupedFilteredRepositories).map(([owner, ownerRepositories]) => (
                    <section key={owner} className="owner-repositories">
                        <h2 className="owner-name">
                            <span className="screen-reader-text">Owner: </span>
                            {owner}
                        </h2>
                        <ul>
                            {ownerRepositories.map(repo => (
                                <li key={repo.name}>
                                    <dl className="repo-info">
                                        <dt>Name</dt>
                                        <dd>{repo.name}</dd>
                                        <dt>Languages</dt>
                                        <dd>{repo.languages.join(', ')}</dd>
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

export default RepositoriesPerOwner;
