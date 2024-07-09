import React from 'react';
import './App.scss';
import {AppBar, IconButton, LinearProgress, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {useTheme} from "./hooks/useTheme";
import TodoListsList from "../features/TodoListsList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
type PropsType = {
    demo?:boolean
}
function App({demo = false}:PropsType) {
    console.log('App is called')
    const {theme, changeThemeHandler,status} = useTheme()
    return (
        <div className="App">
            <ErrorSnackbar/>
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
                    {status === 'loading' && <LinearProgress/>}
                    {status === 'failed' && <LinearProgress variant="buffer" value={100} color="error"/>}
                </AppBar>
                <TodoListsList demo={demo}/>
            </ThemeProvider>
        </div>
    );
}


export default React.memo(App);
