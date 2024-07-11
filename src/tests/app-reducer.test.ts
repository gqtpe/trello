import {
    appReducer,
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitialized,
    StateType
} from "../app/app-reducer";
import {ErrorType} from "../common/types";


let startState: StateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
})
test('app reducer should set app status', () => {
    const status: RequestStatusType = 'succeeded'
    const endState = appReducer(startState, setAppStatusAC(status))

    expect(endState.status).toBe(status)

})
test('app reducer should set app error', () => {
    const error: ErrorType = 'some error'
    const endState = appReducer(startState, setAppErrorAC(error))

    expect(endState.error).toBe(error)
})