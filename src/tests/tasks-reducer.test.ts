import {v4} from "uuid"
import {
    addTask,
    fetchTasks,
    removeTask,
    tasksReducer,
    updateTask
} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType, TodoListType} from "../common/types";
import {todoListActions} from "../features/TodoListsList";




const {addTodoList, fetchTodoLists, removeTodoList} = todoListActions
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
    const todoListID = todolistID1
    const taskID = '1'
    const task: TaskType = {
        todoListId: todoListID,
        title: 'new title',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Middle,
        description: '',
        deadline: '',
        status: TaskStatuses.New,
        addedDate: '',
        id: taskID
    }
    const endState = tasksReducer(startState, addTask.fulfilled(task, 'requestId', {todoListID, title: task.title}))

    expect(startState).not.toBe(endState)
    expect(endState[todoListID].length).toBe(startState[todolistID1].length + 1)
    expect(endState[todoListID][0].title).toBe(task.title)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)

})

test('tasksReducer have to remove', () => {
    const payload = {todoListID: todolistID1, taskID: '1'};
    const action = removeTask.fulfilled(payload, 'requestId', payload)
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)

})

test('tasksReducer have to change update task', () => {

    const task: TaskType = {
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
    const action = updateTask.fulfilled(task, 'requestId', {
        todoListID: task.todoListId,
        taskID: task.id,
        model: task
    })
    const endState = tasksReducer(startState, action)


    const taskType = endState[todolistID1].find(t => t.id === task.id);

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)
    expect(taskType!.title).toBe(task.title)
    expect(taskType!.status).toBe(task.status)
    expect(taskType!.id).toBe(task.id)
    expect(taskType!.todoListId).toBe(task.todoListId)
    expect(taskType!.description).toBe(task.description)

})

test('new property with empty array should be added when new todolist is added', () => {
    let todoList: TodoListType = {id: 'newID', title: "What to learn", addedDate: '', order: -1}
    const action = addTodoList.fulfilled({todoList},'', todoList.title)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)

    if (!newKey) {
        throw new Error('new key have to be added')
    }
    expect(keys.length).toBe(Object.keys(startState).length + 1)
})

test('property with todolistId have to be deleted', () => {
    const action = removeTodoList.fulfilled(todolistID1,'requestId',todolistID1)

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)
    expect(endState[todolistID1]).not.toBeDefined()
})

test('tasksReducer have to add set tasks', () => {
    const tasks: TaskType[] = startState[todolistID1];
    const endState = tasksReducer({
        [todolistID1]: [],
        [todolistID2]: [],
    }, fetchTasks.fulfilled({todoListID: todolistID1, tasks}, 'requestId', todolistID1))

    expect(endState[todolistID1].length).toStrictEqual(tasks.length)
})

test('tasksReducer have to add set empty cell for tasks', () => {
    const todoLists: TodoListType[] = [
        {id: todolistID1, title: "What to learn", addedDate: '', order: -1},
        {id: todolistID2, title: "What to do", addedDate: '', order: 0},
    ]
    const endState = tasksReducer({}, fetchTodoLists.fulfilled({todoLists: todoLists}, 'requestId',))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
})
