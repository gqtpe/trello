import {authAPI, LoginParamsType} from "../../api/todo-listsAPI";
import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitialized} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isAuth: false as boolean
}

export type AuthStateType = typeof initialState

export const authReducer = (state: AuthStateType = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case 'login/SET-IS-AUTH':
            return {...state, isAuth: action.value}
        default: {
            return state
        }
    }
}

export const setIsAuth = (value: boolean) => ({
    type: 'login/SET-IS-AUTH',
    value
} as const)

//todo: remove app reducer actions from ActionsType
type ActionsType = ReturnType<typeof setIsAuth>
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setIsInitialized>


export const loginTC = (payload: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(payload)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsAuth(true))
                dispatch(setAppStatusAC('succeeded'))
            } else (
                handleServerAppError(response.data, dispatch)
            )
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsAuth(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setIsAuth(false))
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setIsInitialized(true))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () =>(dispatch: Dispatch<ActionsType>)=>{
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(response=>{
            if(response.data.resultCode === 0){
                dispatch(setIsAuth(false))
                dispatch(setAppStatusAC('succeeded'))
            }else{
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}