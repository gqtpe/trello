import React, {useState} from "react";
import {ErrorType} from "../../common/types";
import {EditableSubmitHelper} from "../../utils/types";

export const useEditableSpan = (value: string, setValue: (newTitle: string, helper: EditableSubmitHelper) => void, ) =>{
    let [editMode, setEditMode] = useState<boolean>(()=>false)
    let [title, setTitle] = useState<string>(value)
    let [error, setError] = useState<ErrorType>(null)
    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        if (title.trim() !== '') {
            setValue(title, {setError, setValue: setTitle, setEditMode})
        } else {
            setError('Title is required')
        }

    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    const onBlurHandler = () => {
        deactivateEditMode()
    }
    return {onChange, enterHandler, onBlurHandler, activateEditMode, deactivateEditMode, editMode, title, error}
}