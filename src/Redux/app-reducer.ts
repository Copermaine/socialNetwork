import { authorizationRequestThunkCreator } from './auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}


let initialState: InitialStateType = {
    initialized: false
}
const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                //возвращаем копию state и перезатираем значения
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//Thunk Creator
export const initializeAppThunkCreator = () => (dispatch: any) => {
    let promise = dispatch(authorizationRequestThunkCreator())
    promise.then(() => {
        dispatch(initializedSuccess());
    })
}


export default appReducer;