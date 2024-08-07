const BASE_URL = 'https://norma.nomoreparties.space/api'
export const API = {
    ingredients: BASE_URL + '/ingredients',
    orders: BASE_URL + '/orders',
    passwordReset: BASE_URL + '/password-reset',
    register: BASE_URL + '/auth/register',
    currentUser: BASE_URL + '/auth/user',
    login: BASE_URL + '/auth/login',
    token: BASE_URL + '/auth/token',
    logout: BASE_URL + '/auth/logout'

}

const WS_BASE_URL = 'wss://norma.nomoreparties.space';

export const WS_API = {
    orders: WS_BASE_URL + '/orders/all',
    userOrders: WS_BASE_URL + '/orders'
}

