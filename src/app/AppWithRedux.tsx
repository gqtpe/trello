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
import {useTheme} from "./hooks/App/useTheme";
import {useAppWithRedux} from "./hooks/AppWithRedux/useAppWithRedux";

function App() {
    console.log('App is called')
    const {todoLists, addTodoList, removeTodoList,changeTodoListTitle,changeFilter,tasks,changeTaskTitle,removeTask,changeTaskStatus,addTask,} = useAppWithRedux()
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
                                    changeStatus={changeTaskStatus}
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
