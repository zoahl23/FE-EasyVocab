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

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

// const LayoutAdmin = () => {
//     const isAdminRoute = window.location.pathname.startsWith('/admin');
//     const user = useSelector(state => state.account.user);
//     const userRole = user.role;

//     return (
//         <div className='layout-app'>
//             {isAdminRoute && userRole === 'ADMIN' && <Header />}
//             {/* <Header /> */}
//             <Outlet />
//             {/* <Footer /> */}
//             {isAdminRoute && userRole === 'ADMIN' && <Footer />}

//         </div>
//     )
// }


export default function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    const getAccount = async () => {
        if (
            window.location.pathname === '/login'
            || window.location.pathname === '/register'
            || window.location.pathname === '/'
        ) return;

        const res = await callFetchAccount();
        if (res && res.data) {
            dispatch(doGetAccountAction(res.data))
            //console.log("check:::", res);
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
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },

    ]);

    return (
        <>
            {isAuthenticated === true
                || window.location.pathname === '/login'
                || window.location.pathname === '/register'
                || window.location.pathname === '/'
                ?
                <RouterProvider router={router} />
                :
                <Loading />
            }

        </>
    )
}