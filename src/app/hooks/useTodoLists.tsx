import {useState} from "react";
import {todo1, todo2} from "../id-utils";
import {FilterTypeValuesType, TodoListType} from "../App";
import {v4} from "uuid";

export function useTodoLists(onTodoListAdd: (id: string)=>void,onTodoListRemoved: (id:string)=>void) {
    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todo1, title: "What to learn", filter: "ACTIVE"},
        {id: todo2, title: "What to do", filter: "ALL"},
    ])
    const changeFilter = (todoListID: string, filter: FilterTypeValuesType) => {
        let todoList = todoLists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.filter = filter
        }
        setTodoLists([...todoLists])
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        let todoList = todoLists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }
    const removeTodoList = (todoListID: string) => {
        let filteredTodoLists = todoLists.filter(t => t.id !== todoListID)
        setTodoLists(filteredTodoLists)
        onTodoListRemoved(todoListID)

    }
    const addTodoList = (title: string) => {
        let id = v4()
        let newTodoList: TodoListType = {id: id, title: title, filter: "ALL"}
        setTodoLists([newTodoList, ...todoLists])
        onTodoListAdd(id)

    }
    return {todoLists,changeFilter,
        changeTodoListTitle,
        removeTodoList,
        addTodoList}
}