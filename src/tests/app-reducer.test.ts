import {appReducer, appActions} from "../features/Application";
import {ErrorType} from "../common/types";
import {RequestStatusType} from "../features/Application/app-reducer";

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
    const endState = appReducer(startState, appActions.setAppStatus({status}))

    expect(endState.status).toBe(status)

})
test('app reducer should set app error', () => {
    const error: ErrorType = 'some error'
    const endState = appReducer(startState, appActions.setAppError({error}))

    expect(endState.error).toBe(error)
})

test('initialize App should set isInitialized to true', () => {
    // @ts-ignore
    const action = appActions.initializeApp.fulfilled({}, 'requestId')
    const endState = appReducer(startState,action)

    expect(endState.isInitialized).toBe(true)
})