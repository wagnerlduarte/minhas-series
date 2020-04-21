import Api from './api'

const TOKEN_KEY = 'jwtToken'
const USER_INFO = 'userInfo'

const parse = JSON.parse
const stringify = JSON.stringify

const login = (user) => {
    return Api.login(user)
        .then((response) => {
            setToken(response.data.jwt, true)
            setUserInfo(response.data.user, true)
            return
        })
        .catch((error) => {
            alert(error)
        })
}

const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO)
}

const set = (value, key, isLocalStorage) => {
    if (!value) {
        return null
    }

    if (isLocalStorage && localStorage) {
        return localStorage.setItem(key, stringify(value))
    }

    // if (sessionStorage) {
    //     return sessionStorage.setItem(key, stringify(value));
    // }

    return null
}

const setToken = (value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) => {
    return set(value, tokenKey, isLocalStorage)
}

const setUserInfo = (
    value = '',
    isLocalStorage = false,
    userInfo = USER_INFO
) => {
    return set(value, userInfo, isLocalStorage)
}

const get = (key) => {
    if (localStorage && localStorage.getItem(key)) {
        return parse(localStorage.getItem(key)) || null
    }

    // if (sessionStorage && sessionStorage.getItem(key)) {
    //     return parse(sessionStorage.getItem(key)) || null;
    // }

    return null
}

const getToken = (tokenKey = TOKEN_KEY) => {
    // return true;
    return get(tokenKey)
}

const getUserInfo = (userInfo = USER_INFO) => {
    return get(userInfo)
}

const isAuthenticated = () => Boolean(getToken())

export default {
    login,
    logout,
    isAuthenticated,
    getToken,
}
