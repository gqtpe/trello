import {v4} from "uuid";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../common/types";
import {addTodoListAC, removeTodoListAC, todo1, todo2} from "./todoLists-reducer";


type ActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>


const initialState: TasksStateType = {
    [todo1]: [
        {
            id: v4(),
            title: 'CSS',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: todo1
        },
        {
            id: v4(),
            title: 'React',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.Completed,
            todoListId: todo1
        },
        {
            id: v4(),
            title: 'TS',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: todo1
        },
        {
            id: v4(),
            title: 'Next',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.Completed,
            todoListId: todo1
        },
    ],
    [todo2]: [
        {
            id: v4(),
            title: 'wakeup',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.Completed,
            todoListId: todo2
        },
        {
            id: v4(),
            title: 'do important',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: todo2
        },
        {
            id: v4(),
            title: 'code',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: todo2
        },
        {
            id: v4(),
            title: 'Next',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.Completed,
            todoListId: todo2
        },
    ]
}
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