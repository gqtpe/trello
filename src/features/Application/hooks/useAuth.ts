import {useEffect} from "react";
import {appActions, appHooks, appSelectors} from "../index";
import {authActions} from "../../Auth";

export const useAuth = (demo = false) => {
    console.log('App is called')
    const {useAppSelector, useActions, useAppDispatch} = appHooks
    const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
    const status = useAppSelector(appSelectors.selectAppStatus)
    const {logout} = useActions(authActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(appActions.initializeApp())
        }
    }, [demo, dispatch])

    return {status, isInitialized, logout}
}