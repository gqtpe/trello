import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoListAC, todoListsReducer, TodoListsStateType} from "./todoLists-reducer";

test('ids should be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListState: TodoListsStateType = []


    const action = addTodoListAC('newTodoList')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListsReducer(startTodoListState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodoLists).toBe(action.todoListID)
})

