import {TypedUseSelectorHook, useSelector} from "react-redux";

import {AppRootStateType} from "../../../utils/redux-utils";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

