import React from "react";
import {FilterTypeValuesType} from "../../App";
import styles from './TodoList.module.scss'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {List, ListItem, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {RemoveItem} from "../RemoveItem/RemoveItem";

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

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList = ({
                             title,
                             changeTodoListTitle,
                             tasks,
                             removeTodoList,
                             removeTask,
                             changeFilter,
                             changeTaskTitle,
                             addTask,
                             changeStatus,
                             filter,
                             id
                         }: PropsType) => {
    const filterToggleHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: FilterTypeValuesType) => {
        changeFilter(id, value)
    }


    let todoListsList = tasks.length === 0 ? <Typography variant={"subtitle1"} color={'gray'}>no tasks</Typography> :
        tasks.map(t => {
            const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
                changeStatus(id, t.id, e.currentTarget.checked)
            }
            return <ListItem key={t.id} disableGutters disablePadding className={styles.todolist__item}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeHandler}

                />
                <Typography variant={'subtitle1'}><EditableSpan value={t.title}
                                                                setValue={(value) => changeTaskTitle(id, t.id, value)}/></Typography>
                <RemoveItem removeItem={() => removeTask(id, t.id)}/>
            </ListItem>
        })
    return (
        <Paper elevation={3} className={styles.todolist}>
            <Typography gutterBottom variant="h6">
                <EditableSpan
                    value={title}
                    setValue={(value) => changeTodoListTitle(id, value)}
                />
                <RemoveItem removeItem={() => removeTodoList(id)}/>
            </Typography>

            <AddItemForm addItem={(title) => addTask(id, title)}/>
            <List className={`${styles.todolist__list} ${styles.list}`} disablePadding>
                {todoListsList}
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