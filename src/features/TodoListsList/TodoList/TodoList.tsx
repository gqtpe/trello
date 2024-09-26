import React from "react";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Grid, List, Paper, Popover, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {RemoveItem} from "../../../components/RemoveItem/RemoveItem";
import {TaskType} from "../../../common/types";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import s from './TodoList.module.scss'
import Typography from "@mui/material/Typography";
import Task from "./Task/Task";
import {TodoListsDomainType} from "./todoLists-reducer";
import {useTodoList} from "../hooks/useTodoList";
import HelpIcon from '@mui/icons-material/Help';
import {usePopover} from "../hooks/usePopover";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
    const [hover, setHover] = React.useState(false)
    const helpIconStyle = {
        color: 'rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.2s ease-in-out, color 0.2s ease-in-out;',
        '&:hover': {
            color: 'rgb(0,0,0, 0.4)',
        },
        '&:active': {
            color: 'rgb(0,0,0, 0.6)',
        },
        opacity: hover ? 1 : 0
    }
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
    const {handleClick, anchorEl, open, handleClose} = usePopover()
    return (
        <Paper elevation={6}
               className={s.todolist}
               sx={{position: 'relative'}}
               variant={todoList.entityStatus === 'failed' ? 'outlined' : 'elevation'}
               onMouseEnter={() => setHover(true)}
               onMouseLeave={() => setHover(false)}
        >

            <Grid display="flex" justifyContent={'space-between'} alignItems={'center'}>
                <HelpIcon
                    sx={helpIconStyle}
                    onClick={handleClick}
                />
                <Popover open={open} anchorEl={anchorEl} onClose={handleClose} elevation={2}
                         anchorOrigin={{
                             vertical: 'center',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'top',
                             horizontal: 'left',
                         }}
                >
                    <Info/>
                </Popover>
                <Typography gutterBottom variant="h6">
                    <EditableSpan
                        value={todoList.title}
                        setValue={changeTodoListTitle}
                    />
                </Typography>
                <RemoveItem
                    removeItem={removeTodoList}
                    disabled={todoList.entityStatus === 'loading'}
                />
            </Grid>
            <div className={s.addForm}><AddItemForm addItem={addTask} disabled={todoList.entityStatus === 'loading'}/>
            </div>
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
const Info = () => {
    return<Typography color="gray" fontSize={12} width={200} padding={0.5}>
        <Typography fontSize={14}>How to Edit Todos <HelpIcon sx={{fontSize: '14px'}}/></Typography>
        <ArrowRightIcon  sx={{fontSize: '12px'}}/> <u>Double-Click to Edit:</u> You can change the name of the Todo List or a Task by
        double-clicking on
        it.<br/>

        <ArrowRightIcon  sx={{fontSize: '12px'}}/><u>Editing Limits</u>: When editing, make sure the title does not exceed 100 characters, or you
        will
        receive an error from the server.<br/>

        <ArrowRightIcon  sx={{fontSize: '12px'}}/><u>Save Your Changes</u>: After editing, press "Enter" or click outside the input field to save
        the<br/>
        updated title.
    </Typography>
}


export default React.memo(TodoList);