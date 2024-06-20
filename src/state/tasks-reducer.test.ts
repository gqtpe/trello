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

//
test('tasksReducer have to add new task', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TasksStateType ={
        [todolistID1]:[
            {id:v4(), title: 'first', isDone: false},
        ],
        [todolistID2]: [
            {id: v4(), title: 'first1', isDone: true}
        ]
    }

    const newTitle = 'newTitle'

    const endState = tasksReducer(startState, addTaskAC(todolistID1, newTitle))

    expect(startState).not.toBe(endState)
    expect(endState[todolistID1].length).toBe(startState[todolistID1].length+1)
    expect(endState[todolistID1][0].title).toBe(newTitle)
    expect(endState[todolistID2].length).toBe(1)

})

test('tasksReducer have to remove new task', ()=>{

    const startState: TasksStateType ={
        "todoListID1":[
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        "todoListID2": [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'coffee', isDone: false},
        ]
    }

    const action = removeTaskAC('todoListID1', '2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'].length).toBe(2)
    expect(endState['todoListID1'].length).toBe(startState['todoListID1'].length-1)
    expect(endState['todoListID2'].length).toBe(3)

})

test('tasksReducer have to change task title by id', ()=>{

    const startState: TasksStateType ={
        "todoListID1":[
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        "todoListID2": [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'coffee', isDone: false},
        ]
    }

    const taskID = '2'
    const todoListID = 'todoListID1'
    const newTitle = 'new title'
    const action = changeTaskTitleAC(todoListID, taskID, newTitle)
    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'].length).toBe(3)
    expect(endState['todoListID1'].length).toBe(startState['todoListID1'].length)
    expect(endState['todoListID2'].length).toBe(3)
    expect(endState[todoListID].find(t=>t.id === taskID)!.title).toBe(newTitle)

})

test('tasksReducer have to change task status by id', ()=>{

    const startState: TasksStateType ={
        "todoListID1":[
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        "todoListID2": [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'coffee', isDone: false},
        ]
    }

    const taskID = '2'
    const todoListID = 'todoListID1'
    const newValue = true
    const action = changeTaskStatusAC(todoListID, taskID, newValue)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListID].length).toBe(3)
    expect(endState[todoListID].length).toBe(startState[todoListID].length)
    expect(endState['todoListID2'].length).toBe(3)
    expect(endState[todoListID].find(t=>t.id === taskID)!.isDone).toBe(newValue)

})

test('new property with empty array should be added when new todolist is added', ()=>{
    const startState: TasksStateType ={
        "todoListID1":[
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        "todoListID2": [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'coffee', isDone: false},
        ]
    }


    const action = addTodoListAC('sds')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=>k != "todoListID1" && k != "todoListID2")
    if(!newKey) {
        throw new Error('new key have to be added')
    }
    expect(endState[newKey]).toEqual([])
    expect(keys.length).toBe(3)


})

test('property with todolistId have to be deleted', () => {
    const startState: TasksStateType = {
        "todoListID1":[
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false},
        ],
        "todoListID2": [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'coffee', isDone: false},
        ]
    }

    const action = removeTodoListAC("todoListID2")

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState["todoListID2"]).not.toBeDefined()
})