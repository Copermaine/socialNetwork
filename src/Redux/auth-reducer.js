import { authAPI, securityAPI } from "../Api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null //if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        //возвращаем копию state и перезатираем значения, склеиваем 2 обьекта
        ...state,
        ...action.payload
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
};

export const setAuthUserdata = (userId, email, login, isAuth) => {
  return ({ type: SET_USER_DATA, payload: { userId: userId, email: email, login: login, isAuth: isAuth } });
};

export const setCaptchaUrl = (captchaUrl) => {
  return ({ type: SET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });
};

//Thunk Creator
export const authorizationRequestThunkCreator = () => async (dispatch) => {
  const data = await authAPI.getAuthorized();
  if (data.resultCode === 0) {
    //деструктуризация, вынимаем из response.data.data данные
    const { id, email, login } = data.data;
    dispatch(setAuthUserdata(id, email, login, true));
  }
};

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(authorizationRequestThunkCreator());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrlThunkCreator());
    }
    let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message })); //метод который есть в redux-form
  }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrl(captchaUrl));
};

export const logoutThunkCreator = () => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserdata(null, null, null, false));
  }
};

export default authReducer;