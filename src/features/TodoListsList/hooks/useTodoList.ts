
import React, {useCallback, useEffect} from "react";
import {FilterTypeValuesType, TaskStatuses, TaskType} from "../../../common/types";
import {tasksActions, todoListActions} from "../index";
import {TodoListsDomainType} from "../TodoList/todoLists-reducer";
import {appHooks} from "../../../app";
import {AddItemSubmitHelper, EditableSubmitHelper} from "../../../utils/types";


export const useTodoList = (demo: boolean, todoList: TodoListsDomainType, tasks: TaskType[]) => {
    const {useActions} = appHooks

    const {changeTodoListFilter, changeTodoListTitle, removeTodoList} = useActions(todoListActions)
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
    const changeTodolistTitleCallback = useCallback(async (value: string, helper: EditableSubmitHelper) => {
        const action = await changeTodoListTitle({id: todoList.id, title: value})
        if (todoListActions.changeTodoListTitle.rejected.match(action)) {
            if (action.payload?.errors[0]) {
                helper.setError(action.payload?.errors[0])
            } else {
                helper.setError('some error')
            }
        } else {
            helper.setEditMode(false)
        }

    }, [changeTodoListTitle, todoList.id])
    const removeTodoListCallback = useCallback(() => {
        removeTodoList(todoList.id)
    }, [todoList.id, removeTodoList])

    const addItem = useCallback(async (title: string, helper: AddItemSubmitHelper) => {
        const action = await addTask({todoListID: todoList.id, title})
        if (tasksActions.addTask.rejected.match(action)) {
            if (action.payload?.errors[0]) {
                helper.setError(action.payload?.errors[0])
            } else {
                helper.setError('some error')
            }
        } else {
            helper.setValue('')
        }
    }, [todoList.id, addTask])
    const removeTaskCallback = useCallback((taskID: string) => {
        removeTask({todoListID: todoList.id, taskID})
    }, [todoList.id, removeTask])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses) => {
        updateTask({
            todoListID: todoList.id,
            taskID,
            model: {status}
        })
    }, [todoList.id])
    const changeTaskTitle = useCallback(async (taskID: string, title: string, helper: EditableSubmitHelper) => {
        const action = await updateTask({
            todoListID: todoList.id,
            taskID,
            model: {title}
        })
        if (tasksActions.updateTask.rejected.match(action)) {
            if (action.payload?.errors[0]) {
                helper.setError(action.payload?.errors[0])
            } else {
                helper.setError('some error')
            }
        } else {
            helper.setEditMode(false)
        }
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