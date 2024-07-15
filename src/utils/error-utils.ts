import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from '../api/todo-listsAPI'
import {Dispatch} from "redux";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status:'failed'}))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: ErrorUtilsDispatchType
) => {
    dispatch(setAppError({error: error.message}))
    dispatch(setAppStatus({status:'failed'}))
}
