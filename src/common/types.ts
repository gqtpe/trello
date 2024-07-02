export type ErrorType = string | null
export type FilterTypeValuesType = "ACTIVE" | "ALL" | "COMPLETED"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterTypeValuesType
}



export type TaskType = { id: string, title: string, isDone: boolean }
