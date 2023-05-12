import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootPage from "./pages/root/RootPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import {ConfigProvider} from "antd";
import IndexPage from "./pages/index/IndexPage.tsx";
import QuizPage from "./pages/quiz/QuizPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <IndexPage/>
            },
            {
                path: '/quiz/:quizName',
                element: <QuizPage/>
            },
        ]
    },
]);

// React.StrictMode will call the fetch quiz two times but only in dev env
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <RouterProvider router={router}/>
        </ConfigProvider>
    </React.StrictMode>,
)
