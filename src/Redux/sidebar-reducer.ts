import { FriendsType } from '../types/types'

let initialState = {
    friends: [
        { id: 1, name: 'Vasy', age: 20 },
        { id: 2, name: 'Pety', age: 30 },
        { id: 3, name: 'Vlad', age: 58 },
        { id: 4, name: 'Lenka', age: 33 }
    ] as Array<FriendsType>
}

type InitialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state
}

export default sidebarReducer