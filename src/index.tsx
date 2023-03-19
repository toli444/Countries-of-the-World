import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import Repositories from "./routes/repositories";
import RepositoriesPerOwner from "./routes/repositories-per-owner";
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
        loader: () => fetch("/api/repos.json"),
        children: [
            {
                path: "/",
                element: <Repositories />
            },
            {
                path: "per-owner",
                element: <RepositoriesPerOwner />
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
