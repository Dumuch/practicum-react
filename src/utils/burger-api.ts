import {API} from '../constants';
import {request} from '../helpers';
import {ILoginReq, ILoginRes, IRegisterReq, IRegisterRes, IToken, IUpdateUserReq, IUser} from "../models/common";

export const getIngredients = async () => {
    return request(API.ingredients).then(({data}) => data)
}

const HEADERS_WITH_DATA = {'Content-Type': 'application/json', accept: 'application/json'}

export const submitOrder = async (values: object) => {
    return request(API.orders, {
        method: 'POST',
        body: values ? JSON.stringify(values) : undefined,
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const forgotPassword = async (email: string) => {
    return request(API.passwordReset, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const resetPassword = async (password: string, token: string) => {
    return request(API.passwordReset + '/reset', {
        method: 'POST',
        body: JSON.stringify({password, token}),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const register = async (values: IRegisterReq): Promise<IRegisterRes> => {
    return request(API.register, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const login = async (values: ILoginReq): Promise<ILoginRes> => {
    return request(API.login, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

const fetchWithRefresh = async (fn: () => Promise<any>) => {
    return await fn().catch(async (e) => {
        if (e.message === 'jwt expired') {
            const data = await refreshToken()
            localStorage.setItem('refreshToken', data.refreshToken)
            sessionStorage.setItem('accessToken', data.accessToken)

            return await fn()
        }
    })
}

export const getCurrentUser = async (): Promise<IUser> => {
    return fetchWithRefresh(() => request(API.currentUser, {
        headers: {
            authorization: sessionStorage.getItem('accessToken') ?? ''
        }
    })).then((data) => data?.user || data)
}

export const refreshToken = async (): Promise<IToken> => {
    return request(API.token, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken') ?? ''}),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const logout = async () => {
    return request(API.logout, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken') ?? ''}),
        headers: HEADERS_WITH_DATA
    }).then((data) => data)
}

export const updateCurrentUser = async (values: IUpdateUserReq): Promise<IUser> => {
    return fetchWithRefresh(() => request(API.currentUser, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
            ...HEADERS_WITH_DATA,
            authorization: sessionStorage.getItem('accessToken') ?? ''
        }
    })).then((data) => data?.user || data)
}

