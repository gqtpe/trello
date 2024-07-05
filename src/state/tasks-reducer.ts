import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../common/types";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoLists-reducer";
import {Dispatch} from "redux";
import {todoListsAPI, UpdateTaskPayload} from "../api/todo-listsAPI";
import {AppRootStateType} from "./store";

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
        todoListsAPI.getTasks(todoListID)
            .then((response) => {
                dispatch(setTasksAC(todoListID, response.data.items))
            })
    }
}
export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.createTask(todoListID, title)
            .then((response) => {
                dispatch(addTaskAC(response.data.data.item))
            })
    }
}
export const removeTaskTC = (todoListID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTask(todoListID, taskID)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTaskAC(todoListID, taskID))
                }
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
                dispatch(updateTaskAC(response.data.data.item))
            })
    }

}
//Action Creators
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (todoListID: string, taskID: string) => ({
    type: 'REMOVE-TASK',
    todoListID,
    taskID,
} as const)
export const updateTaskAC = (task: TaskType) => ({type: 'UPDATE-TASK', task} as const)
export const setTasksAC = (todoListID: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListID, tasks,} as const)
//types

type ActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>