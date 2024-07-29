import IconButton, { IconButtonProps } from "@mui/material/IconButton/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React from "react";
type RemoveItemPropsType = IconButtonProps & {
    removeItem: () => void
    disabled?: boolean

}
export const RemoveItem = ({removeItem, disabled, ...rest}: RemoveItemPropsType) => {
    const svg = {
        display: 'inline-block',
        fontSize: '1.2rem',
        transition: '0.3s',
        ':hover': {
            color: 'red',
            transition: '0.3s'
        }
    }

    return <IconButton disabled={disabled} onClick={removeItem} {...rest}>
        <RemoveCircleIcon fontSize={"inherit"} sx={svg}/>
    </IconButton>
}