import {TaskPriorities, TasksStateType, TaskStatuses} from "../../../../common/types";
import {todoListsAPI, UpdateTaskPayload} from "../../../../api/todo-listsAPI";
import {AppRootStateType} from "../../../../app/store";
import {setAppStatus} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {asyncActions as todoListAsyncActions} from "../todoLists-reducer";


//thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasksTC', async (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const response = await todoListsAPI.getTasks(todoListID)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {todoListID: todoListID, tasks: response.data.items}
})

export const addTask = createAsyncThunk('tasks/addTaskTC', async (param: { todoListID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await todoListsAPI.createTask(param.todoListID, param.title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return response.data.data.item
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


export const removeTask = createAsyncThunk('tasks/removeTaskTC', async (param: { todoListID: string, taskID: string }, {
        dispatch,
        rejectWithValue
    }) => {

        dispatch(setAppStatus({status: 'loading'}))
        try {
            const response = await todoListsAPI.deleteTask(param.todoListID, param.taskID)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatus({status: 'succeeded'}))
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

    }
)
export const updateTask = createAsyncThunk('tasks/updateTaskTC', async (param: { todoListID: string, taskID: string, model: UpdateDomainTaskPayload }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const {todoListID, taskID, model} = param
    const state = getState() as AppRootStateType
    const previousTask = state.tasks[todoListID].find(t => t.id === taskID)

    if (!previousTask) {
        console.warn('task not found ins the state')
        return rejectWithValue(null)
    }

    const payload: UpdateTaskPayload = {
        title: previousTask.title,
        deadline: previousTask.deadline,
        description: previousTask.description,
        priority: previousTask.priority,
        startDate: previousTask.startDate,
        status: previousTask.status,
        ...model
    }
    try {
        const response = await todoListsAPI.updateTask(todoListID, taskID, payload)
        if (response.data.resultCode === 0) {
            return response.data.data.item
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
    fetchTasks,
    removeTask,
    addTask,
    updateTask,
}


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(todoListAsyncActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todoListAsyncActions.fetchTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(todoListAsyncActions.removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload]
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const index = state[action.payload.todoListID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todoListID].splice(index, 1)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            tasks[index] = action.payload
        })
    }
})


export const tasksReducer = slice.reducer

export type UpdateDomainTaskPayload = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
