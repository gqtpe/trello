import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {App, store} from "./app";
import {Provider} from "react-redux";
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {TodoListsList} from "./features/TodoListsList";
import {Login} from "./features/Auth";
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
