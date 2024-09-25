import {authAPI, LoginParamsType} from "../../api/todo-listsAPI";
import {setAppStatus} from "../Application/app-reducer";
import {handleAsyncNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkErrorType} from "../../utils/types";

const initialState = {
    isAuth: false as boolean,
    captchaURL: null as string | null
}

const getCaptcha = createAsyncThunk<string, undefined, ThunkErrorType>('auth/getCaptcha', async (param, thunkAPI) => {
    try {
        debugger;
        const response = await authAPI.getCaptcha()
        return response.data.url
    } catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI, true)
    }
})

const login = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.login(param)
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else if (response.data.resultCode === 10) {

            debugger;
            //Incorrect anti bot symbols
            thunkAPI.dispatch(getCaptcha())
            console.log(response.data.messages[0])
            return handleAsyncServerAppError(response.data, thunkAPI, true)
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI, true)

    }
})

const logout = createAsyncThunk<undefined, undefined, ThunkErrorType>('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI, true)
        }
    } catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI, true)
    }
})


export const asyncActions = {
    login,
    logout,
    getCaptcha,
}

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isAuth = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false
        })
    }
})

export const {setIsAuth} = slice.actions



