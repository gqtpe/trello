import {v4} from "uuid"
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, updateTaskAC,
} from "../features/TodoListsList/TodoList/tasks-reducer";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType, TodoListType} from "../common/types";




let todolistID1: string
let todolistID2: string
let startState: TasksStateType
beforeEach(() => {
    todolistID1 = v4()
    todolistID2 = v4()
    startState = {
        [todolistID1]: [
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
                todoListId: todolistID1
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
                todoListId: todolistID1
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
                todoListId: todolistID1
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
                todoListId: todolistID1
            },
        ],
        [todolistID2]: [
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
                todoListId: todolistID2
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
                todoListId: todolistID2
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
                todoListId: todolistID2
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
                todoListId: todolistID2
            },
        ]
    }
})
test('tasksReducer have to add new task', () => {

    const task: TaskType = {
        todoListId: todolistID1,
        title: 'new title',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Middle,
        description: '',
        deadline: '',
        status: TaskStatuses.New,
        addedDate: '',
        id: '1'
    }
    const endState = tasksReducer(startState, addTaskAC(task))

    expect(startState).not.toBe(endState)
    expect(endState[todolistID1].length).toBe(startState[todolistID1].length + 1)
    expect(endState[todolistID1][0].title).toBe(task.title)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)

})

test('tasksReducer have to remove', () => {
    const action = removeTaskAC(todolistID1, '1')
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)

})

test('tasksReducer have to change update task', () => {

    const task: TaskType =  {
            id: '3',
            title: 'code',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: todolistID1
        }
    const action = updateTaskAC(task)
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)
    expect(endState[todolistID1].find(t => t.id === action.task.id)!.title).toBe(action.task.title)
    expect(endState[todolistID1].find(t => t.id === action.task.id)!.status).toBe(action.task.status)
    expect(endState[todolistID1].find(t => t.id === action.task.id)!.id).toBe(action.task.id)
    expect(endState[todolistID1].find(t => t.id === action.task.id)!.todoListId).toBe(action.task.todoListId)
    expect(endState[todolistID1].find(t => t.id === action.task.id)!.description).toBe(action.task.description)

})

test('new property with empty array should be added when new todolist is added', () => {
    let todoList: TodoListType = {id: 'newID', title: "What to learn", addedDate: '', order: -1}
    const action = addTodoListAC(todoList)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)

    if (!newKey) {
        throw new Error('new key have to be added')
    }
    expect(keys.length).toBe(Object.keys(startState).length+1)
})

test('property with todolistId have to be deleted', () => {
    const action = removeTodoListAC(todolistID1)

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)
    expect(endState[todolistID1]).not.toBeDefined()
})

test('tasksReducer have to add set tasks', () => {
    const payload: TaskType[] = startState[todolistID1];
    const endState = tasksReducer({
        [todolistID1]: [],
        [todolistID2]: [],
    }, setTasksAC(todolistID1, payload))

    expect(endState[todolistID1].length).toStrictEqual(payload.length)
})

test('tasksReducer have to add set empty cell for tasks', () => {
    const payload: TodoListType[] = [
        {id: todolistID1, title: "What to learn", addedDate: '', order: -1},
        {id: todolistID2, title: "What to do", addedDate: '', order: 0},
    ]
    const endState = tasksReducer({}, setTodoListsAC(payload))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
})
