import React, {useState} from 'react';
import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import {RepositoriesData} from "../types/Repository";

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
    const { repositories } = useRouteLoaderData('root') as RepositoriesData;
    const [searchParams, setSearchParams] = useSearchParams();
    const [ownerFilter, setOwnerFilter] = useState(searchParams.get('owner') || '');

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
                        onChange={e => {
                            setOwnerFilter(e.target.value);
                            setSearchParams({ owner: e.target.value });
                        }}
                    />
                </div>
            </form>
            <div className="repositories-list">
                <ul>
                    {repositories.filter(repo => {
                        return repo.owner.includes(ownerFilter);
                    }).map(repo => (
                        <li key={repo.name}>
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
            </div>
        </main>
    );
}

export default List;
