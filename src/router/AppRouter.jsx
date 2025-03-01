import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import RouterWrapper from "./RouterWrapper";

import HomePage from "view/HomePage";
import Chat from "view/Chat";
import Tag from "view/Tag";
import Detail from "view/Detail";
import Todo from "view/Todo";
import User from "view/Member";

const Routes = () => {
    const routes = useRoutes([
        {
            path: "/",
            children: [
                { index: true, element: <HomePage /> },
                { path: "chat", element: <Chat /> },
                { path: "todo", element: <Todo /> },
                { path: "myTag", element: <Tag /> },
                { path: "detail", element: <Detail /> },
                { path: "member", element: <User /> },
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