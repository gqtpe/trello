import {Alert, Snackbar} from "@mui/material";
import React from "react";
import {setAppError} from "../../app/app-reducer";
import {appHooks, appSelectors} from "../../app";


export const ErrorSnackbar = () => {
    const {useAppDispatch, useAppSelector} = appHooks
    const error = useAppSelector(appSelectors.selectAppError)
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