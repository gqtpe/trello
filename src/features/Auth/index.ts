import {Login} from "./Login"
import * as authSelectors from "./selectors"
import {asyncActions, slice} from "./auth-reducer";


const authActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    authSelectors,
    Login,
    authActions,
}