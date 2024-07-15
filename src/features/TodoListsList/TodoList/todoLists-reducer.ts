import {FilterTypeValuesType, TodoListType} from "../../../common/types";
import {Dispatch} from "redux";
import {todoListsAPI} from "../../../api/todo-listsAPI";
import {RequestStatusType, setAppStatus} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = [] as TodoListsDomainType[]


const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
            return state.filter(tl => tl.id !== action.payload.id)
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'ALL', entityStatus: 'idle'})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterTypeValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entity: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entity
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'ALL', entityStatus: 'idle'}))
        }
    }
})
export const {
    removeTodoListAC,
    setTodoListsAC,
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    changeTodolistEntityStatusAC
} = slice.actions

export const todoListsReducer = slice.reducer
//Thunk
export const fetchTodoListsThunk = (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todoListsAPI.getTodoLists()
        .then((response) => {
            dispatch(setTodoListsAC({todoLists: response.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListsAPI.createTodoList(title)
            .then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(addTodoListAC({todoList: response.data.data.item}))
                        dispatch(setAppStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError(response.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })

    }
}
export const removeTodoListTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC({id, entity: 'loading'}))
        todoListsAPI.deleteTodoList(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodoListAC({id}))
                    dispatch(changeTodolistEntityStatusAC({id, entity: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodoListTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.updateTodoList(id, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC({id, title}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

//types
export type TodoListsDomainType = TodoListType & {
    filter: FilterTypeValuesType
    entityStatus: RequestStatusType
}