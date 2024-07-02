import React from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField/TextField";
import {useAddItemForm} from "./hooks/AddItemForm";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    console.log('AddItemForm')
    const {title, error, changeItemHandler, enterKeyPressHandler, addItem} = useAddItemForm(props.addItem)
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
        <IconButton onClick={addItem} color={'primary'}>
            <AddCircleIcon/>
        </IconButton>
    </div>
}
export default React.memo(AddItemForm);