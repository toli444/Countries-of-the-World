import React, { Suspense } from 'react';
import { Outlet, Await, NavLink, useLoaderData, useOutletContext } from "react-router-dom";
import {Repository} from "../types/Repository";

export function useRepositories() {
    return useOutletContext<Repository[]>();
}

function Skeleton() {
    return (<main className="main">
        <div className="filter-panel">
            <div className="filter-panel-content">
                <div className="label-skeleton">Loading</div>
                <div className="input-skeleton">
                    Loading...
                </div>
            </div>
        </div>
        <div className="repositories-list">
            <ul role="presentation">
                {[1, 2, 3].map(repo => (
                    <li data-testid="repo-info" key={repo}>
                        <dl style={{visibility: 'hidden'}} className="repository-info">
                            <dt>Name</dt>
                            <dd></dd>
                            <dt>Owner</dt>
                            <dd></dd>
                            <dt>Languages</dt>
                            <dd></dd>
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    </main>)
}

function Main() {
    const { repositories } = useLoaderData() as { repositories: Promise<any> };

    return (
        <Suspense fallback={<Skeleton />}>
            <Await
                resolve={repositories}
                children={(resolvedRepositories) => (
                    <Outlet context={resolvedRepositories}/>
                )}
            />
        </Suspense>
    )
}

function Root() {
    return (<>
        <header>
            <h1>Repositories</h1>
        </header>
        <nav>
            View:
            <ul>
                <li>
                    <NavLink to={`/`}>List</NavLink>
                </li>
                <li>
                    <NavLink to={`/by-owner`}>Grouped</NavLink>
                </li>
            </ul>
        </nav>
        <Main />
        <footer>
            <p>2023</p>
        </footer>
    </>);
}

export default Root;
