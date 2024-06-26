import { v4 } from "uuid";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer,
    TodoListsStateType
} from "./todoLists-reducer";
import {FilterTypeValuesType} from "../app/App";
let todolistID1:string;
let todolistID2:string;
let startState: TodoListsStateType;
beforeEach(()=> {
    todolistID1 = v4()
    todolistID2 = v4()
    startState = [
        {title: 'what to do', id: todolistID1, filter: "ACTIVE"},
        {title: 'what to sport', id: todolistID2, filter: "ALL"},
    ]
})
test('todoListReducer have to  remove todoList', ()=>{
    const endState = todoListsReducer(startState, removeTodoListAC(todolistID1))
    expect(endState.length).toBe(startState.length-1)
    expect(endState[0].id).toBe(todolistID2)
})
test('todoListReducer have to add todoList', ()=>{
    let newTitle = 'what to learn'
    const endState = todoListsReducer(startState, addTodoListAC(newTitle))
    expect(endState.length).toBe(startState.length+1)
    expect(endState[0].title).toBe(newTitle)
})
test('todoListReducer have to  change todoList title', ()=>{
    let newTitle = 'what to learn'

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistID1, newTitle))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].title).toBe(newTitle)
})
test('todoListReducer have to  change todoList filter', ()=>{
    let newFilter:FilterTypeValuesType = 'ALL'

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistID1,newFilter))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].filter).toBe(newFilter)
})