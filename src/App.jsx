import React, { useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login/index.jsx';
import ErrorPage from './ErrorPage.jsx';

const Layout = () => {
    return (
        <>
            main page
        </>
    )
}

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}