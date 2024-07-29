import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ErrorType} from "../common/types"
import {authAPI} from "../api/todo-listsAPI";
import {setIsAuth} from "../features/Auth/auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false as boolean,
}
export const initializeAppTC = createAsyncThunk('app/init', async (param, {dispatch}) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setIsAuth({value: true}))
    } else {

    }
})

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: ErrorType }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const {setAppStatus, setAppError} = slice.actions

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>

