import {userReducer, UserReducerStateType} from "./user-reducer";


test('should increment children count',()=>{
    let state: UserReducerStateType = {
        age: 3,
        name: 'eraly',
        childrenCount: 0,
    }

    let result = userReducer(state, {type:'INCREMENT-CHILDREN-COUNT'})
    expect(result.childrenCount).toBe(state.childrenCount+1)
})
test('should increment user age',()=>{
    let state: UserReducerStateType = {
        age: 3,
        name: 'eraly',
        childrenCount: 0,
    }

    let result = userReducer(state, {type:'INCREMENT-AGE'})
    expect(state.age).toBe(3)
    expect(result.age).toBe(state.age+1)
})

test('user reducer have to change name of user',()=>{
    let state: UserReducerStateType = {
        age: 3,
        name: 'eraly',
        childrenCount: 0,
    }
    let newName = 't4sya'
    let result = userReducer(state, {type:'CHANGE-NAME', newName: newName})
    expect(result.name).toBe(newName)
})