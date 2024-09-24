import {AppRootStateType} from "../../utils/redux-utils";

export const selectTodoLists = (state: AppRootStateType)=> state.todoLists
export const selectTasks = (state: AppRootStateType)=> state.tasks
