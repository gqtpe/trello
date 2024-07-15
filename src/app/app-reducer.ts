import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ErrorType} from "../common/types"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false as boolean,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: ErrorType}>){
            state.error = action.payload.error
        },
        setAppIsInitialized(state, action: PayloadAction<{value: boolean}>){
            state.isInitialized = action.payload.value
        }
    }
})

export const {setAppStatus,setAppError,setAppIsInitialized} = slice.actions

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>
