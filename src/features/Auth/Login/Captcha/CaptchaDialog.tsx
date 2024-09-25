import React from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogContent, DialogTitle, IconButton, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import styles from '../Login.module.scss';
import {useCaptcha} from "./useCaptcha";


type CaptchaProps = {
    captchaURL: string
    onSubmit: (value: string) => void
    error?: string
}
export const CaptchaDialog: React.FC<CaptchaProps> = ({captchaURL, error, onSubmit}) => {
    const {
        open,
        value,
        errorMessage,
        handleClickOpen,
        handleClose,
        handleSubmit,
        onChange,
        enterKeyPress
    } = useCaptcha(onSubmit,error)
    return <>
        <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: '10px'}}>
            Insert Captcha
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{paddingVertical: 0}}> Insert Captcha</DialogTitle>
            <DialogContent>
                <div className={styles.captcha}>
                    <div className={styles.captcha__img}><Paper elevation={0}><img src={captchaURL}
                                                                                   alt={'captcha'}/></Paper></div>
                    <div className={styles.captcha__input}>
                        <TextField
                            autoFocus
                            margin="none"
                            id="captcha"
                            size="small"
                            label="Insert Captcha"
                            value={value}
                            onChange={onChange}
                            onKeyUp={enterKeyPress}
                            error={!!errorMessage || (value.trim() == '')}
                            helperText={((value.trim() === '') && 'Required field') || errorMessage}
                        />
                        <IconButton className={styles.captcha__button} onClick={handleSubmit} color={'primary'}>
                            <ArrowCircleRightIcon/>
                        </IconButton>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    </>
}