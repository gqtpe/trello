import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {rootReducer} from "../app/store";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>