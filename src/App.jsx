import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ErrorPage from './pages/error';
import Home from './components/home';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPage from './pages/register';
import { useDispatch, useSelector } from "react-redux";
import { callFetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import AdminPage from "./pages/admin/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin";
import './styles/reset.scss';
import Learn from "./components/Learn";
import Notebook from "./components/Notebook";
import Event from "./components/Event";
import ManageUserPage from "./pages/admin/user";
import ManageSubscriptionPage from "./pages/admin/subscription";
import ManageTopicPage from "./pages/admin/topic";
import ManageVocabPage from "./pages/admin/vocab";
import ManageCoursePage from "./pages/admin/course";
import FeedbackPage from "./pages/admin/feedback";

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
                    element:
                        <ProtectedRoute>
                            <ManageUserPage />
                        </ProtectedRoute>
                },
                {
                    path: "subscription",
                    element:
                        <ProtectedRoute>
                            <ManageSubscriptionPage />
                        </ProtectedRoute>
                },
                {
                    path: "course",
                    element:
                        <ProtectedRoute>
                            <ManageCoursePage />
                        </ProtectedRoute>
                },
                {
                    path: "topic",
                    element:
                        <ProtectedRoute>
                            <ManageTopicPage />
                        </ProtectedRoute>
                },
                {
                    path: "vocab",
                    element:
                        <ProtectedRoute>
                            <ManageVocabPage />
                        </ProtectedRoute>
                },
                {
                    path: "feedback",
                    element:
                        <ProtectedRoute>
                            <FeedbackPage />
                        </ProtectedRoute>
                },
            ],
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element:
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                },
                {
                    path: "user",
                    element:
                        <ProtectedRoute>
                            <ManageUserPage />
                        </ProtectedRoute>
                },
                {
                    path: "course",
                    element:
                        <ProtectedRoute>
                            <ManageCoursePage />
                        </ProtectedRoute>
                },
                {
                    path: "topic",
                    element:
                        <ProtectedRoute>
                            <ManageTopicPage />
                        </ProtectedRoute>
                },
                {
                    path: "vocab",
                    element:
                        <ProtectedRoute>
                            <ManageVocabPage />
                        </ProtectedRoute>
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