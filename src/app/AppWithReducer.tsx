import React, {useCallback, useReducer} from 'react';
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
    removeTodoListAC,
    todoListsReducer
} from "../state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../state/tasks-reducer';
import {v4} from "uuid";
import {useTheme} from "./hooks/App/useTheme";
import { FilterTypeValuesType } from '../common/types';


function App() {
    console.log('App is called')
    let todo1 = v4()
    let todo2 = v4()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,
        [
            {id: todo1, title: "What to learn", filter: "ACTIVE"},
            {id: todo2, title: "What to do", filter: "ALL"},
        ])
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }, [])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }, [])
    const changeFilter = useCallback((todoListID: string, filter: FilterTypeValuesType) => {
        dispatchTodoLists(changeTodoListFilterAC(todoListID, filter))
    }, [])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatchTodoLists(changeTodoListTitleAC(todoListID, title))
    }, [])
    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todo1]: [
            {id: v4(), title: "CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true},
            {id: v4(), title: "React", isDone: false},
            {id: v4(), title: "React Native", isDone: false},
        ],
        [todo2]: [
            {id: v4(), title: "wakeup", isDone: true},
            {id: v4(), title: "do 1st", isDone: true},
            {id: v4(), title: "code", isDone: false},
            {id: v4(), title: "rest", isDone: false},
            {id: v4(), title: "sleep", isDone: false},
        ]
    })
    const changeStatus = useCallback((todoLisID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoLisID, taskID, isDone))

    }, [])
    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskID))
    }, [])
    const addTask = useCallback((todoListID: string, title: string) => {
        dispatchTasks(addTaskAC(todoListID, title))
    }, [])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoListID, taskID, title))
    }, [])
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
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}

                                    tasks={tasks[todoList.id]}
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


export default App;
