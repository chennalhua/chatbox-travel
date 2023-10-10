import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "view/HomePage";
export const Router = createBrowserRouter([
    {
        index: true,
        element: <Home />,
    }
]);
