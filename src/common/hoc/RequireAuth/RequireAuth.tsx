import {Navigate, useLocation} from 'react-router-dom'
import React from 'react';
import {appHooks} from "../../../features/Application";
import {authSelectors} from "../../../features/Auth";

type Props = {
    children: React.ReactNode
}
const RequireAuth = ({children}: Props) => {
    const {useAppSelector} = appHooks
    const location = useLocation()
    const isAuth = useAppSelector(authSelectors.selectIsAuth)
    if (!isAuth) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default React.memo(RequireAuth);
