import React from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField/TextField";
import {useAddItemForm} from "./hooks/useAddItemForm";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    console.log('AddItemForm')
    const {title, error, changeItemHandler, enterKeyPressHandler, addItem} = useAddItemForm(props.addItem)
    return <>
        <TextField
            label="Add Item"
            variant={'outlined'}
            value={title}
            size={'small'}
            error={!!error}
            helperText={error}
            sx={{flexGrow: 1}}
            onChange={changeItemHandler}
            onKeyUp={enterKeyPressHandler}
        />
        <IconButton disabled={props.disabled}  onClick={addItem} color={'primary'}>
            <AddCircleIcon/>
        </IconButton>
    </>
}
export default React.memo(AddItemForm);