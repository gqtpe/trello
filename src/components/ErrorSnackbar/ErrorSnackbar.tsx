import {Alert, Snackbar} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {ErrorType} from "../../common/types";
import {setAppError} from "../../app/app-reducer";


export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, ErrorType>(state => state.app.error)
    const dispatch = useAppDispatch()
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError({error: null}))
    };

    return <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
            {error}
        </Alert>
    </Snackbar>
}