import {v4} from "uuid";
import {tasksReducer} from "../features/TodoListsList/TodoList/tasks-reducer";
import {
    addTodoListAC,
    TodoListsDomainType,
    todoListsReducer
} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TodoListType} from "../common/types";

let todoListID1: string
let todoListID2: string
let startTodoListsState: TodoListsDomainType[]
let startTasksState: TasksStateType

beforeEach(() => {
    todoListID1 = v4()
    todoListID2 = v4()
    startTodoListsState = [
        {id: todoListID1, title: "What to learn", entityStatus: 'idle', filter: "ACTIVE", addedDate: '', order: -1},
        {id: todoListID2, title: "What to do", entityStatus: 'idle', filter: "ALL", addedDate: '', order: 0},
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
    let todoList: TodoListType = {id: 'newID', title: "What to learn", addedDate: '', order: -1}
    const action = addTodoListAC({todoList})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[2]
    const idFromTodoLists = endTodoListState[0].id

    expect(idFromTodoLists).toBe(action.payload.todoList.id)
    expect(idFromTasks).toBe(action.payload.todoList.id)
})

