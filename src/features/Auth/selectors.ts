import {AppRootStateType} from "../../app/store";

export const selectIsAuth = (state: AppRootStateType) => state.auth.isAuth