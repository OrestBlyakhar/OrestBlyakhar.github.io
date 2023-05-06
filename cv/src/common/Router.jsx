import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.jsx";
import MainPage from "../pages/MainPage/MainPage.jsx";
import UserPage from "../pages/UserPage/UserPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import LoginHOC from "../components/LoginHOC.js";
import { PrivateRouteForHOC, PublicRouteForHOC } from "../components/RouteHOC.js";

export const router = createBrowserRouter([
    {
        path: AppRoutes.MAIN,
        element: <MainPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: AppRoutes.LOGIN,
        element: <PublicRouteForHOC HOC={LoginHOC} Component={LoginPage}/>
    },
    {
        path: AppRoutes.USER,
        element: <PrivateRouteForHOC HOC={LoginHOC} Component={UserPage}/>
    },
    {
        path: AppRoutes.ERROR,
        element: <ErrorPage/>
    }
]);