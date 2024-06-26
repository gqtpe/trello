import {FilterTypeValuesType, TodoListType} from "../app/App";
import {v4} from "uuid";

export type TodoListsStateType = TodoListType[]
type ActionsType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>

export const todo1 = v4()
export const todo2 = v4()
const initialState: TodoListsStateType = [
    {id: todo1, title: "What to learn", filter: "ACTIVE"},
    {id: todo2, title: "What to do", filter: "ALL"},
]

export const todoListsReducer = (state: TodoListsStateType = initialState, action: ActionsType): TodoListsStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let stateCopy = [...state]
            return stateCopy.filter(t => t.id !== action.todoListID)
        }
        case "ADD-TODOLIST": {
            let todoList: TodoListType = {id: action.todoListID, title: action.title, filter: "ALL"}
            return [todoList, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.newValue
            }
            return [...state]
        }
        default: {
            return state
        }
    }
}


export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    } as const
}
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListID: v4(),
    } as const
}
export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID,
        newTitle
    } as const
}
export const changeTodoListFilterAC = (todoListID: string, newValue: FilterTypeValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        newValue
    } as const
}