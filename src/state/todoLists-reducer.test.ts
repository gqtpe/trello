import { v4 } from "uuid";
import {todoListsReducer, TodoListsStateType} from "./todoLists-reducer";
import {FilterTypeValuesType} from "../App";


test('todoListReducer have to  remove todoList', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]
    const endState = todoListsReducer(startState, {type: "REMOVE-TODOLIST", todoListID: todolistID1})
    expect(endState.length).toBe(startState.length-1)
    expect(endState[0].id).toBe(todolistID2)
})
test('todoListReducer have to  remove todoList', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]

    let newTitle = 'what to learn'
    const endState = todoListsReducer(startState, {type: "ADD-TODOLIST", title: newTitle})
    expect(endState.length).toBe(startState.length+1)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe("ALL")
})
test('todoListReducer have to  change todoList title', ()=>{
    let todolistID1 = v4()
    let todolistID2 = v4()
    const startState: TodoListsStateType =[
        {title: 'what to do', id:todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]

    let newTitle = 'what to learn'

    const endState = todoListsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", todoListID: todolistID1, title: newTitle})
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

    const endState = todoListsReducer(startState, {type: "CHANGE-TODOLIST-FILTER", todoListID: todolistID1, filter: newFilter})
    expect(endState.length).toBe(startState.length)
    expect(endState[0].filter).toBe(newFilter)
})