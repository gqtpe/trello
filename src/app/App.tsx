import React from 'react';
import './App.scss';
import TodoList from "../components/TodoList/TodoList";
import {AppBar, Container, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid/Grid";
import {ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {useTasks} from "./hooks/useTasks";
import {useTheme} from "./hooks/useTheme";
import {useTodoLists} from "./hooks/useTodoLists";

function App() {
    const {
        tasks,
        addTask,
        changeTaskTitle,
        removeTask,
        changeStatus,
        completelyRemoveTasksForTodoList,
        addTaskForNewTodoList
    } = useTasks()
    const {
        todoLists,
        removeTodoList,
        changeTodoListTitle,
        changeFilter,
        addTodoList
    } = useTodoLists(addTaskForNewTodoList, completelyRemoveTasksForTodoList)
    const {theme, changeThemeHandler} = useTheme()
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={'static'} sx={{mb: '30px'}}>
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
                                let resultTasks = tasks[todoList.id]
                                if (todoList.filter === "ACTIVE") {
                                    resultTasks = resultTasks.filter(t => !t.isDone)

                                }
                                if (todoList.filter === "COMPLETED") {
                                    resultTasks = resultTasks.filter(t => t.isDone)
                                }
                                return <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    filter={todoList.filter}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}

                                    tasks={resultTasks}
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
