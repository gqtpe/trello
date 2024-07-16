import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import TodoListsList from "./features/TodoListsList/TodoListsList";
import {Login} from "./features/Login/Login";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import RequireAuth from "./common/hoc/RequireAuth/RequireAuth";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <Navigate to="/404"/>,
        children: [
            //automatically navigate to first children(todolists)
            {
                index: true,
                element: <Navigate to="todolists" replace/>
            },
            {
                path: 'todolists',
                element: <RequireAuth><TodoListsList/></RequireAuth>
            },
            {
                path: 'login',
                element: <Login/>
            }
        ]
    },
    {
        path: '/404',
        element: <ErrorPage/>
    }

];
const router = createBrowserRouter(routes)

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

reportWebVitals();
