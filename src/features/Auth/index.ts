import {Login} from "./Login/Login"
import * as authSelectors from "./selectors"
import {asyncActions, slice} from "./auth-reducer";


const authActions = {
    ...asyncActions,
    ...slice.actions,
}

const authReducer = slice.reducer;

export {
    authSelectors,
    Login,
    authActions,
    authReducer
}