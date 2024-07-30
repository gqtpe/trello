import * as todoListSelectors from './selectors'
import {slice} from './TodoList/todoLists-reducer'
import {asyncActions as todoListAsyncActions} from './TodoList/todoLists-reducer'
import {asyncActions as tasksAsyncActions} from './TodoList/Task/tasks-reducer'
import {TodoListsList} from './TodoListsList'


const todoListActions = {
    ...slice.actions,
    ...todoListAsyncActions,

}

const tasksActions = {
    ...tasksAsyncActions
}



export {
    todoListSelectors,
    tasksActions,
    todoListActions,
    TodoListsList,

}