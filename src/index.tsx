import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import List from "./routes/list";
import Grouped from "./routes/grouped";
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: async () => {
            const res = await fetch("/api/repos.json")

            if (!res.ok) {
                throw new Error("Couldn't load repositories");
            }

            return res;
        },
        children: [
            {
                path: "/",
                element: <List />
            },
            {
                path: "by-owner",
                element: <Grouped />
            }
        ],
    },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
