import {AppRootStateType} from "../../utils/redux-utils";

export const selectIsAuth = (state: AppRootStateType) => state.auth.isAuth

export const selectCaptchaURL = (state: AppRootStateType) =>state.auth.captchaURL