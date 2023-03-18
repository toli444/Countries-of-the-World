import React from 'react';
import useFetch from "../hooks/useFetch";

interface Post {
    name: string,
    owner: string,
    languages: string[]
}

interface ReposResponse {
    repositories: Post[]
}

function Main() {
    const { response: reposData, error, isLoading } = useFetch<ReposResponse>('./api/repos.json');

    return (
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <input type="text" placeholder="Filter by owner" />
                </div>
            </form>
            <div className="results">
                {isLoading ? "Loading..." : (reposData?.repositories?.length || null) && <ul>
                    {reposData?.repositories.map(repo => (
                        <li key={repo.name}>
                            <dl className="repo-info">
                                <dt>Name</dt>
                                <dd>{repo.name}</dd>
                                <dt>Owner</dt>
                                <dd>{repo.owner}</dd>
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
