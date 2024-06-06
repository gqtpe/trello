import {FilterTypeValuesType, TodoListType} from "../App";
import {v4} from "uuid";

export type TodoListsStateType = TodoListType[]
export type RemoveTodoList = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoList = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListID: string
    title: string
}
export type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    todoListID: string
    filter: FilterTypeValuesType
}
type ActionsType = RemoveTodoList | AddTodoList | ChangeTodoListFilter | ChangeTodoListTitle


export const todoListsReducer = (state: TodoListsStateType, action: ActionsType): TodoListsStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let stateCopy = [...state]
            return stateCopy.filter(t => t.id !== action.todoListID)
        }
        case "ADD-TODOLIST": {
            let todoList: TodoListType = {id: v4(), title: action.title, filter: "ALL"}
            return [todoList, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default: {
            throw new Error('error')
        }
    }
}



export const removeTodoListAC = (todoListID: string) =>{
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    } as const
}
export const addTodoListAC = (title: string) =>{
    return {
        type: 'ADD-TODOLIST',
        title
    } as const
}
export const changeTodoListTitleAC = (todoListID: string, title: string) =>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID,
        title
    } as const
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterTypeValuesType) =>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID,
        filter
    } as const
}