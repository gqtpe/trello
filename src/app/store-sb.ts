import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer, todoListsReducer} from "../features/TodoListsList";
import {appReducer} from "../features/Application";
import {TaskPriorities, TaskStatuses} from "../common/types";
import {thunk} from "redux-thunk";
import {authReducer} from "../features/Auth";
import {AppRootStateType} from "../utils/redux-utils";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
const initialGlobalState: AppRootStateType = {
    app: {
        error: null,
        status: 'idle',
        isInitialized: true,
    },
    tasks: {
        ['todolistID1']: [
            {
                id: '1',
                title: 'CSS',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.New,
                todoListId: 'todolistID1'
            },
            {
                id: '2',
                title: 'React',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1'
            },
            {
                id: '3',
                title: 'TS',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.New,
                todoListId: 'todolistID1'
            },
            {
                id: '4',
                title: 'Next',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID1'
            },
        ],
        ['todolistID2']: [
            {
                id: '1',
                title: 'wakeup',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID2'
            },
            {
                id: '2',
                title: 'do important',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.New,
                todoListId: 'todolistID2'
            },
            {
                id: '3',
                title: 'code',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.New,
                todoListId: 'todolistID2'
            },
            {
                id: '4',
                title: 'Next',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                status: TaskStatuses.Completed,
                todoListId: 'todolistID2'
            },
        ]
    },
    todoLists: [
        {id: 'todolistID1', title: "What to learn", entityStatus: 'idle', filter: "ACTIVE", addedDate: '', order: -1},
        {id: 'todolistID2', title: "What to do", entityStatus: 'loading', filter: "ALL", addedDate: '', order: 0},
    ],
    auth: {
        isAuth: true,

    }
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))
