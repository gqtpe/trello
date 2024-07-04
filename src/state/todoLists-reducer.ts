import {v4} from "uuid";
import {FilterTypeValuesType, TodoListType } from "../common/types";


export type TodoListsDomainType = TodoListType & {
    filter: FilterTypeValuesType
}
export type TodoListsStateType = TodoListsDomainType[]
type ActionsType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>

export const todo1 = v4()
export const todo2 = v4()
const initialState: TodoListsStateType = [
]

export const todoListsReducer = (state: TodoListsStateType = initialState, action: ActionsType): TodoListsStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let stateCopy = [...state]
            return stateCopy.filter(t => t.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            let date = new Date()
            let todoList: TodoListsDomainType = {
                id: action.todoListID,
                title: action.title,
                filter: "ALL",
                order: state[0]?state[0].order-1:0,
                addedDate: date.getTime().toString()
            }
            return [todoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(t => t.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.newValue
            }
            return [...state]
        }
        case 'SET-TODOLISTS':{
            return action.todoLists.map(tl=>({...tl, filter: 'ALL'}))
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
export const setTodoListsAC = (todoLists: TodoListType[]) =>{
    return {
        type: 'SET-TODOLISTS',
        todoLists,
    } as const
}