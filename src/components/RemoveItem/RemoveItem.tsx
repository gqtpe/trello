import IconButton from "@mui/material/IconButton/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React from "react";
type RemoveItemPropsType = {
    removeItem: () => void
}
export const RemoveItem = ({removeItem}: RemoveItemPropsType) => {
    const svg = {
        display: 'inline-block',
        fontSize: '1.2rem',
        transition: '0.3s',
        ':hover': {
            color: 'red',
            transition: '0.3s'
        }
    }

    return <IconButton size={"small"} onClick={removeItem}>
        <RemoveCircleIcon fontSize={"inherit"} sx={svg}/>
    </IconButton>
}