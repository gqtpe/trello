import {AnyAction, combineReducers} from 'redux'
import {tasksReducer} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from './app-reducer';
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// @ts-ignore
window.store = store