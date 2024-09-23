import {FilterTypeValuesType, TodoListType} from "../../../common/types";
import {todoListsAPI} from "../../../api/todo-listsAPI";
import {RequestStatusType, setAppStatus} from "../../../app/app-reducer";
import {
    handleServerAppError,
    handleNetworkError,
    handleAsyncServerAppError,
    handleAsyncNetworkError
} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {ThunkErrorType} from "../../../utils/types";

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



const addTodoList = createAsyncThunk('todoLists/addTodoListTC', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.createTodoList(title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todoList: response.data.data.item}
        } else {
            handleServerAppError(response.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
        return rejectWithValue(null)
    }

})
const removeTodoList = createAsyncThunk('todoLists/removeTodoListTC', async (id: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeTodolistEntityStatus({id, entity: 'loading'}))
    try {
        const response = await todoListsAPI.deleteTodoList(id)
        if (response.data.resultCode === 0) {
            dispatch(changeTodolistEntityStatus({id, entity: 'succeeded'}))
            return id
        } else {
            dispatch(changeTodolistEntityStatus({id, entity: 'failed'}))
            handleServerAppError(response.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
        return rejectWithValue(null)
    }

})
const changeTodoListTitle = createAsyncThunk('todoLists/changeTodoListTitleTC', async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {id, title} = param
    try {
        const response = await todoListsAPI.updateTodoList(id, title)
        if (response.data.resultCode === 0) {
            return param
        } else {
            handleServerAppError(response.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const asyncActions = {
    fetchTodoLists,
    addTodoList,
    removeTodoList,
    changeTodoListTitle,
}



export const slice = createSlice({
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
    }
})
const {changeTodolistEntityStatus} = slice.actions
export const todoListsReducer = slice.reducer
//Thunk


//types
export type TodoListsDomainType = TodoListType & {
    filter: FilterTypeValuesType
    entityStatus: RequestStatusType
}