import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import { useAppDispatch } from "./useAppDispatch";


export function useActions<T extends ActionCreatorsMapObject<any, any[]>>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}
