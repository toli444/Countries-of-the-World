import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import List from "./routes/list";
import Grouped from "./routes/grouped";
import {
    createBrowserRouter,
    RouterProvider,
    defer,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function fetchRepositories() {
    const response = await fetch("/api/repos.json");

    if (!response.ok) {
        throw new Error("Could not fetch project");
    }

    const { repositories } = await response.json();

    return repositories;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: async () => {
            return defer({ repositories: fetchRepositories() });
        },
        shouldRevalidate: () => {
            return false;
        },
        children: [
            {
                path: "/",
                element: <List />,
            },
            {
                path: "by-owner",
                element: <Grouped />,
            }
        ],
    },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
