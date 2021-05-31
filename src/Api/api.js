import * as axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true, //настройка подтверждающая что мы авторизованы
  headers: {  //ключи, заголовки
    'API-KEY': 'e6323d4d-7c69-4f7a-990c-06aff40d85a8'
  }
})

export const usersAPI = {
  //метод API - getUsers возвращает промис, т.е то что возвращает .then, только data
  getUsers(currentPage = 1, pagesSize = 10) {
    //pagesSize кол-во пользователей на странице
    //currentPage текущая страница
    return instance.get(`users?page=${currentPage}&count=${pagesSize}`).then(response => {
      return response.data
    })
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then(response => {
      return response.data
    })
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then(response => {
      return response.data
    })
  },
  getProfile(userId) {
    console.warn('Obsolete method. Please profileAPI object')
    return profileAPI.getProfile(userId)

  }
};
export const authAPI = {
  getAuthorized() {
    return instance.get(`auth/me`).then(response => {
      return response.data
    })
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login/`, { email: email, password: password, rememberMe: rememberMe, captcha:captcha })
    .then(response => {
      return response.data
    })
  },
  logout() {
    return instance.delete(`auth/login/`).then(response => {
      return response.data
    })
  }
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)

  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status })
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  saveProfile(profile) {
    // Warning, pfofile is Object!!!
    return instance.put(`profile`, profile)
  }
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}