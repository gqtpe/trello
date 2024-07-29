import {AppRootStateType} from "../../../app/store";

export const selectTodoLists = (state: AppRootStateType)=> state.todoLists
export const selectTasks = (state: AppRootStateType)=> state.tasks