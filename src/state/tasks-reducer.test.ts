import {v4} from "uuid"
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todoLists-reducer";

let todolistID1: string
let todolistID2: string
let startState: TasksStateType
beforeEach(() => {
    todolistID1 = v4()
    todolistID2 = v4()
    startState = {
        [todolistID1]: [
            {id: '1', title: 'hello', isDone: false},
        ],
        [todolistID2]: [
            {id:'1', title: 'wake', isDone: true},
            {id:'2', title: 'do important', isDone: true},
            {id:'3', title: 'learn', isDone: true},
        ]
    }
})
test('tasksReducer have to add new task', () => {
    const newTitle = 'newTitle'
    const endState = tasksReducer(startState, addTaskAC(todolistID1, newTitle))

    expect(startState).not.toBe(endState)
    expect(endState[todolistID1].length).toBe(startState[todolistID1].length + 1)
    expect(endState[todolistID1][0].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(startState[todolistID2].length)

})

test('tasksReducer have to remove', () => {
    const action = removeTaskAC(todolistID1, '1')
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1)
    expect(endState[todolistID2].length).toBe(3)

})

test('tasksReducer have to change task title by id', () => {
    const taskID = '1'
    const newTitle = 'new title'
    const action = changeTaskTitleAC(todolistID1, taskID, newTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].find(t => t.id === taskID)!.title).toBe(newTitle)

})

test('tasksReducer have to change task status by id', () => {
    const taskID = '1'
    const newValue = true
    const action = changeTaskStatusAC(todolistID1, taskID, newValue)
    const endState = tasksReducer(startState, action)

    expect(endState[todolistID1].length).toBe(startState[todolistID1].length)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID1].find(t => t.id === taskID)!.isDone).toBe(newValue)

})

test('new property with empty array should be added when new todolist is added', () => {
    const action = addTodoListAC('sds')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
    if (!newKey) {
        throw new Error('new key have to be added')
    }
    expect(endState[newKey]).toEqual([])
    expect(keys.length).toBe(3)


})

test('property with todolistId have to be deleted', () => {
    const action = removeTodoListAC(todolistID2)

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).not.toBeDefined()
})