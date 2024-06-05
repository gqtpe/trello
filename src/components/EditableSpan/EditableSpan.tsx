import TextField from '@mui/material/TextField/TextField';
import React, {useState} from 'react';


type PropsType = {
    value: string
    setValue: (newTitle: string) => void
}
const EditableSpan = ({value, setValue}: PropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(value)
    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        setEditMode(false)
        setValue(title)
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    const onBlurHandler = () => {
        deactivateEditMode()

    }
    return editMode ?
        <TextField type="text" size={'small'} onKeyDown={enterHandler}
                   autoFocus={true}
                   onBlur={onBlurHandler} variant={'standard'} value={title} onChange={onChange}/>
        :
        <span onDoubleClick={activateEditMode}>{title}</span>
};

export default EditableSpan;