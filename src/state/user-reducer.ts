export  type UserReducerStateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}


export const userReducer = (state: UserReducerStateType, action: ActionType): UserReducerStateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':{
            let stateCopy = {...state}
            stateCopy.age += 1
            return stateCopy
        }
        case 'INCREMENT-CHILDREN-COUNT':{
            let stateCopy = {...state}
            stateCopy.childrenCount += 1
            return stateCopy
        }
        case 'CHANGE-NAME':{
            let stateCopy = {...state}
            stateCopy.name = action.newName
            return stateCopy
        }

        default:
            throw new Error('cant understand this action.type')
    }

}
