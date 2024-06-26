import React, {useCallback} from "react";
import {Checkbox, ListItem, Typography} from "@mui/material";
import styles from "../TodoList.module.scss";
import EditableSpan from "../../EditableSpan/EditableSpan";
import {RemoveItem} from "../../RemoveItem/RemoveItem";
import {TaskType} from "../../../state/tasks-reducer";

type TaskPropsType = {
    todoListID: string
    task: TaskType
    removeTask: (todoListID: string, id: string,) => void
    changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
    changeTaskStatus: (todoListID: string, id: string, newValue: boolean) => void
}
export const Task: React.FC<TaskPropsType> = ({
                                                  todoListID,
                                                  removeTask,
                                                  changeTaskStatus,
                                                  changeTaskTitle,
                                                  task
                                              }) => {
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListID, task.id, e.currentTarget.checked)
    }
    const changeTaskTitleC = useCallback((value: string) => changeTaskTitle(todoListID, task.id, value), [])
    return <ListItem disableGutters disablePadding className={styles.todolist__item}>
        <Checkbox
            size="small"
            checked={task.isDone}
            sx={{padding: 0}}
            onChange={onChangeHandler}
        />
        <Typography variant={'subtitle1'}><EditableSpan value={task.title} setValue={changeTaskTitleC}/></Typography>
        <RemoveItem removeItem={() => removeTask(todoListID, task.id)}/>
    </ListItem>
}