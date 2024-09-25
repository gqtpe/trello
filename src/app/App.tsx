import React from 'react';
import './App.scss';
import {AppBar, CircularProgress, IconButton, LinearProgress, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {useAuth, useTheme} from "../features/Application";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Outlet, Route, Routes} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {TodoListsList} from "../features/TodoListsList";
import {Login} from "../features/Auth";
import RequireAuth from "../common/hoc/RequireAuth/RequireAuth";

type PropsType = {
    demo?: boolean
}
// todo: tasks, todoLists reordering
function App({demo = false}: PropsType) {
    const {status, isInitialized, logout} = useAuth(demo)
    const {theme, changeThemeHandler} = useTheme()


    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '10px'}}>
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
                        <Box sx={{flexGrow: 1}}>
                            <Switch size="small" onChange={changeThemeHandler}/>
                        </Box>

                        <Button onClick={logout} color="info" size="small" variant="contained"
                                sx={{justifySelf: 'flex-end'}}>Log Out</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                    {status === 'failed' && <LinearProgress variant="buffer" value={100} color="error"/>}
                </AppBar>
                {!demo && <Outlet/>}
                {demo &&
                    <Routes>
                        <Route index path='/' element={<RequireAuth><TodoListsList demo={demo}/></RequireAuth>}/>
                        <Route index path='/login' element={<Login/>}/>
                    </Routes>
                }

            </ThemeProvider>
        </div>
    );
}


export default React.memo(App);
