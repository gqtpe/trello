import {useState} from "react";
import {createTheme} from "@mui/material/styles";


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
    return {theme, changeThemeHandler}
}