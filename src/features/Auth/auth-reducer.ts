import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todo-listsAPI";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState = {
    isAuth: false as boolean
}
export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.login(param)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(response.data, dispatch)
            return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})

    }
})


export const logoutTC = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        const error = e as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})

    }
})
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isAuth = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isAuth = false
        })
    }
})

export const {setIsAuth} = slice.actions

export const authReducer = slice.reducer


