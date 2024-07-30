import React from "react";
import {useAddItemForm} from "./hooks/useAddItemForm";
import { IconButton ,  TextField } from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

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
            <AddCircleOutlinedIcon/>
        </IconButton>
    </>
}
export default React.memo(AddItemForm);