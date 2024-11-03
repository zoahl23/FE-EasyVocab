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
import RegisterPage from './pages/register';
import { useDispatch } from "react-redux";
import { callFetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/account/accountSlice";

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

    const dispatch = useDispatch();

    const getAccount = async () => {
        const res = await callFetchAccount();
        // console.log("fetch", res)
        if (res && res.data) {
            dispatch(doGetAccountAction(res.data))
            // console.log("fetch", res.data.user)
        }
    }

    useEffect(() => {
        getAccount();
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "hello",
                    element: <div>Hello</div>
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}