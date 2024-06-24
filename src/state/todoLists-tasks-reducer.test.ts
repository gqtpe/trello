import {v4} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoListAC, todoListsReducer, TodoListsStateType} from "./todoLists-reducer";

let todoListID1: string
let todoListID2: string
let startTodoListsState: TodoListsStateType
let startTasksState: TasksStateType

beforeEach(() => {
    todoListID1 = v4()
    todoListID2 = v4()
    startTodoListsState = [
        {id: todoListID1, title: 'What to do', filter: 'ALL'},
        {id: todoListID2, title: 'What to learn', filter: 'ALL'}
    ]
    startTasksState = {
        [todoListID1]:[
            {id: '0', title: 'do important', isDone: false},
            {id: '1', title: 'wake up', isDone: true},
            {id: '2', title: 'learn', isDone: false},
            {id: '3', title: 'sport', isDone: true},
            {id: '3', title: 'sleep', isDone: false},
        ],
        [todoListID2]:[
            {id: '0', title: 'Angular', isDone: false},
            {id: '1', title: 'Next', isDone: true},
            {id: '2', title: 'React Native', isDone: false},
            {id: '3', title: 'RTK', isDone: true},
        ],

    }
})
test('ids should be equal', () => {

    const action = addTodoListAC('newTodoList')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[2]
    const idFromTodoLists = endTodoListState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodoLists).toBe(action.todoListID)
})

