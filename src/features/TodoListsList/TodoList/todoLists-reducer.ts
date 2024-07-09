import {FilterTypeValuesType, TodoListType} from "../../../common/types";
import {Dispatch} from "redux";
import {todoListsAPI} from "../../../api/todo-listsAPI";

const initialState: TodoListsStateType = []

export const todoListsReducer = (state: TodoListsStateType = initialState, action: ActionsType): TodoListsStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListID)

        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'ALL'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todoListID ? {...t, title: action.newTitle} : t)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todoListID ? {...t, filter: action.newValue} : t)

        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'ALL'}))

        default: {
            return state
        }
    }
}
//Action Creators
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID,} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList,} as const)
export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todoListID,
    newTitle
} as const)
export const changeTodoListFilterAC = (todoListID: string, newValue: FilterTypeValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todoListID,
    newValue
} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: 'SET-TODOLISTS', todoLists,} as const)
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
//types
export type TodoListsDomainType = TodoListType & {
    filter: FilterTypeValuesType
}
export type TodoListsStateType = TodoListsDomainType[]
type ActionsType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>

