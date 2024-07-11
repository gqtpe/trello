import {initializeAppTC, logoutTC} from "../../features/Login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../store";
import {useCallback, useEffect} from "react";


export const useAuth = () => {
    console.log('App is called')
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])
    const status = useAppSelector(state => state.app.status)

    const logout = useCallback(()=>{
        dispatch(logoutTC())
    },[dispatch])
    return {status, isInitialized,logout}
}