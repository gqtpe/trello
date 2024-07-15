import {
    appReducer,
    RequestStatusType,
    setAppError,
    setAppStatus,
    setAppIsInitialized,
} from "../app/app-reducer";
import {ErrorType} from "../common/types";

type StateType = ReturnType<typeof appReducer>
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
    const endState = appReducer(startState, setAppStatus({status}))

    expect(endState.status).toBe(status)

})
test('app reducer should set app error', () => {
    const error: ErrorType = 'some error'
    const endState = appReducer(startState, setAppError({error}))

    expect(endState.error).toBe(error)
})


test('app reducer should set app isInitialized', () => {
    const endState = appReducer(startState, setAppIsInitialized({value: true}))

    expect(endState.isInitialized).toBe(true)
})