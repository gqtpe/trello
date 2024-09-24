import * as todoListSelectors from './selectors'
import {default as todoListSlice} from './TodoList/todoLists-reducer'
import {default as tasksSlice} from './TodoList/Task/tasks-reducer'
import {asyncActions as todoListAsyncActions} from './TodoList/todoLists-reducer'
import {asyncActions as tasksAsyncActions} from './TodoList/Task/tasks-reducer'
import {TodoListsList} from './TodoListsList'


const todoListActions = {
    ...todoListSlice.actions,
    ...todoListAsyncActions,

}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions,
}

const todoListsReducer = todoListSlice.reducer

const tasksReducer = tasksSlice.reducer


export {
    todoListSelectors,
    tasksActions,
    todoListActions,
    todoListsReducer,
    tasksReducer,
    TodoListsList,

}