import {useLocation} from "react-router-dom";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const useLogin = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/';
    const isAuth = useAppSelector(state => state.auth).isAuth
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
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
        onSubmit: async (values,formikHelper) => {
            const action = await dispatch(loginTC(values))
            if(loginTC.rejected.match(action)){
                if(action.payload?.errors?.length){
                    const error = action.payload?.errors
                    formikHelper.setFieldError('email', error[0])
                    formikHelper.setFieldError('password', error[0])
                }else{

                }
            }
        },
    })

    return {formik, fromPage, isAuth}
}