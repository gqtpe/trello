import {TextField} from '@mui/material';
import React from 'react';
import {ErrorType} from "../../common/types";
import {useEditableSpan} from "./useEditableSpan";
import {EditableSubmitHelper} from "../../utils/types";


type PropsType = {
    value: string
    setValue: (newTitle: string, helper: EditableSubmitHelper) => void
    edit?: boolean
    error?: ErrorType
    setError?: (error: ErrorType) => void
}
const EditableSpan = (props: PropsType) => {
    const {
        enterHandler,
        onChange,
        onBlurHandler,
        activateEditMode,
        editMode,
        title,
        error
    } = useEditableSpan(props.value, props.setValue)

    if (props.edit) {
        return <TextField type="text" size={'small'} onKeyDown={enterHandler}
                          autoFocus={true}
                          error={Boolean(props.error) || Boolean(error)}
                          onBlur={onBlurHandler} variant={'standard'} value={title} onChange={onChange}/>
    }

    return editMode ?
        <TextField type="text" size={'small'} onKeyDown={enterHandler}
                   autoFocus={true}
                   error={Boolean(props.error) || Boolean(error)}
                   onBlur={onBlurHandler} variant={'standard'} value={title} onChange={onChange}
                   inputProps={{style: {textAlign: 'center'}}}/>
        :
        <span
            onDoubleClick={activateEditMode}>{props.value.length > 20 ? props.value.slice(0, 15) + '...' : props.value}</span>
};

export default React.memo(EditableSpan);