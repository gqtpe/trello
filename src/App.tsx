import React, {useState} from 'react';
import './App.scss';
import {TaskType, TodoList} from "./components/TodoList/TodoList";
import {v4} from "uuid";
import {AppBar, Container, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid/Grid";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'


export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterTypeValuesType
}

type ThemeMode = 'dark' | 'light'

function App() {
    let todo1 = v4()
    let todo2 = v4()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todo1, title: "What to learn", filter: "ACTIVE"},
        {id: todo2, title: "What to do", filter: "ALL"},
    ])
    const removeTodoList = (todoListID: string) => {
        let filteredTodoLists = todoLists.filter(t => t.id !== todoListID)
        setTodoLists(filteredTodoLists)
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    const addTodoList = (title: string) => {
        let id = v4()
        let newTodoList: TodoListType = {id: id, title: title, filter: "ALL"}
        setTodoLists([newTodoList, ...todoLists])
        tasks[id] = []
        setTasks({...tasks})
    }
    const changeFilter = (todoListID: string, filter: FilterTypeValuesType) => {
        let todoList = todoLists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.filter = filter
        }
        setTodoLists([...todoLists])
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        let todoList = todoLists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }
    let [tasks, setTasks] = useState<{ [key: string]: TaskType[] }>({
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
    const changeStatus = (todoLisID: string, taskID: string, isDone: boolean) => {
        let task = tasks[todoLisID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }
    const removeTask = (todoListID: string, taskID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (todoListID: string, title: string) => {
        let newTask: TaskType = {id: v4(), title: title, isDone: false}
        let currTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...currTasks]
        setTasks({...tasks})
    }
    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        let currTasks = tasks[todoListID]
        let task = currTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }

    }
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#1976d2",
            },
        },
    })

    const changeThemeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
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
