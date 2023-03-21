import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useRepositories} from "./root";

function getHighlightedText(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part: string, index: number) => (
        <React.Fragment key={index}>
            {part === highlight ? (
                <mark>{part}</mark>
            ) : (
                part
            )}
        </React.Fragment>
    ));
}

function List() {
    const repositories = useRepositories();
    const [searchParams, setSearchParams] = useSearchParams();
    const ownerFilter = searchParams.get('owner') || '';
    const filteredRepositories = repositories.filter(repo => repo.owner.includes(ownerFilter));

    return (
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <label htmlFor="filter-by-owner-input">Filter by owner</label>
                    <input
                        id="filter-by-owner-input"
                        type="text"
                        placeholder="type query"
                        value={ownerFilter}
                        onChange={e => setSearchParams({ owner: e.target.value })}
                    />
                </div>
            </form>
            <div className="repositories-list">
                {filteredRepositories.length ? (
                    <ul>
                        {filteredRepositories.map(repo => (
                            <li data-testid="repo-info" key={repo.name}>
                                <dl className="repository-info">
                                    <dt>Name</dt>
                                    <dd data-testid="repo-name">{repo.name}</dd>
                                    <dt>Owner</dt>
                                    <dd data-testid="repo-owner">{getHighlightedText(repo.owner, ownerFilter)}</dd>
                                    <dt>Languages</dt>
                                    <dd data-testid="repo-languages">{repo.languages.join(', ')}</dd>
                                </dl>
                            </li>
                        ))}
                    </ul>
                ) : <p data-testid="no-results-message">
                    No repositories match the specified owner name
                </p>}
            </div>
        </main>
    );
}

export default List;
