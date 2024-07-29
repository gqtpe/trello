import React, {useCallback} from "react";
import {Checkbox, ListItem, Typography} from "@mui/material";
import s from "../TodoList.module.scss";
import {RemoveItem} from "../../../../components/RemoveItem/RemoveItem";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../common/types";

type TaskPropsType = {
    todoListID: string
    task: TaskType
    removeTask: (todoListID: string, id: string,) => void
    changeTaskTitle: (todoListID: string, id: string, newValue: string) => void
    changeTaskStatus: (todoListID: string, id: string, status: TaskStatuses) => void
}
export const Task: React.FC<TaskPropsType> = ({
                                                  todoListID,
                                                  removeTask,
                                                  changeTaskStatus,
                                                  changeTaskTitle,
                                                  task
                                              }) => {
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListID, task.id, e.currentTarget.checked?TaskStatuses.Completed: TaskStatuses.New)
    }
    const changeTaskTitleC = useCallback((value: string) => changeTaskTitle(todoListID, task.id, value), [task.id, todoListID, changeTaskTitle])
    return <ListItem disableGutters disablePadding className={s.todolist__item}>
        <Checkbox
            size="small"
            checked={task.status === TaskStatuses.Completed}
            sx={{padding: 0}}
            onChange={onChangeHandler}
        />
        <Typography variant={'subtitle1'}><EditableSpan value={task.title} setValue={changeTaskTitleC}/></Typography>
        <RemoveItem size="small" removeItem={() => removeTask(todoListID, task.id)}/>
    </ListItem>
}