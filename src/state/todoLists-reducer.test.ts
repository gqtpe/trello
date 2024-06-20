import { v4 } from "uuid";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer,
    TodoListsStateType
} from "./todoLists-reducer";
import {FilterTypeValuesType} from "../App";


test('todoListReducer have to  remove todoList', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]
    const endState = todoListsReducer(startState, removeTodoListAC(todolistID1))
    expect(endState.length).toBe(startState.length-1)
    expect(endState[0].id).toBe(todolistID2)
})
test('todoListReducer have to add todoList', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]

    let newTitle = 'what to learn'
    const endState = todoListsReducer(startState, addTodoListAC(newTitle))
    expect(endState.length).toBe(startState.length+1)
    expect(endState[0].title).toBe(newTitle)
})
test('todoListReducer have to  change todoList title', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]

    let newTitle = 'what to learn'

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistID1, newTitle))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].title).toBe(newTitle)
})
test('todoListReducer have to  change todoList filter', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]

    let newFilter:FilterTypeValuesType = 'ALL'

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistID1,newFilter))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].filter).toBe(newFilter)
})