import {FieldErrorType} from "../api/todo-listsAPI";
import {ErrorType} from "../common/types";

export type ThunkErrorType = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
export type AddItemSubmitHelper = {
    setError: (error: ErrorType) => void
    setValue: (value: string) => void
}
export type EditableSubmitHelper = {
    setError: (error: ErrorType) => void
    setValue: (newTitle: string) => void
    setEditMode: (editMode: boolean) => void
}