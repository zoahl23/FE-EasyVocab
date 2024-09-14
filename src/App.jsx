import React, { useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ErrorPage from './pages/error';
import Home from './components/Home';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "hello",
                    element: <LoginPage />
                },
            ],
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