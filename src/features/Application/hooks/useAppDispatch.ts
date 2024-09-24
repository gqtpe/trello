import {useDispatch} from "react-redux";

import {AppThunkDispatch} from "../../../utils/redux-utils";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

