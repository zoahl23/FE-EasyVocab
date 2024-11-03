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
import { useDispatch, useSelector } from "react-redux";
import { callFetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin";
import './styles/reset.scss';
import Learn from "./components/Learn";
import Notebook from "./components/Notebook";
import Event from "./components/Event";

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
    const isLoading = useSelector(state => state.account.isLoading)

    const getAccount = async () => {
        if (
            window.location.pathname === '/login'
            || window.location.pathname === '/register'
        ) return;

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
                    path: "/learn",
                    element: <Learn />
                },
                {
                    path: "/notebook",
                    element: <Notebook />
                },
                {
                    path: "/events",
                    element: <Event />
                },
            ],
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true, element:
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                },
                {
                    path: "user",
                    element: <div>hello</div>//<ContactPage />,
                },
                {
                    path: "book",
                    element: <div>hello</div>//<BookPage />,
                },
            ],
        },
        {
            path: "/login",
            element: <LoginPage />,
            errorElement: <ErrorPage />
        },
        {
            path: "/register",
            element: <RegisterPage />,
            errorElement: <ErrorPage />
        },
    ]);

    return (
        <>
            {isLoading === false
                || window.location.pathname === '/login'
                || window.location.pathname === '/register'
                || window.location.pathname === '/'
                || window.location.pathname === '/learn'
                || window.location.pathname === '/notebook'
                || window.location.pathname === '/events'
                ?
                <RouterProvider router={router} />
                :
                <Loading />
            }
        </>
    )
}