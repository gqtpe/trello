import {useEffect} from "react";
import {appHooks} from "../../../app";
import {todoListActions, todoListSelectors} from "../index";

export function useTodoLists(demo: boolean = false) {
    const {useAppSelector, useActions} = appHooks
    const todoLists = useAppSelector(todoListSelectors.selectTodoLists)
    const tasks = useAppSelector(todoListSelectors.selectTasks)
    const {fetchTodoLists, addTodoList} = useActions(todoListActions)

    const addTodoListHandler = useCallback(async (title: string, helper: AddItemSubmitHelper) => {
        const action = await addTodoList(title)
        if (todoListActions.addTodoList.rejected.match(action)) {
            if (action.payload?.errors[0]) {
                helper.setError(action.payload?.errors[0])
            } else {
                helper.setError('some error')
            }
        } else {
            helper.setValue('')
        }
    }, [])


    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTodoLists()
    }, [demo, fetchTodoLists])
    //---------

    return {
        todoLists,
        addTodoList: addTodoListHandler,
        tasks,
    }
}