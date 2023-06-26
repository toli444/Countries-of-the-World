import React, { Suspense } from 'react';
import { Outlet, Await, NavLink, useLoaderData, useOutletContext } from "react-router-dom";
import {Country} from "../types/Country";
import Skeleton from "../components/app-skeleton";

export function useCountries() {
    return useOutletContext<Country[]>();
}

function Main() {
    const { countries } = useLoaderData() as { countries: Promise<Country[]> };

    return (
        <Suspense fallback={<Skeleton />}>
            <Await
                resolve={countries}
                children={resolvedCountries => (
                    <Outlet context={resolvedCountries}/>
                )}
            />
        </Suspense>
    )
}

function Root() {
    return (
        <div className="page">
            <div>
            <header>
                <h1>Countries 🌍</h1>
            </header>
                <nav>
                    View:
                    <ul>
                        <li>
                            <NavLink to="/">List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/by-owner">Grouped</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Main />
            <div>
                <footer>
                    <p>Project author: Anatoli Semianiaka.</p>
                </footer>
            </div>
        </div>
    );
}

export default Root;
