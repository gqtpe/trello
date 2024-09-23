import React, {KeyboardEvent, useState} from "react";
import {ErrorType} from "../../../common/types";
import {AddItemSubmitHelper} from "../../../utils/types";

export const useAddItemForm = (onItemAdded: (title: string, helper:AddItemSubmitHelper)=>void) =>{
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<ErrorType>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            onItemAdded(title, {setError, setValue: setTitle})
        } else {
            setError('Title is required')
        }
    }
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }
    const changeItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    return {title, error, changeItemHandler, enterKeyPressHandler,addItem}
}