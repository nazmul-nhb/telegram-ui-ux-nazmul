import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Telegram from "../pages/Telegram";
import Chat from "../pages/Chat";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Telegram />
            },
            {
                path:'chat/:id',
                element:<Chat/>
            }
        ]
    },
]);