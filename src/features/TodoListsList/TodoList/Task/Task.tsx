import React, {useCallback} from "react";
import {Checkbox, ListItem, Typography} from "@mui/material";
import s from "../TodoList.module.scss";
import {RemoveItem} from "../../../../components/RemoveItem/RemoveItem";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../common/types";

type TaskPropsType = {
    task: TaskType
    removeTask: ( id: string,) => void
    changeTaskTitle: ( id: string, newValue: string) => void
    changeTaskStatus: ( id: string, status: TaskStatuses) => void
}
export const Task: React.FC<TaskPropsType> = ({

                                                  removeTask,
                                                  changeTaskStatus,
                                                  changeTaskTitle,
                                                  task
                                              }) => {
    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        changeTaskStatus( task.id, e.currentTarget.checked?TaskStatuses.Completed: TaskStatuses.New)
    }
    const changeTaskTitleC = useCallback((value: string) => {
        changeTaskTitle( task.id, value)
    }, [task.id, changeTaskTitle])
    const removeTaskC = useCallback(()=>{
        removeTask(task.id)
    },[task.id])
    return <ListItem disableGutters disablePadding className={s.todolist__item}>
        <Checkbox
            size="small"
            checked={task.status === TaskStatuses.Completed}
            sx={{padding: 0}}
            onChange={onChangeHandler}
        />
        <Typography variant={'subtitle1'}><EditableSpan value={task.title} setValue={changeTaskTitleC}/></Typography>
        <RemoveItem size="small" removeItem={removeTaskC}/>
    </ListItem>
}