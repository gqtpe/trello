import {authAPI, LoginParamsType} from "../../api/todo-listsAPI";
import {Dispatch} from "redux";
import {setAppStatus, setAppIsInitialized} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false as boolean
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value
        }
    }
})

export const {setIsAuth} = slice.actions

export const authReducer = slice.reducer

export const loginTC = (payload: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authAPI.login(payload)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsAuth({value: true}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else (
                handleServerAppError(response.data, dispatch)
            )
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsAuth({value: true}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else if(response.data.resultCode === 1) {
                dispatch(setIsAuth({value: false}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else{
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setAppIsInitialized({value:true}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsAuth({value: false}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}