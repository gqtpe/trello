import {v4} from "uuid";
import {addTodoListAC, removeTodoListAC, todo1, todo2} from "./todoLists-reducer";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>


const initialState: TasksStateType = {
    [todo1]: [
        {id: v4(), title: "CSS", isDone: true},
        {id: v4(), title: "JS", isDone: true},
        {id: v4(), title: "React", isDone: false},
        {id: v4(), title: "React Native", isDone: false},
    ],
    [todo2]: [
        {id: v4(), title: "wakeup", isDone: true},
        {id: v4(), title: "do 1st", isDone: true},
        {id: v4(), title: "code", isDone: false},
        {id: v4(), title: "rest", isDone: false},
        {id: v4(), title: "sleep", isDone: false},
    ]
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const copy = {...state}
            let newTask: TaskType = {id: v4(), title: action.title, isDone: false}
            copy[action.todoListID] = [newTask, ...copy[action.todoListID]]
            return copy
        }
        case "REMOVE-TASK": {
            const copy = {...state}
            copy[action.todoListID] = copy[action.todoListID].filter(t => t.id !== action.taskID)
            return copy
        }
        case "CHANGE-TASK-TITLE": {
            const copy = {...state}
            const tasks = copy[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.newTitle
            }
            return copy
        }
        case "CHANGE-TASK-STATUS": {
            const copy = {...state}
            const tasks = copy[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.newValue
            }
            return copy
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
export const changeTaskStatusAC = (todoListID: string, taskID: string, newValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListID,
        taskID,
        newValue,
    } as const
}