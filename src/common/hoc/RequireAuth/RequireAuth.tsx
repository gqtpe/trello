import {Navigate, useLocation} from 'react-router-dom'
import React from 'react';
import {appHooks} from "../../../app";
import {authSelectors} from "../../../features/Auth";

type Props = {
    children: React.ReactNode
}
const RequireAuth = ({children}: Props) => {
    const location = useLocation()
    const isAuth = useAppSelector(selectIsAuth)
    if (!isAuth) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default RequireAuth;
