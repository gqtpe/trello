import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todoLists-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})
export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// @ts-ignore
window.store = store