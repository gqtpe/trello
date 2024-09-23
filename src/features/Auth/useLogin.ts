import {useLocation} from "react-router-dom";
import {useFormik} from "formik";
import {useState} from "react";
import {authActions, authSelectors} from "./";
import {appHooks} from "../../app";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const useLogin = () => {
    const {useAppSelector, useActions} = appHooks
    const isAuth = useAppSelector(authSelectors.selectIsAuth)
    const [clearValues, setClearValues] = useState(false)
    const {login} = useActions(authActions)

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/';
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validateOnChange: true,
        validateOnBlur: false,
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
        },
        onSubmit: async (values, formikHelper) => {
            const action = await login(values)
            if (authActions.login.rejected.match(action)) {
                if (action.payload?.errors?.length) {
                    const error = action.payload?.errors
                    formikHelper.setFieldError('email', error[0])
                    formikHelper.setFieldError('password', error[0])
                } else {

                }
            }
        },
    })
    const paste = () => {
        if (!clearValues) {
            formik.setValues({
                email: 'free@samuraijs.com',
                password: 'free',
                rememberMe: false,
            })
        } else {
            formik.setValues({
                email: '',
                password: '',
                rememberMe: false,
            })
        }
        setClearValues(state => !state)
    }
    return {formik, fromPage, isAuth, paste}
}