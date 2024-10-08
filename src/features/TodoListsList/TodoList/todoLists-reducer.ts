import {FilterTypeValuesType, TodoListType} from "../../../common/types";
import {todoListsAPI} from "../../../api/todo-listsAPI";
import {RequestStatusType, setAppStatus} from "../../Application/app-reducer";
import {
    handleServerAppError,
    handleNetworkError,
    handleAsyncServerAppError,
    handleAsyncNetworkError
} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {ThunkErrorType} from "../../../utils/types";
import {authActions} from "../../Auth";

const initialState = [] as TodoListsDomainType[]


const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoListsThunk', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.getTodoLists()
        dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: response.data}
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleNetworkError(e, dispatch)
        }
        return rejectWithValue(null)
    }

})



const addTodoList = createAsyncThunk<{ todoList: TodoListType }, string, ThunkErrorType>('todoLists/addTodoListTC', async (title, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.createTodoList(title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todoList: response.data.data.item}
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI)
    }

})
const removeTodoList = createAsyncThunk('todoLists/removeTodoListTC', async (id: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodolistEntityStatus({id, entity: 'loading'}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.deleteTodoList(id)
        if (response.data.resultCode === 0) {
            dispatch(changeTodolistEntityStatus({id, entity: 'succeeded'}))
            dispatch(setAppStatus({status: 'succeeded'}))
            return id
        } else {
            dispatch(changeTodolistEntityStatus({id, entity: 'failed'}))
            handleServerAppError(response.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleNetworkError(e, dispatch)
        }
        return rejectWithValue(null)
    }

})


type ChangeTodoTitleParam = { id: string, title: string }
const changeTodoListTitle = createAsyncThunk<ChangeTodoTitleParam, ChangeTodoTitleParam, ThunkErrorType>('todoLists/changeTodoListTitleTC', async (param, thunkAPI) => {
    const {id, title} = param
    const {dispatch} = thunkAPI
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.updateTodoList(id, title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI, true)
        }
    } catch (e) {
        return handleAsyncNetworkError(e as AxiosError, thunkAPI, true)
    }
})

export const asyncActions = {
    fetchTodoLists,
    addTodoList,
    removeTodoList,
    changeTodoListTitle,
}



const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ id: string, filter: FilterTypeValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, entity: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entity
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'ALL', entityStatus: 'idle'}))

        })
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'ALL', entityStatus: 'idle'})
        })
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            return state.filter(tl => tl.id !== action.payload)
        })
        builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
        builder.addCase(authActions.logout.fulfilled, (state, action)=>{
            return []
        })
    }
})
const {changeTodolistEntityStatus} = slice.actions


//types
export type TodoListsDomainType = TodoListType & {
    filter: FilterTypeValuesType
    entityStatus: RequestStatusType
}

export default slice;