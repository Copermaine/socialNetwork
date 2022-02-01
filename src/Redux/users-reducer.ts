import { usersAPI as userAPI, usersAPI } from '../Api/api'
import { updateObjectInArray } from '../utils/object-helpers'
import { UseType } from '../types/types'


const FOLLOW = 'FOLLOWED'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const TOGGLE_IS_SET_FETCHING = 'TOGGLE_IS_SET_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [] as Array<UseType>,
    //общее кол-во элементом
    totalUsersCount: 20,
    //количество элементов отдаваемое сервером за 1 раз
    pagesSize: 10,
    //текущая страница
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //если Id совпадает, возвращаем копию обьекта и меняем followed на true
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
                /*state.users.map((user) => {
                  if (user.id === action.userId) {
                    return { ...user, followed: true }
                  }
                  //Если Id не совпадает, возвращаем обьект без изменения.
                  return user;
                })*/
            };

        case UNFOLLOW:
            return {
                ...state,
                //если Id совпадает, возвращаем копию обьекта и меняем followed на false
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
                /*state.users.map((user) => {
                  if (user.id === action.userId) {
                    return { ...user, followed: false }
                  }
                  //Если Id не совпадает, возвращаем обьект без изменения.
                  return user;
                })*/
            };
        case SET_USERS:
            return {
                //перезатираем при клике массив значениями кот. пршли
                ...state, users: action.users //[...state.users, ...action.users] склеиваем 2 массива
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount //ЗНАЧЕНИЕ totalUsersCount - это имя ключа в АС!!!
            }
        case TOGGLE_IS_SET_FETCHING:
            return {
                ...state, isFetching: action.isFetching//ЗНАЧЕНИЕ totalUsersCount - это имя ключа в АС!!!
            }
        //при подписке закидываем id на кот. хотим подписаться в масиив, при отписке удаляем его
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

//Action Creator
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UseType>
}
export const setUsers = (users: Array<UseType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetUsersCountActionType = {
    type: typeof SET_USERS_COUNT
    totalUsersCount: number
}
export const setUsersCount = (totalUsersCount: number): SetUsersCountActionType => ({
    type: SET_USERS_COUNT,
    totalUsersCount
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_SET_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_SET_FETCHING,
    isFetching
})

type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => {
    return ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
}

//Thunk Creators
export const getUsersThunkCreator = (currentPage: number, pagesSize: number) => async (dispatch: any) => {
    //thunk
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pagesSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUsersCount(data.totalCount))
}

export const setCurrentPageThunkCreator = (pageNumber: number, pagesSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(toggleIsFetching(true))
    //функция из  Api /выбираем страницу
    let data = await usersAPI.getUsers(pageNumber, pagesSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))

}

export const followThunkCreator = (userId: number) => async (dispatch: any) => {
    const apiMethod = userAPI.follow.bind(userAPI);
    const actionCreator = followSuccess;
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const unfollowThunkCreator = (userId: number) => async (dispatch: any) => {
    const apiMethod = userAPI.unfollow.bind(userAPI)
    const actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export default usersReducer