import React, {useState} from 'react';
import { useRouteLoaderData } from "react-router-dom";

interface Repo {
    name: string,
    owner: string,
    languages: string[]
}

interface ReposData {
    repositories: Repo[]
}

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

function Main() {
    const { repositories } = useRouteLoaderData('root') as ReposData;
    const [ownerFilter, setOwnerFilter] = useState('');

    return (
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <label htmlFor="filter-by-owner-input">Filter by owner</label>
                    <input
                        id="filter-by-owner-input"
                        type="text"
                        placeholder="type query"
                        onChange={e => setOwnerFilter(e.target.value)}
                    />
                </div>
            </form>
            <div className="results">
                {repositories?.length && <ul>
                    {repositories.filter(repo => {
                        return repo.owner.includes(ownerFilter);
                    }).map(repo => (
                        <li key={repo.name}>
                            <dl className="repo-info">
                                <dt>Name</dt>
                                <dd>{repo.name}</dd>
                                <dt>Owner</dt>
                                <dd>{getHighlightedText(repo.owner, ownerFilter)}</dd>
                                <dt>Languages</dt>
                                <dd>{repo.languages.join(', ')}</dd>
                            </dl>
                        </li>
                    ))}
                </ul>}
            </div>
        </main>
    );
}

export default Main;
