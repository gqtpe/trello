import React, {useCallback, useEffect} from "react";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {List, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {fetchTasksTC} from "./tasks-reducer";
import {RemoveItem} from "../../../components/RemoveItem/RemoveItem";
import {useAppDispatch} from "../../../app/store";
import {FilterTypeValuesType, TaskStatuses, TaskType} from "../../../common/types";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import styles from './TodoList.module.scss'
import Typography from "@mui/material/Typography";
import {Task} from "./Task/Task";
import {TodoListsDomainType} from "./todoLists-reducer";

type PropsType = {
    todoList: TodoListsDomainType
    removeTodoList: (todoListID: string) => void
    changeFilter: (todoListID: string, filter: FilterTypeValuesType) => void
    changeTodoListTitle: (todoListID: string, title: string) => void

    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    addTask: (todoListID: string, title: string) => void
    demo?: boolean
}

const TodoList: React.FC<PropsType> = ({
                                           todoList,
                                           removeTodoList,
                                           changeFilter,
                                           changeTodoListTitle,
                                           tasks,
                                           removeTask,
                                           changeStatus,
                                           changeTaskTitle,
                                           addTask,
                                           demo = false
                                       }) => {
    console.log('TodoList')
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(todoList.id))
    }, [demo,dispatch, todoList.id])
    let tasksForTodoList = tasks
    if (todoList.filter === "ACTIVE") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todoList.filter === "COMPLETED") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const filterToggleHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterTypeValuesType) => {
        changeFilter(todoList.id, value)
    }, [changeFilter, todoList.id])
    const addTaskC = useCallback((title: string) => {
        addTask(todoList.id, title)
    }, [todoList.id, addTask])

    const changeTodolistTitle = useCallback((value: string) => {
        changeTodoListTitle(todoList.id, value)
    }, [changeTodoListTitle, todoList.id])
    return (
        <Paper elevation={6} className={styles.todolist}>
            <Typography gutterBottom variant="h6">
                <EditableSpan
                    value={todoList.title}
                    setValue={changeTodolistTitle}
                />
                <RemoveItem removeItem={() => removeTodoList(todoList.id)}
                            disabled={todoList.entityStatus === 'loading'}/>
            </Typography>

            <AddItemForm addItem={addTaskC} disabled={todoList.entityStatus === 'loading'}/>
            <List className={`${styles.todolist__list} ${styles.list}`} disablePadding>
                {
                    tasks.length === 0 ? <Typography variant={"subtitle1"} color={'gray'}>no tasks</Typography> :
                        tasksForTodoList.map(t =>
                            <Task
                                todoListID={todoList.id}
                                task={t}
                                key={t.id}
                                changeTaskStatus={changeStatus}
                                removeTask={removeTask}
                                changeTaskTitle={changeTaskTitle}
                            />)
                }
            </List>
            <ToggleButtonGroup
                fullWidth size={'small'} value={todoList.filter} onChange={filterToggleHandler} exclusive
                color={'primary'}
            >
                <ToggleButton value={'ALL'}>ALL</ToggleButton>
                <ToggleButton value={'ACTIVE'}>ACTIVE</ToggleButton>
                <ToggleButton value={'COMPLETED'}>COMPLETED</ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    )
}

export default React.memo(TodoList);