import { usersAPI as userAPI, usersAPI } from "../Api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOWED';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_SET_FETCHING = 'TOGGLE_IS_SET_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
  users: [/*[
            {
                id: 1,
                followed: true,
                photoUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                fullName: 'Alex',
                status: 'Im a nub',
                location: {city: 'Kharkov', country: 'Ukraine'}
            },
            {
                id: 2,
                followed: false,
                photoUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                fullName: 'Vasy',
                status: 'Im a teacher',
                location: {city: 'Kyiv', country: 'Ukraine'}
            },
            {
                id: 3,
                followed: true,
                photoUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                fullName: 'Oleg',
                status: 'So good',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 4,
                followed: false,
                photoUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                fullName: 'Alena',
                status: 'Bilissimo',
                location: {city: 'Rostov', country: 'Russia'}
            }
        ]*/],
  //общее кол-во элементом
  totalUsersCount: 20,
  //количество элементов отдаваемое сервером за 1 раз
  pagesSize: 10,
  //текущая страница
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        //если Id совпадает, возвращаем копию обьекта и меняем followed на true
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true })
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
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false })
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
};

//Action Creator
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setUsersCount = (totalUsersCount) => ({ type: SET_USERS_COUNT, totalUsersCount: totalUsersCount });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_SET_FETCHING, isFetching: isFetching });
export const toggleIsFollowingProgress = (isFetching, userId) => {
  return ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: isFetching, userId: userId })
};

//Thunk Creators
export const getUsersThunkCreator = (currentPage, pagesSize) => async (dispatch) => {
  //thunk
  dispatch(toggleIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pagesSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setUsersCount(data.totalCount));
};

export const setCurrentPageThunkCreator = (pageNumber, pagesSize) => async (dispatch) => {
  dispatch(setCurrentPage(pageNumber))
  dispatch(toggleIsFetching(true));
  //функция из  Api /выбираем страницу
  let data = await usersAPI.getUsers(pageNumber, pagesSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
};
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleIsFollowingProgress(false, userId));

}
export const followThunkCreator = (userId) => async (dispatch) => {
  let apiMethod = userAPI.follow.bind(userAPI);
  let actionCreator = followSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
};

export const unfollowThunkCreator = (userId) => async (dispatch) => {

  let apiMethod = userAPI.unfollow.bind(userAPI);
  let actionCreator = unfollowSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
};

export default usersReducer;