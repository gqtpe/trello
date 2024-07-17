import {useAppDispatch, useAppSelector} from "../../../app/store";
import {FilterTypeValuesType, TaskStatuses} from "../../../common/types";
import {addTaskTC, removeTaskTC, updateTaskTC,} from "../TodoList/tasks-reducer";
import {useCallback, useEffect} from "react";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    removeTodoListTC
} from "../TodoList/todoLists-reducer";


export function useTodoLists(demo: boolean = false) {
    const todoLists = useAppSelector(state => state.todoLists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTodoListsTC())
    }, [demo,dispatch])
    //---------
    const removeTodoList = useCallback((id: string) => dispatch(removeTodoListTC(id)), [dispatch])
    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])
    const changeFilter = useCallback((id: string, filter: FilterTypeValuesType) => dispatch(changeTodoListFilterAC({id, filter})), [dispatch])
    const changeTodoListTitle = useCallback((id: string, title: string) => dispatch(changeTodoListTitleTC({id, title})), [dispatch])
    //---------
    //---------
    const changeTaskStatus = useCallback((todoListID: string, taskID: string, status: TaskStatuses) => dispatch(updateTaskTC({todoListID, taskID, model : {status}})), [dispatch])
    const removeTask = useCallback((todoListID: string, taskID: string) => dispatch(removeTaskTC({todoListID, taskID})), [dispatch])
    const addTask = useCallback((todoListID: string, title: string) => dispatch(addTaskTC({todoListID, title})), [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => dispatch(updateTaskTC({todoListID, taskID, model: {title}})), [dispatch])
    return {
        todoLists,
        addTodoList,
        changeFilter,
        removeTodoList,
        changeTodoListTitle,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
    }
}