import * as appSelectors from "./selectors";
import * as appHooks from "./hooks"
import {useAuth} from "./hooks/useAuth";
import {useTheme} from "./hooks/useTheme";
import slice, {asyncActions} from "./app-reducer";


const appReducer = slice.reducer
const appActions = {
    ...asyncActions,
    ...slice.actions
}


export {
    appSelectors,
    appHooks,
    appReducer,
    appActions,
    useAuth,
    useTheme
}