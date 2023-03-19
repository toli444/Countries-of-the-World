import React from 'react';
import {useRouteLoaderData} from "react-router-dom";
import {RepositoriesData} from "../types/Repository";
import groupBy from "lodash.groupby";

function RepositoriesPerOwner() {
    const {repositories} = useRouteLoaderData('root') as RepositoriesData;
    const groupedRepositories = groupBy(repositories, 'owner');

    return (
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <label htmlFor="filter-by-owner-input">Filter by language</label>
                    <select>
                        <option value="">Choose a language</option>
                        <option value="dog">Scala</option>
                    </select>
                </div>
            </form>
            <div className="results">
                {Object.entries(groupedRepositories).map(([owner, ownerRepositories]) => (
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
