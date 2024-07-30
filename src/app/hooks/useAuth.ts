import {useEffect} from "react";
import {initializeApp} from "../app-reducer";
import {appHooks, appSelectors} from "../";
import {authActions} from "../../features/Auth";

export const useAuth = (demo = false) => {
    console.log('App is called')
    const {useAppSelector, useActions, useAppDispatch} = appHooks
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
    const status = useAppSelector(appSelectors.selectAppStatus)
    const {logout} = useActions(authActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(initializeApp())
        }
    }, [demo, dispatch])

    return {status, isInitialized, logout}
}