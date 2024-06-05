import React, {KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField/TextField";


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
        } else {
            setError('Title is required')
        }
    }
    const enterKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemCallback()
        }
    }
    const changeItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    return <div>
        <TextField
            label="Add Item"
            variant={'outlined'}
            value={title}
            size={'small'}
            error={!!error}
            helperText={error}
            onChange={changeItemHandler}
            onKeyUp={enterKeyPressHandler}
        />
        <IconButton onClick={addItemCallback} color={'primary'}>
            <AddCircleIcon/>
        </IconButton>
    </div>
}