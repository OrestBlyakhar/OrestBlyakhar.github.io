import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.jsx";
import MainPage from "../pages/MainPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

export const router = createBrowserRouter([
    {
        path: AppRoutes.MAIN,
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: AppRoutes.LOGIN,
                element: <LoginPage/>
            },
            {
                path: AppRoutes.USER,
                element: <UserPage/>
            },
            {
                path: AppRoutes.ERROR,
                element: <ErrorPage/>
            }
        ]
    },
]);