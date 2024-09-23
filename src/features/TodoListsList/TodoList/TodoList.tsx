import React from "react";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {List, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {RemoveItem} from "../../../components/RemoveItem/RemoveItem";
import {TaskType} from "../../../common/types";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import s from './TodoList.module.scss'
import Typography from "@mui/material/Typography";
import {Task} from "./Task/Task";
import {TodoListsDomainType} from "./todoLists-reducer";
import {useTodoList} from "../hooks/useTodoList";

type PropsType = {
    todoList: TodoListsDomainType
    tasks: TaskType[]
    demo?: boolean
}

const TodoList: React.FC<PropsType> = ({
                                           todoList,
                                           tasks,
                                           demo = false
                                       }) => {
    const {
        changeTodoListTitle,
        changeTaskTitle,
        changeTaskStatus,
        addTask,
        tasksForTodoList,
        changeFilter,
        removeTodoList,
        removeTask
    } = useTodoList(demo, todoList, tasks)
    return (
        <Paper elevation={6}
               className={s.todolist}
               sx={{position: 'relative'}}
               variant={todoList.entityStatus === 'failed' ? 'outlined' : 'elevation'}>
            <Typography gutterBottom variant="h6">
                <EditableSpan
                    value={todoList.title}
                    setValue={changeTodoListTitle}
                />

            </Typography>
            <RemoveItem className={s.todolist__remove} sx={{position: 'absolute'}}
                        removeItem={removeTodoList}
                        disabled={todoList.entityStatus === 'loading'}/>
                <div className={s.addForm}><AddItemForm addItem={addTask} disabled={todoList.entityStatus === 'loading'}/></div>
            <List className={`${s.todolist__list} ${s.list}`} disablePadding>
                {
                    tasks.length === 0 ? <Typography variant={"subtitle1"} color={'gray'}>no tasks</Typography> :
                        tasksForTodoList.map(t =>
                            <Task
                                task={t}
                                key={t.id}
                                changeTaskStatus={changeTaskStatus}
                                removeTask={removeTask}
                                changeTaskTitle={changeTaskTitle}
                            />)
                }
            </List>
            <ToggleButtonGroup
                fullWidth size={'small'} value={todoList.filter} onChange={changeFilter} exclusive
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