import { authorizationRequestThunkCreator } from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        //возвращаем копию state и перезатираем значения
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

//Thunk Creator
export const initializeAppThunkCreator = () => (dispatch) => {
  let promise = dispatch(authorizationRequestThunkCreator());
  promise.then(() => {
    dispatch(initializedSuccess());
  })
}


export default appReducer;