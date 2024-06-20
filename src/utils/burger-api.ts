import { API } from '../constants';
import { request } from '../helpers';

export const getIngredients = async () => {
    return request(API.ingredients).then(({ data }) => data)
}

export const submitOrder = async (values: object) => {
    return request(API.orders, {
        method: 'POST',
        body: values ? JSON.stringify(values) : undefined,
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    }).then((data) => data)
}

export const forgotPassword = async (email: string) => {
    return request(API.passwordReset, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    }).then((data) => data)
}

export const resetPassword = async (password: string, token: string) => {
    return request(API.passwordReset + '/reset', {
        method: 'POST',
        body: JSON.stringify({password, token}),
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    }).then((data) => data)
}

export const register = async (email: string, password: string, name: string) => {
    return request(API.register, {
        method: 'POST',
        body: JSON.stringify({password, email, name}),
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    }).then((data) => data)
}


