import { API } from '../constants';
import { checkResponse } from '../helpers';

export const getIngredients = async () => {
    return fetch(API.ingredients)
        .then(checkResponse).then(({ data }) => data)
}

export const submitOrder = async (values: object) => {
    return fetch(API.orders, {
        method: 'POST',
        body: values ? JSON.stringify(values) : undefined,
        headers: { 'Content-Type': 'application/json', accept: 'application/json' }
    })
        .then(checkResponse).then((data) => data)
}
