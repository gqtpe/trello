import {v4} from "uuid";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, todoListsReducer, TodoListsStateType} from "./todoLists-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses} from "../common/types";

let todoListID1: string
let todoListID2: string
let startTodoListsState: TodoListsStateType
let startTasksState: TasksStateType

beforeEach(() => {
    todoListID1 = v4()
    todoListID2 = v4()
    startTodoListsState = [
        {id: todoListID1, title: "What to learn", filter: "ACTIVE",addedDate:'',order:-1},
        {id: todoListID2, title: "What to do", filter: "ALL",addedDate:'',order:0},
    ]
    startTasksState = {
        [todoListID1]: [
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
                todoListId: todoListID1
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
                todoListId: todoListID1
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
                todoListId: todoListID1
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
                todoListId: todoListID1
            },
        ],
        [todoListID2]: [
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
                todoListId: todoListID2
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
                todoListId: todoListID2
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
                todoListId: todoListID2
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
                todoListId: todoListID2
            },
        ]
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

