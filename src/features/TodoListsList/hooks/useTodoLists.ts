import {useEffect} from "react";
import {appHooks} from "../../../app";
import {todoListActions, todoListSelectors} from "../index";

export function useTodoLists(demo: boolean = false) {
    const {useAppSelector, useActions} = appHooks
    const todoLists = useAppSelector(todoListSelectors.selectTodoLists)
    const tasks = useAppSelector(todoListSelectors.selectTasks)
    const {fetchTodoLists, addTodoList} = useActions(todoListActions)
    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTodoLists()
    }, [demo, fetchTodoLists])
    //---------

    return {
        todoLists,
        addTodoList,
        tasks,
    }
}