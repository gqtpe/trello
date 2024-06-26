import React, {useCallback} from "react";
import {FilterTypeValuesType} from "../../app/App";
import styles from './TodoList.module.scss'
import EditableSpan from "../EditableSpan/EditableSpan";
import {List, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {RemoveItem} from "../RemoveItem/RemoveItem";
import {TaskType} from "../../state/tasks-reducer";
import AddItemForm from "../AddItemForm/AddItemForm";
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
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
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
    let tasksForTodoList = tasks
    if (filter === "ACTIVE") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "COMPLETED") {
        tasksForTodoList = tasks.filter(t => t.isDone)
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