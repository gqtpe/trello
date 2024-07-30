import {useDispatch} from "react-redux";
import {AppThunkDispatch} from "../store";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

