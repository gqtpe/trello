import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../state/store";
import {FilterTypeValuesType, TasksStateType, TaskStatuses} from "../../../common/types";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC,} from "../../../state/tasks-reducer";
import {useCallback, useEffect} from "react";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsThunk,
    removeTodoListTC,
    TodoListsDomainType
} from "../../../state/todoLists-reducer";


export function useAppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodoListsDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsThunk)
    }, [dispatch])
    //---------
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListTC(todoListID)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListTC(title)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((todoListID: string, filter: FilterTypeValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleTC(todoListID, title))
    }, [dispatch])
    //---------
    //---------
    const changeTaskStatus = useCallback((todoLisID: string, taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todoLisID, taskID, status))
    }, [dispatch])
    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleTC(todoListID, taskID, title))
    }, [dispatch])
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