import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ErrorType} from "../common/types"
import {authAPI} from "../api/todo-listsAPI";
import {setIsAuth} from "../features/Auth/auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false as boolean,
}
const initializeApp = createAsyncThunk<number,undefined,ThunkErrorType >('app/init', async (param, thunkAPI) => {

    try {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setIsAuth({value: true}))
            return response.data.data.id
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    }catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI,true)
    }
})
export const asyncActions = {initializeApp}

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
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const {setAppStatus, setAppError} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppErrorActionType = ReturnType<typeof setAppError>

