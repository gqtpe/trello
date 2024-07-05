import {v4} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListsAC,
    todoListsReducer,
    TodoListsStateType
} from "./todoLists-reducer";
import {FilterTypeValuesType, TodoListType} from "../common/types";




let todolistID1: string;
let todolistID2: string;
let startState: TodoListsStateType;
beforeEach(() => {
    todolistID1 = v4()
    todolistID2 = v4()
    startState = [
        {id: todolistID1, title: "What to learn", filter: "ACTIVE", addedDate: '', order: -1},
        {id: todolistID2, title: "What to do", filter: "ALL", addedDate: '', order: 0},
    ]
})

test('todoListReducer have to  remove todoList', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todolistID1))
    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(todolistID2)
})

test('todoListReducer have to add todoList', () => {
    let todoList: TodoListType = {id: todolistID1, title: "What to learn", addedDate: '', order: -1}
    const endState = todoListsReducer(startState, addTodoListAC(todoList))
    expect(endState.length).toBe(startState.length + 1)
    expect(endState[0].title).toBe(todoList.title)
})

test('todoListReducer have to  change todoList title', () => {
    let newTitle = 'what to learn'

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistID1, newTitle))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].title).toBe(newTitle)
})

test('todoListReducer have to  change todoList filter', () => {
    let newFilter: FilterTypeValuesType = 'ALL'

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistID1, newFilter))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].filter).toBe(newFilter)
})

test('todoListsReducer have to set todoLists', ()=>{
    const endState = todoListsReducer([],setTodoListsAC(startState))
    expect(endState.length).toBe(2)
})
