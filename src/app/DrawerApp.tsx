import * as React from 'react';
import {useCallback} from 'react';
import {styled, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Grid/Grid";
import {Container, Paper} from "@mui/material";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import TodoList from "../components/TodoList/TodoList";
import {FilterTypeValuesType, TodoListType} from "./App";
import Switch from "@mui/material/Switch";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "../state/todoLists-reducer";
import {useTheme} from "./hooks/App/useTheme";

const drawerWidth = 240;
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,

    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    marginTop: '30px',
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
    }),
}));


export default function PersistentDrawerLeft() {
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
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const {theme, changeThemeHandler} = useTheme()
    return (
        <Box sx={{display: 'flex'}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={'fixed'} open={open}>
                    <Toolbar variant={"dense"}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Switch size="small" onChange={changeThemeHandler}/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Typography variant={"h4"}>Todolist</Typography>
                </Drawer>
                <Main open={open}>
                    <Container>
                        <Grid container margin={2}><Paper sx={{padding: "5px"}}><AddItemForm
                            addItem={addTodoList}/></Paper></Grid>
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
                </Main>
            </ThemeProvider>
        </Box>
    );
}
