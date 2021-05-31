import { profileAPI, usersAPI } from "../Api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

//profilePages
let initialState = {
  posts: [
    { id: 0, message: 'How are you?', likesCount: 10 },
    { id: 1, message: 'Im fine', likesCount: 5 },
    { id: 2, message: 'Good morning', likesCount: 1 },
    { id: 3, message: 'Ky-ky', likesCount: 0 }
  ],
  newPostText: 'it',
  userProfile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 4,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        //возвращаем копию state со всеми изменениями
        ...state,
        posts: [...state.posts, newPost]
      };
    case SET_USER_PROFILE:
      return {
        ...state, userProfile: action.userProfile
      };
    case SET_STATUS:
      return {
        ...state, status: action.status
      };
    case DELETE_POST:
      return {
        ...state, posts: state.posts.filter((posts) => posts.id !== action.id)
      };
      case SAVE_PHOTO_SUCCESS:
      return {
        ...state, userProfile: {...state.userProfile, photos: action.photos}
      };
    default:
      return state;
  }
};

//Action Creator
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile: userProfile });
export const setUserStatus = (status) => ({ type: SET_STATUS, status: status });
export const deletePost = (postId) => ({ type: DELETE_POST, id: postId });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos: photos });


//Thunk Creator
export const requestUserProfilerThunkCreator = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const requestUserStatusThunkCreator = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));//string
};

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};
export const savePhotoThunkCreator = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {

    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {
  //get user id in state
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(requestUserProfilerThunkCreator(userId));
  } else {

    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit('ProfileData', { _error: message })); //метод который есть в redux-form
    return Promise.reject();
  }
}

export default profileReducer;