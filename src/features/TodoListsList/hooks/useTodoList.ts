
import React, {useCallback, useEffect} from "react";
import {FilterTypeValuesType, TaskStatuses, TaskType} from "../../../common/types";
import {tasksActions, todoListActions} from "../index";
import {TodoListsDomainType} from "../TodoList/todoLists-reducer";
import {appHooks} from "../../../app";


export const useTodoList = (demo: boolean, todoList: TodoListsDomainType, tasks: TaskType[]) => {
    const {useActions} = appHooks

    const {changeTodoListFilter, changeTodoListTitle,removeTodoList} = useActions(todoListActions)
    const {fetchTasks, addTask, removeTask, updateTask} = useActions(tasksActions)

    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks(todoList.id)
    }, [demo, todoList.id])
    //filter
    let tasksForTodoList = tasks
    if (todoList.filter === "ACTIVE") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todoList.filter === "COMPLETED") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    //callbacks
    const filterToggleHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterTypeValuesType) => {
        changeTodoListFilter({id: todoList.id, filter: value})
    }, [todoList.id])
    const changeTodolistTitleCallback = useCallback((value: string) => {
        changeTodoListTitle({id: todoList.id, title: value})
    }, [changeTodoListTitle, todoList.id])
    const removeTodoListCallback = useCallback(() => {
        removeTodoList(todoList.id)
    }, [todoList.id, removeTodoList])

    const addItem = useCallback((title: string) => {
        addTask({todoListID: todoList.id, title})
    }, [todoList.id, addTask])
    const removeTaskCallback = useCallback((taskID: string) => {
        removeTask({todoListID: todoList.id, taskID})
    }, [todoList.id, removeTask])
    const changeTaskStatus = useCallback(( taskID: string, status: TaskStatuses) => {
        updateTask({
            todoListID: todoList.id,
            taskID,
            model: {status}
        })
    }, [todoList.id])
    const changeTaskTitle = useCallback(( taskID: string, title: string) => {
        updateTask({
            todoListID: todoList.id,
            taskID,
            model: {title}
        })
    }, [todoList.id])

    return {
        addTask: addItem,
        changeFilter: filterToggleHandler,
        tasksForTodoList,
        changeTodoListTitle: changeTodolistTitleCallback,
        removeTodoList: removeTodoListCallback,
        removeTask: removeTaskCallback,
        changeTaskTitle,
        changeTaskStatus
    }
}