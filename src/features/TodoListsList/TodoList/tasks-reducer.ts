import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../../../common/types";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoLists-reducer";
import {Dispatch} from "redux";
import {todoListsAPI, UpdateTaskPayload} from "../../../api/todo-listsAPI";
import {AppRootStateType} from "../../../app/store";
import {setAppStatus} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoListID: string, taskID: string }>) {
            const index = state[action.payload.todoListID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todoListID].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            const tasks = state[action.payload.task.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.task.id)
            tasks[index] = action.payload.task
        },
        setTasksAC(state, action: PayloadAction<{ todoListID: string, tasks: TaskType[] }>) {
            state[action.payload.todoListID] = action.payload.tasks
        }
    },
    extraReducers: builder => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
    }
})

export const {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} = slice.actions

export const tasksReducer = slice.reducer
//Thunk
export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListsAPI.getTasks(todoListID)
            .then((response) => {
                dispatch(setTasksAC({todoListID: todoListID, tasks: response.data.items}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListsAPI.createTask(todoListID, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC({task: response.data.data.item}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTaskTC = (todoListID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListsAPI.deleteTask(todoListID, taskID)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTaskAC({todoListID, taskID}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
type UpdateDomainTaskPayload = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todoListID: string, taskID: string, model: UpdateDomainTaskPayload) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const previousTask = getState().tasks[todoListID].find(t => t.id === taskID)

        if (!previousTask) {
            console.warn('task not found ins the state')
            throw new Error('task not found in the state')
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
        todoListsAPI.updateTask(todoListID, taskID, payload)
            .then((response) => {
                debugger;
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC({task: response.data.data.item}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

}