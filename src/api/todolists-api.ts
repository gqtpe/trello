import axios from "axios";

const settings = {
    withCredentials: true,

}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        "API-KEY": "9aecfb73-6cd3-4101-8b06-9748a118440e"
    },
    withCredentials: true,

})
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: string
    addedDate: string
}
type FieldErrorType = {
    error: string
    field: string
}
type ResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: T

}
export type UpdateTaskPayload = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`/todo-lists`, settings)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>(`/todo-lists`,{title}, settings)
    },
    deleteTodoList(id: string) {
        return  instance.delete<ResponseType<{}>>(`/todo-lists/${id}` , settings)
    },
    updateTodoList(id: string, title: string) {
        return  instance.put<ResponseType<{}>>(`/todo-lists/${id}`,{title}, settings)
    },
    getTasks(todoListID: string){
        return instance.get<{items: TaskType[]}>(`/todo-lists/${todoListID}/tasks`, settings)
    },
    createTask(todoListID: string,title: string){
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todoListID}/tasks`,{title}, settings)
    },
    deleteTask(todoListID: string,id: string){
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todoListID}/tasks/${id}`,settings)
    },
    updateTask(todoListID: string,id: string, payload: UpdateTaskPayload){
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoListID}/tasks/${id}`,payload,settings)
    }

}
