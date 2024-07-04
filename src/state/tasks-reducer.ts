import {v4} from "uuid";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../common/types";
import {addTodoListAC, removeTodoListAC, todo1, todo2} from "./todoLists-reducer";


type ActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>


const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const copy = {...state}
            let newTask: TaskType = {
                id: v4(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListID,
                startDate: (new Date().getTime()).toString(),
                priority: TaskPriorities.Middle,
                order: 0,
                description: '',
                deadline: '',
                addedDate: (new Date().getTime()).toString(),
            }
            copy[action.todoListID] = [newTask, ...copy[action.todoListID]]
            return copy
        }
        case "REMOVE-TASK": {
            const copy = {...state}
            copy[action.todoListID] = copy[action.todoListID].filter(t => t.id !== action.taskID)
            return copy
        }
        case "CHANGE-TASK-TITLE": {
            const tasks = state[action.todoListID]
            state[action.todoListID] = tasks.map(t=>t.id === action.taskID?{...t, title: action.newTitle}:t)
            return {...state}
        }
        case "CHANGE-TASK-STATUS": {
            const tasks: TaskType[] = state[action.todoListID]
            state[action.todoListID] = tasks.map(t=>t.id === action.taskID?{...t, status: action.status}:t)
            return {...state}
        }
        case "ADD-TODOLIST": {
            const copy = {...state}
            copy[action.todoListID] = []
            return copy
        }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
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
            const copy = {...state}
            copy[action.todoListID] = action.tasks
            return copy
        }
        default: {
            return state;
        }
    }
}
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todoListID,
        title,
    } as const
}

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskID,
    } as const
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListID,
        taskID,
        newTitle,
    } as const
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListID,
        taskID,
        status,
    } as const
}

export const setTasksAC = (todoListID: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todoListID,
        tasks,
    } as const
}