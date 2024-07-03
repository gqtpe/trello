import * as React from 'react';
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
import Switch from "@mui/material/Switch";
import {useTheme} from "./hooks/App/useTheme";
import {useAppWithRedux} from "./hooks/AppWithRedux/useAppWithRedux";

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
    const {
        todoLists,
        addTodoList,
        removeTodoList,
        changeTodoListTitle,
        changeFilter,
        tasks,
        changeTaskTitle,
        removeTask,
        changeStatus,
        addTask,
    } = useAppWithRedux()
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
