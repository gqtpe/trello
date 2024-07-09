import { ErrorType } from "../common/types"







const initialState: StateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state:StateType = initialState, action: ActionsType) =>{
    switch(action.type){
        case "APP/SET-STATUS":{
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR":{
            return {...state, error: action.error}
        }
        default:{
            return state
        }
    }
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type StateType = {
    status: RequestStatusType
    error: ErrorType
}
type ActionsType = ReturnType<typeof setAppStatusAC>
|  ReturnType<typeof setAppErrorAC>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
//actions
export const setAppStatusAC = (status: RequestStatusType) =>({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setAppErrorAC = (error: ErrorType) =>({
    type: 'APP/SET-ERROR',
    error
} as const)


export type ThunkActions<Actions> = Actions| SetAppErrorActionType | SetAppStatusActionType