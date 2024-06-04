import React, {KeyboardEvent, useState} from "react";
import styles from "../TodoList/TodoList.module.scss";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null)

    const addItemCallback = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')

        } else{
            setError('Title is required')
        }


    }
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            addItemCallback()
        }
    }
    const changeItemHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    return <div>
        <input
            onChange={changeItemHandler}
            type="text"
            onKeyUp={enterKeyPressHandler}
            value={title}
            className={error ? styles.error : ""}
        />
        <button onClick={addItemCallback}>+</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
}