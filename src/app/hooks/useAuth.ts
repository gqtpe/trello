import {logoutTC} from "../../features/Login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../store";
import {useCallback, useEffect} from "react";
import {initializeAppTC} from "../app-reducer";

export const useAuth = (demo = false) => {
    console.log('App is called')
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [demo, dispatch])
    const status = useAppSelector(state => state.app.status)

    const logout = useCallback(() => {
        debugger;
        dispatch(logoutTC())
    }, [dispatch])
    return {status, isInitialized, logout}
}