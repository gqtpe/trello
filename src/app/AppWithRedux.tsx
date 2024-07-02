import React, {useCallback} from 'react';
import './App.scss';
import TodoList from "../components/TodoList/TodoList";
import {AppBar, Container, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid/Grid";
import {ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "../state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from '../state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {useTheme} from "./hooks/useTheme";

export type ErrorType = string | null
export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterTypeValuesType
}

function App() {
    console.log('App is called')
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    //---------
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((todoListID: string, filter: FilterTypeValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }, [dispatch])
    //---------
    //---------
    const changeStatus = useCallback((todoLisID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoLisID, taskID, isDone))
    }, [dispatch])
    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, title))
    }, [dispatch])
    //---------
    const {theme, changeThemeHandler} = useTheme()
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar variant={"dense"}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => alert('open')}
                            edge="start"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Switch size="small" onChange={changeThemeHandler}/>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container margin={2}><Paper sx={{padding: "5px"}}><AddItemForm addItem={addTodoList}/></Paper></Grid>
                    <Grid container margin={2} direction="row" alignItems={'flex-start'} flexWrap={'wrap'} gap={2}>
                        {
                            todoLists.map((todoList) => {
                                return <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    filter={todoList.filter}
                                    tasks={tasks[todoList.id]}

                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}

                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default React.memo(App);
