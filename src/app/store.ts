import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from "../features/TodoListsList/TodoList/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from './app-reducer';
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store