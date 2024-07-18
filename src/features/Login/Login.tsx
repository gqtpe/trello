import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {Navigate} from "react-router-dom";
import {useLogin} from "./useLogin";


export const Login = () => {
    const {formik, isAuth, fromPage} = useLogin()
    if (isAuth) {
        return <Navigate to={fromPage} replace/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="dense"
                                variant="standard"
                                size="small"
                                error={!!formik.errors.email}
                                helperText={formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                margin="dense"
                                variant="standard"
                                size="small"
                                error={!!formik.errors.password}
                                {...formik.getFieldProps('password')}
                            />
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={!!(formik.errors.email || formik.errors.password)}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}