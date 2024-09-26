import {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";


export const useCaptcha = (onSubmit: (value:string)=>void, error?:string) =>{
    console.log('captcha')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>(error)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (value.trim() !== '') {
            handleClose()
            onSubmit(value)
        } else {
            setErrorMessage('Invalid captcha')
        }
    }


    const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        if (errorMessage) {
            setErrorMessage(undefined)
        }
        setValue(e.target.value)
    },[])
    const enterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }


    return {open, value, errorMessage, handleClickOpen, handleClose, handleSubmit, onChange, enterKeyPress}
}