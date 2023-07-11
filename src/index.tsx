import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import List from "./routes/list";
import Grouped from "./routes/grouped";
import {
    createHashRouter,
    RouterProvider,
    defer,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function fetchCountries() {
    const response = await fetch("/api/countries.json");

    if (!response.ok) {
        throw new Error("Could not fetch countries");
    }

    const { countries } = await response.json();

    return countries;
}

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: async () => {
            return defer({ countries: fetchCountries() });
        },
        shouldRevalidate: () => false,
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
