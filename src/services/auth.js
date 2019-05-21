

const AUTH_KEY = 'AUTH';

const login = () => {
    localStorage.setItem(AUTH_KEY, true)
}

const logout = () => {
    localStorage.removeItem(AUTH_KEY);
}

const isAuthenticated = () => Boolean(localStorage.getItem(AUTH_KEY));

export default {
    login, logout, isAuthenticated
}

