import {combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todoLists-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store