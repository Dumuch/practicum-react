import {API} from '../constants';
import {request} from '../helpers';
import {ILoginReq, ILoginRes, IRegisterReq, IRegisterRes, IToken, IUser} from "../models/common";

export const getIngredients = async () => {
    return request(API.ingredients).then(({data}) => data)
}

export const submitOrder = async (values: object) => {
    return request(API.orders, {
        method: 'POST',
        body: values ? JSON.stringify(values) : undefined,
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const forgotPassword = async (email: string) => {
    return request(API.passwordReset, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const resetPassword = async (password: string, token: string) => {
    return request(API.passwordReset + '/reset', {
        method: 'POST',
        body: JSON.stringify({password, token}),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const register = async (values: IRegisterReq): Promise<IRegisterRes> => {
    return request(API.register, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const login = async (values: ILoginReq): Promise<ILoginRes> => {
    return request(API.login, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const getCurrentUser = async (): Promise<IUser> => {
    return request(API.currentUser, {headers: {authorization: sessionStorage.getItem('accessToken') ?? ''}}).then(({user}) => user)
}

export const refreshToken = async (): Promise<IToken> => {
    return request(API.token, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken') ?? ''}),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

export const logout = async () => {
    return request(API.logout, {
        method: 'POST',
        body: JSON.stringify({token: localStorage.getItem('refreshToken') ?? ''}),
        headers: {'Content-Type': 'application/json', accept: 'application/json'}
    }).then((data) => data)
}

