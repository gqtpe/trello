import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../../../common/types";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoLists-reducer";
import {Dispatch} from "redux";
import {todoListsAPI, UpdateTaskPayload} from "../../../api/todo-listsAPI";
import {AppRootStateType} from "../../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id ? {...t, ...action.task} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}

        case 'REMOVE-TODOLIST': {
            const copy = {...state};
            delete copy[action.todoListID]
            return copy
        }
        case 'SET-TODOLISTS': {
            const copy = {...state}
            action.todoLists.forEach((tl) => {
                copy[tl.id] = []
            })
            return copy
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListID]: action.tasks}
        }
        default: {
            return state;
        }
    }
}

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