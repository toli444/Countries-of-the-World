import React, {useState} from 'react';
import useFetch from "../hooks/useFetch";

interface Post {
    name: string,
    owner: string,
    languages: string[]
}

interface ReposResponse {
    repositories: Post[]
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
    const {response: reposData, error, isLoading} = useFetch<ReposResponse>('./api/repos.json');
    const [ownerFilter, setOwnerFilter] = useState('');

    return (
        <main className="main">
            <form className="filter-panel">
                <div className="filter-panel-content">
                    <input type="text" placeholder="Filter by owner" onChange={e => setOwnerFilter(e.target.value)}/>
                </div>
            </form>
            <div className="results">
                {isLoading ? "Loading..." : (reposData?.repositories?.length || null) && <ul>
                    {reposData?.repositories.filter(repo => {
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
