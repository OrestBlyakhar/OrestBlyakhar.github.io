import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.jsx";
import React from "react";
import MainPage from "../components/MainPage.jsx";
import UserPage from "../components/UserPage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import ErrorPage from "../components/ErrorPage.jsx";

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