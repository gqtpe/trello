import {AnyAction, combineReducers} from 'redux'
import {tasksReducer} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
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

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store