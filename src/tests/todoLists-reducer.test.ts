import {v4} from "uuid";
import {TodoListsDomainType} from "../features/TodoListsList/TodoList/todoLists-reducer";
import {FilterTypeValuesType, TodoListType} from "../common/types";
import {RequestStatusType} from "../features/Application/app-reducer";
import {todoListActions, todoListsReducer} from "../features/TodoListsList";


const {
    changeTodolistEntityStatus,
    changeTodoListFilter,
    fetchTodoLists,
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
} = todoListActions
let todolistID1: string;
let todolistID2: string;
let startState: TodoListsDomainType[];
beforeEach(() => {
    todolistID1 = v4()
    todolistID2 = v4()
    startState = [
        {id: todolistID1, title: "What to learn", entityStatus: 'idle', filter: "ACTIVE", addedDate: '', order: -1},
        {id: todolistID2, title: "What to do", entityStatus: 'idle', filter: "ALL", addedDate: '', order: 0},
    ]
})

test('todoListReducer have to  remove todoList', () => {
    const endState = todoListsReducer(startState, removeTodoList.fulfilled(todolistID1, 'requestId', todolistID1))
    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(todolistID2)
})

test('todoListReducer have to add todoList', () => {
    let todoList: TodoListType = {id: todolistID1, title: "What to learn", addedDate: '', order: -1}
    const endState = todoListsReducer(startState, addTodoList.fulfilled({todoList}, 'requestId', todoList.title))
    expect(endState.length).toBe(startState.length + 1)
    expect(endState[0].title).toBe(todoList.title)
})

test('todoListReducer have to  change todoList title', () => {
    let newTitle = 'what to learn'

    const payload = {id: todolistID1, title: newTitle};
    const endState = todoListsReducer(startState, changeTodoListTitle.fulfilled(payload, 'requestId', payload))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].title).toBe(newTitle)
})

test('todoListReducer have to  change todoList filter', () => {
    let newFilter: FilterTypeValuesType = 'ALL'

    const endState = todoListsReducer(startState, changeTodoListFilter({id: todolistID1, filter: newFilter}))
    expect(endState.length).toBe(startState.length)
    expect(endState[0].filter).toBe(newFilter)
})

test('todoListsReducer have to set todoLists', () => {
    const endState = todoListsReducer([], fetchTodoLists.fulfilled({todoLists: startState}, 'requestId',))
    expect(endState.length).toBe(2)
})

test('todoListReducer have to set entityStatus for correct todolist', () => {
    const status: RequestStatusType = 'succeeded'
    const endState = todoListsReducer(startState, changeTodolistEntityStatus({id: todolistID1, entity: status}))

    expect(endState[0].entityStatus).toBe(status)
    expect(endState[1].entityStatus).toBe('idle')

})
