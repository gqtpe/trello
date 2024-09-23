import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from '../api/todo-listsAPI'
import {Dispatch} from "redux";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>

type ThunkAPI = {
    dispatch: (action: any) =>void
    rejectWithValue: Function
}


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError( data.messages.length?{error: data.messages[0]}:{error: 'Some error occurred'}))
    dispatch(setAppStatus({status:'failed'}))
}

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: ErrorUtilsDispatchType
) => {
    dispatch(setAppError({error: error.message}))
    dispatch(setAppStatus({status:'failed'}))
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPI, showAlert = false, ) => {
    if(showAlert){
        thunkAPI.dispatch(setAppError(data.messages.length?{error: data.messages[0]}:{error: 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status:'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncNetworkError = (error: AxiosError, thunkAPI: ThunkAPI, showAlert = false) => {
    debugger;
    if(showAlert){
        thunkAPI.dispatch(setAppError({error: error.message}))
    }
    thunkAPI.dispatch(setAppStatus({status:'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}