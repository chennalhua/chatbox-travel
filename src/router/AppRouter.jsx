import React, { useEffect } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import RouterWrapper from "./RouterWrapper";

import HomePage from "view/HomePage";
import Chat from "view/Chat";
import Test from "view/Test";

const Routes = () => {
    const routes = useRoutes([
        {
            path: "/",
            children: [
                { index: true, element: <HomePage /> },
                { path: "chat", element: <Chat /> },
                { path: "test", element: <Test /> },
            ],
        },
        {
            path: "*",
            meta: {
                mainRoleId: "err",
            },
            element: <div style={{ fontSize: '18px' }}>404</div>,
        },
    ]);
    return routes;
};
const AllRoutes = () => {
    const getRoutes = Routes();
    return getRoutes;
};

export default function AppRouter() {
    return (
        <Router>
            <RouterWrapper>
                <AllRoutes />
            </RouterWrapper>
        </Router>
    );
}