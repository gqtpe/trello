import {authActions, authReducer} from "../features/Auth";

type StateType = ReturnType<typeof authReducer>
let startState: StateType
beforeEach(() => {
    startState = {
     isAuth: false,
    }
})


test('auth reducer should set auth status', () => {

    const endState = authReducer(startState, authActions.setIsAuth({value: true}))

    expect(endState.isAuth).toBe(true)
})