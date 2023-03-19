import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

function Root() {
    return (<>
        <header>
            <h1>Repositories</h1>
        </header>
        <nav>
            Show as:
            <ul>
                <li>
                    <NavLink to={`/`}>List</NavLink>
                </li>
                <li>
                    <NavLink to={`/per-owner`}>Grouped</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet />
        <footer>
            <p>2023</p>
        </footer>
    </>);
}

export default Root;