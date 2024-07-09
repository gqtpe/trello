import {useState} from "react";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {RequestStatusType} from "../app-reducer";


type ThemeMode = 'dark' | 'light'
export const useTheme = () => {
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
    const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)
    return {theme, changeThemeHandler,status}
}