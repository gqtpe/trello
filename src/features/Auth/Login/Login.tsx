import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {Navigate} from "react-router-dom"
import {useLogin} from "../useLogin"
import {Checkbox, Paper, Typography} from "@mui/material"
import s from "./Login.module.scss"
import IconButton from "@mui/material/IconButton";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import {CaptchaDialog} from "./Captcha/CaptchaDialog";

export const Login = () => {
    const {formik, isAuth, fromPage, paste, captchaURL, captchaSubmitValue} = useLogin()
    if (isAuth) {
        return <Navigate to={fromPage} replace/>
    }

    return (
        <Paper elevation={6} className={s.login}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <Typography variant="h5" gutterBottom className={s.login__title}>Log In</Typography>
                    <FormLabel className={s.login__description}>
                        <Typography variant="body2">
                            Don't have an account? <a href={'https://social-network.samuraijs.com/'}>Sign Up</a>
                        </Typography>
                        <Typography variant="body2">or use common test account credentials:</Typography>
                        <Typography className={s.login__p} variant="body1"><span>Email</span>:
                            free@samuraijs.com</Typography>
                        <Typography className={s.login__p} variant="body1"><span>Password</span>: free</Typography>
                        <IconButton color={'primary'} size="small" onClick={paste}>
                            <ContentPasteGoIcon/>
                        </IconButton>
                    </FormLabel>
                    <FormGroup className={s.login__}>
                        <TextField
                            label="Email"
                            margin="dense"
                            variant="outlined"
                            size="small"
                            error={!!formik.errors.email}
                            helperText={formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="dense"
                            variant="outlined"
                            size="small"
                            error={!!formik.errors.password}
                            {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel
                            label={<Typography variant="body2">Remember me</Typography>}
                            className={s.login__rememberMe}
                            control={
                                <Checkbox
                                    size="small"
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }
                        />
                        {captchaURL &&
                            <CaptchaDialog
                                captchaURL={captchaURL}
                                error={formik.errors.captcha}
                                onSubmit={captchaSubmitValue}
                            />
                        }
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                disabled={!!(formik.errors.email || formik.errors.password)}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Paper>
    )
}


