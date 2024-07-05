import React, {useCallback, useEffect} from "react";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {List, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {fetchTasksTC} from "../../../state/tasks-reducer";
import {RemoveItem} from "../../../components/RemoveItem/RemoveItem";
import {useAppDispatch} from "../../../state/store";
import {FilterTypeValuesType, TaskStatuses, TaskType} from "../../../common/types";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import styles from './TodoList.module.scss'
import Typography from "@mui/material/Typography";
import {Task} from "./Task/Task";

type PropsType = {
    id: string
    title: string
    filter: FilterTypeValuesType
    removeTodoList: (todoListID: string) => void
    changeFilter: (todoListID: string, filter: FilterTypeValuesType) => void
    changeTodoListTitle: (todoListID: string, title: string) => void

    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    addTask: (todoListID: string, title: string) => void
}

const TodoList: React.FC<PropsType> = ({
                                           id,
                                           title,
                                           filter,
                                           removeTodoList,
                                           changeFilter,
                                           changeTodoListTitle,
                                           tasks,
                                           removeTask,
                                           changeStatus,
                                           changeTaskTitle,
                                           addTask
                                       }) => {
    console.log('TodoList')
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])
    let tasksForTodoList = tasks
    if (filter === "ACTIVE") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "COMPLETED") {
        tasksForTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const filterToggleHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterTypeValuesType) => {
        changeFilter(id, value)
    }, [changeFilter, id])
    const addTaskC = useCallback((title: string) => {
        addTask(id, title)
    }, [id, addTask])

    const changeTodolistTitle = useCallback((value: string) => {
        changeTodoListTitle(id, value)
    }, [changeTodoListTitle, id])
    return (
        <Paper elevation={6} className={styles.todolist}>
            <Typography gutterBottom variant="h6">
                <EditableSpan
                    value={title}
                    setValue={changeTodolistTitle}
                />
                <RemoveItem removeItem={() => removeTodoList(id)}/>
            </Typography>

            <AddItemForm addItem={addTaskC}/>
            <List className={`${styles.todolist__list} ${styles.list}`} disablePadding>
                {
                    tasks.length === 0 ? <Typography variant={"subtitle1"} color={'gray'}>no tasks</Typography> :
                        tasksForTodoList.map(t =>
                            <Task
                                todoListID={id}
                                task={t}
                                key={t.id}
                                changeTaskStatus={changeStatus}
                                removeTask={removeTask}
                                changeTaskTitle={changeTaskTitle}
                            />)
                }
            </List>
            <ToggleButtonGroup
                fullWidth size={'small'} value={filter} onChange={filterToggleHandler} exclusive color={'primary'}
            >
                <ToggleButton value={'ALL'}>ALL</ToggleButton>
                <ToggleButton value={'ACTIVE'}>ACTIVE</ToggleButton>
                <ToggleButton value={'COMPLETED'}>COMPLETED</ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    )
}

export default React.memo(TodoList);