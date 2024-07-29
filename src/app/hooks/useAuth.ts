import {logoutTC} from "../../features/Auth/auth-reducer";
import {useAppDispatch, useAppSelector} from "../store";
import {useCallback, useEffect} from "react";
import {initializeAppTC} from "../app-reducer";
import {selectAppStatus, selectIsInitialized} from "../selectors";

export const useAuth = (demo = false) => {
    console.log('App is called')
    const isInitialized = useAppSelector(selectIsInitialized)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [demo, dispatch])

    const logout = useCallback(() => {
        debugger;
        dispatch(logoutTC())
    }, [dispatch])
    return {status, isInitialized, logout}
}