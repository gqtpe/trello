import {v4} from "uuid";
import {FilterTypeValuesType, TodoListType} from "../common/types";
import {Dispatch} from "redux";
import {todoListsAPI} from "../api/todo-listsAPI";


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
const initialState: TodoListsStateType = []

export const todoListsReducer = (state: TodoListsStateType = initialState, action: ActionsType): TodoListsStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let stateCopy = [...state]
            return stateCopy.filter(t => t.id !== action.todoListID)
        }
        case 'ADD-TODOLIST': {
            let todoList: TodoListsDomainType = {...action.todoList, filter: 'ALL'}
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
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({...tl, filter: 'ALL'}))
        }
        default: {
            return state
        }
    }
}
//Thunk
export const fetchTodoListsThunk = (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then((response) => {
            dispatch(setTodoListsAC(response.data))
        })
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.createTodoList(title)
            .then((response) => {
                    debugger
                    dispatch(addTodoListAC(response.data.data.item))
                }
            )
    }
}
export const removeTodoListTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTodoList(todoListID)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodoListAC(todoListID))
                }
            })
    }
}
export const changeTodoListTitleTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.updateTodoList(todoListID, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC(todoListID, title))
                }
            })
    }
}
//Action Creators
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID,
    } as const
}
export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        todoList,
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
export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todoLists,
    } as const
}