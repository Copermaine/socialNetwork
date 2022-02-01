import { authAPI, securityAPI } from '../Api/api'
import { stopSubmit } from 'redux-form'


const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null as string | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
}

//получаем типы автоматически
export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                //возвращаем копию state и перезатираем значения, склеиваем 2 обьекта
                ...state,
                ...action.payload,

                //если залогиненн меняем isAuth на true
            };
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                //возвращаем копию state и перезатираем значения, склеиваем 2 обьекта
                ...state,
                ...action.payload
                //если залогиненн меняем isAuth на true
            };
        default:
            return state;
    }
}

type SetAuthUserdataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserdataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserdataActionPayloadType
}
export const setAuthUserdata = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserdataActionType => {
    return ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
};

type SetCaptchaUrlSuccessActionPayloadType = {
    captchaUrl: string
}
type SetCaptchaUrlSuccessActionType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS
    payload: SetCaptchaUrlSuccessActionPayloadType
}
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlSuccessActionType => {
    return ({ type: SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })
}

//Thunk Creator
export const authorizationRequestThunkCreator = () => async (dispatch: any) => {
    const data = await authAPI.getAuthorized()
    if (data.resultCode === 0) {
        //деструктуризация, вынимаем из response.data.data данные
        const { id, email, login } = data.data
        dispatch(setAuthUserdata(id, email, login, true))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(authorizationRequestThunkCreator())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrlThunkCreator())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', { _error: message })) //метод который есть в redux-form
        }
    }

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export const logoutThunkCreator = () => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserdata(null, null, null, false))
    }
};

export default authReducer;