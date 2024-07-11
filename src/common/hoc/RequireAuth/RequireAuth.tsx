import {Navigate, useLocation} from 'react-router-dom'

import React from 'react';
import {useAppSelector} from "../../../app/store";

type Props = {
    children: React.ReactNode
}
const RequireAuth = ({children}: Props) => {
    const location = useLocation()
    const isAuth = useAppSelector(state => state.auth.isAuth)
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
