import { profileAPI, usersAPI } from '../Api/api'
import { stopSubmit } from 'redux-form'
import { PhotosType, PostType, ProfileType } from '../types/types'

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

//profilePages
let initialState = {
    posts: [
        { id: 0, message: 'How are you?', likesCount: 10 },
        { id: 1, message: 'Im fine', likesCount: 5 },
        { id: 2, message: 'Good morning', likesCount: 1 },
        { id: 3, message: 'Ky-ky', likesCount: 0 }
    ] as Array<PostType>,
    newPostText: 'it',
    userProfile: null as ProfileType | null,
    status: ''
}


type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                ...state, userProfile: { ...state.userProfile, photos: action.photos } as ProfileType
            };
        default:
            return state;
    }
}

//Action Creator
type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
    type: ADD_POST,
    newPostText
})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    userProfile: ProfileType | null
}
export const setUserProfile = (userProfile: ProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    userProfile
})

type SetUserStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_STATUS, status })

type DeletePostType = {
    type: typeof DELETE_POST
    id: number
}
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, id: postId })

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })

//Thunk Creator
export const requestUserProfilerThunkCreator = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const requestUserStatusThunkCreator = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))//string
}

export const updateUserStatusThunkCreator = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch (e) {
        console.error(e)
    }
}
export const savePhotoThunkCreator = (file: any) => async (dispatch: any) => {
    try {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    } catch (e) {
        console.error(e)
    }
}

export const saveProfileThunkCreator = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    //get user id in state
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(requestUserProfilerThunkCreator(userId));
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('ProfileData', { _error: message })); //метод который есть в redux-form
        return Promise.reject();
    }
}

export default profileReducer;